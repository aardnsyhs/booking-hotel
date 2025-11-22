import { prisma } from "@/lib/prisma";
import { PaymentProps } from "@/types/payment";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const data: PaymentProps = await request.json();
  const orderId = data.order_id;
  const reservationId = orderId.split("-").slice(0, -1).join("-");

  let responseData = null;

  const transactionStatus = data.transaction_status;
  const paymentType = data.payment_type || null;
  const fraudStatus = data.fraud_status;
  const statusCode = data.status_code;
  const grossAmount = data.gross_amount;
  const signatureKey = data.signature_key;

  const hash = crypto
    .createHash("sha512")
    .update(
      `${orderId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");

  if (signatureKey !== hash) {
    return NextResponse.json(
      { error: "Invalid signature key" },
      { status: 400 }
    );
  }

  if (transactionStatus === "capture") {
    if (fraudStatus === "accept") {
      const transaction = await prisma.payment.update({
        data: {
          method: paymentType,
          status: "paid",
        },
        where: {
          reservationId,
        },
      });
      responseData = transaction;
    }
  } else if (transactionStatus === "settlement") {
    const transaction = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "paid",
      },
      where: {
        reservationId,
      },
      include: {
        reservation: {
          include: {
            room: {
              select: {
                name: true,
              },
            },
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const { sendPaymentSuccessEmail } = await import("@/lib/email");
    await sendPaymentSuccessEmail({
      customerName: transaction.reservation.user.name || "Guest",
      customerEmail: transaction.reservation.user.email || "",
      reservationId: transaction.reservationId,
      roomName: transaction.reservation.room.name,
      checkIn: transaction.reservation.checkIn,
      checkOut: transaction.reservation.checkOut,
      totalAmount: transaction.amount,
      paymentMethod: paymentType || "Online Payment",
    });

    responseData = transaction;
  } else if (
    transactionStatus === "cancel" ||
    transactionStatus === "deny" ||
    transactionStatus === "expired"
  ) {
    const transaction = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "failure",
      },
      where: {
        reservationId,
      },
    });
    responseData = transaction;
  } else if (transactionStatus === "pending") {
    const transaction = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "pending",
      },
      where: {
        reservationId,
      },
    });
    responseData = transaction;
  }

  return NextResponse.json({ responseData }, { status: 200 });
};
