import CheckoutDetail from "@/components/CheckoutDetail";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Reservation Summary",
};

const CheckoutPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const reservationId = (await params).id;
  const search = await searchParams;
  const transactionStatus = search.transaction_status as string | undefined;

  if (transactionStatus) {
    let status = "unpaid";

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      status = "paid";
    } else if (transactionStatus === "pending") {
      status = "pending";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      status = "failure";
    }

    const payment = await prisma.payment.update({
      where: {
        reservationId,
      },
      data: {
        status,
      },
      include: {
        Reservation: {
          include: {
            Room: {
              select: {
                name: true,
              },
            },
            User: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (status === "paid") {
      const { sendPaymentSuccessEmail } = await import("@/lib/email");
      await sendPaymentSuccessEmail({
        customerName: payment.Reservation.User.name || "Guest",
        customerEmail: payment.Reservation.User.email || "",
        reservationId: payment.reservationId,
        roomName: payment.Reservation.Room.name,
        checkIn: payment.Reservation.checkIn,
        checkOut: payment.Reservation.checkOut,
        totalAmount: payment.amount,
        paymentMethod: "Online Payment",
      });
    }
  }

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Reservation Summary</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CheckoutDetail reservationId={reservationId} />
      </Suspense>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
};

export default CheckoutPage;
