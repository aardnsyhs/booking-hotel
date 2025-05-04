import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getUserToken(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  return token;
}
