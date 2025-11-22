import { differenceInHours } from "date-fns";

export interface CancellationPolicy {
  canCancel: boolean;
  refundPercentage: number;
  reason: string;
}

/**
 * Calculate cancellation policy based on check-in date
 *
 * Policy:
 * - More than 7 days before check-in: 100% refund
 * - 3-7 days before check-in: 50% refund
 * - 1-3 days before check-in: 25% refund
 * - Less than 24 hours before check-in: No refund
 * - After check-in: Cannot cancel
 */
export function getCancellationPolicy(
  checkInDate: Date,
  totalAmount: number
): CancellationPolicy {
  const now = new Date();
  const hoursUntilCheckIn = differenceInHours(checkInDate, now);

  // Already checked in or past check-in date
  if (hoursUntilCheckIn <= 0) {
    return {
      canCancel: false,
      refundPercentage: 0,
      reason: "Cannot cancel after check-in date has passed",
    };
  }

  // Less than 24 hours before check-in
  if (hoursUntilCheckIn < 24) {
    return {
      canCancel: false,
      refundPercentage: 0,
      reason: "Cannot cancel within 24 hours of check-in",
    };
  }

  // 1-3 days before check-in (24-72 hours)
  if (hoursUntilCheckIn < 72) {
    return {
      canCancel: true,
      refundPercentage: 25,
      reason: "25% refund (1-3 days before check-in)",
    };
  }

  // 3-7 days before check-in (72-168 hours)
  if (hoursUntilCheckIn < 168) {
    return {
      canCancel: true,
      refundPercentage: 50,
      reason: "50% refund (3-7 days before check-in)",
    };
  }

  // More than 7 days before check-in
  return {
    canCancel: true,
    refundPercentage: 100,
    reason: "Full refund (more than 7 days before check-in)",
  };
}

export function calculateRefundAmount(
  totalAmount: number,
  refundPercentage: number
): number {
  return Math.floor((totalAmount * refundPercentage) / 100);
}
