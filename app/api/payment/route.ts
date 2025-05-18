import { NextResponse } from "next/server";
import * as midtransClient from "midtrans-client";
import { reservationProps } from "@/types/reservation";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export const POST = async (request: Request) => {
  const reservation: reservationProps = await request.json();

  const parameter = {
    transaction_details: {
      order_id: reservation.id,
      gross_amount: reservation.Payment?.[0]?.amount || 0,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: reservation.user.name,
      email: reservation.user.email,
    },
  };

  const token = await snap.createTransactionToken(parameter);

  return NextResponse.json({ token });
};
