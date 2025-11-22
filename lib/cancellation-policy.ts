import { differenceInHours } from "date-fns";

export interface CancellationPolicy {
  canCancel: boolean;
  refundPercentage: number;
  reason: string;
}

export function getCancellationPolicy(checkInDate: Date): CancellationPolicy {
  const now = new Date();
  const hoursUntilCheckIn = differenceInHours(checkInDate, now);

  if (hoursUntilCheckIn <= 0) {
    return {
      canCancel: false,
      refundPercentage: 0,
      reason: "Cannot cancel after check-in date has passed",
    };
  }

  if (hoursUntilCheckIn < 24) {
    return {
      canCancel: false,
      refundPercentage: 0,
      reason: "Cannot cancel within 24 hours of check-in",
    };
  }

  if (hoursUntilCheckIn < 72) {
    return {
      canCancel: true,
      refundPercentage: 25,
      reason: "25% refund (1-3 days before check-in)",
    };
  }

  if (hoursUntilCheckIn < 168) {
    return {
      canCancel: true,
      refundPercentage: 50,
      reason: "50% refund (3-7 days before check-in)",
    };
  }

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
