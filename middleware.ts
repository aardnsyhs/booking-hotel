import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "./app/auth-middleware";

const ProtectedRoutes = ["/reservations", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
  const session = await getUserToken(request);
  const isLoggedIn = !!session;
  const role = session?.role;
  const { pathname } = request.nextUrl;

  if (
    !isLoggedIn &&
    ProtectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isLoggedIn && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
