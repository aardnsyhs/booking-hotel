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
  const paymentStatus = reservation.Payment?.status;

  const checkInDate = new Date(reservation.checkIn);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isExpired = checkInDate < today;

  const handlePayment = async () => {
    if (isExpired) {
      alert(
        "This reservation has expired. The check-in date has already passed."
      );
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservation),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Payment failed");
        }

        const { token } = data;
        if (token) {
          window.snap.pay(token);
        }
      } catch (err) {
        console.error("Payment error:", err);
        alert(
          "Payment failed: " +
            (err instanceof Error ? err.message : "Unknown error")
        );
      }
    });
  };

  if (paymentStatus === "paid") {
    return (
      <div className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-green-500 rounded-sm">
        Payment Completed
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-gray-400 rounded-sm cursor-not-allowed">
        Reservation Expired
      </div>
    );
  }

  if (paymentStatus === "failure") {
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
        {isPending ? "Processing..." : "Retry Payment"}
      </button>
    );
  }

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
