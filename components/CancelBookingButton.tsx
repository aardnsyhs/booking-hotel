"use client";

import { useState, useTransition, useEffect } from "react";
import { requestCancellation } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface CancelBookingButtonProps {
  reservationId: string;
  checkInDate: Date;
  totalAmount: number;
  canCancel: boolean;
  cancelReason: string;
}

export default function CancelBookingButton({
  reservationId,
  canCancel,
  cancelReason,
}: CancelBookingButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<{
    refundAmount: number;
    refundPercentage: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCancel = () => {
    if (!reason.trim()) {
      setError("Please provide a reason for cancellation");
      return;
    }

    startTransition(async () => {
      const result = await requestCancellation(reservationId, reason);

      if (result.success) {
        const refundData = {
          refundAmount: result.refundAmount || 0,
          refundPercentage: result.refundPercentage || 0,
        };

        setSuccessData(refundData);
        setShowModal(false);

        setTimeout(() => {
          setShowSuccessModal(true);
        }, 150);
      } else {
        setError(result.error || "Failed to cancel reservation");
      }
    });
  };

  if (!canCancel) {
    return (
      <div className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-gray-400 rounded-sm cursor-not-allowed">
        Cannot Cancel
        <p className="text-xs mt-1 font-normal">{cancelReason}</p>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-red-500 rounded-sm hover:bg-red-600 transition duration-150"
      >
        Cancel Booking
      </button>
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Cancel Booking</h2>
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Cancellation Policy:</strong>
                <br />
                {cancelReason}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for cancellation *
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError("");
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                rows={4}
                placeholder="Please tell us why you're cancelling..."
                disabled={isPending}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setReason("");
                  setError("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isPending}
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                className={clsx(
                  "flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600",
                  {
                    "opacity-50 cursor-progress": isPending,
                  }
                )}
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal &&
        successData &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Cancellation Successful
                </h2>
                <p className="text-gray-600 mb-6">
                  Your booking has been cancelled successfully.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="text-left space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Refund Amount:
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(successData.refundAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Refund Percentage:
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        {successData.refundPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Your refund will be processed within{" "}
                  <strong>7-14 business days</strong> and will be credited to
                  your original payment method.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.refresh();
                  }}
                  className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-150"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
