"use client";

import { reservationProps } from "@/types/reservation";
import clsx from "clsx";
import { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

const PaymentButton = ({ reservation }: { reservation: reservationProps }) => {
  const [isPending, startTransition] = useTransition();
  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });
        const { token } = await res.json();
        if (token) {
          window.snap.pay(token);
        }
      } catch (err) {
        console.error(err);
      }
    });
  };
  return (
    <button
      className={clsx(
        "px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer",
        {
          "opacity-50 cursor-progress animate-pulse": isPending,
        }
      )}
      onClick={handlePayment}
      disabled={isPending}
    >
      {isPending ? "Processing..." : "Process Payment"}
    </button>
  );
};

export default PaymentButton;
