import { NextResponse } from "next/server";
import * as midtransClient from "midtrans-client";
import { reservationProps } from "@/types/reservation";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export const GET = async () => {
  return NextResponse.json({
    message: "Payment API endpoint. Use POST method with reservation data.",
    method: "POST",
    requiredFields: ["id", "user", "Payment"],
  });
};

export const POST = async (request: Request) => {
  try {
    const reservation: reservationProps = await request.json();

    const uniqueOrderId = `${reservation.id}-${Date.now()}`;

    const parameter = {
      transaction_details: {
        order_id: uniqueOrderId,
        gross_amount: reservation.Payment?.amount || 0,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: reservation.User.name,
        email: reservation.User.email,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${reservation.id}`,
      },
    };

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create payment token",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
