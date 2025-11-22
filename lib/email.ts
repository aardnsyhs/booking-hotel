import { Resend } from "resend";
import { BookingConfirmationEmail } from "@/emails/booking-confirmation";
import { PaymentSuccessEmail } from "@/emails/payment-success";
import { formatCurrency, formatDate } from "./utils";
import { differenceInCalendarDays } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  reservationId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
}

interface PaymentEmailData extends BookingEmailData {
  paymentMethod: string;
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: "RESEND_API_KEY not configured",
      };
    }

    const nights = differenceInCalendarDays(data.checkOut, data.checkIn);

    const isDevelopment = process.env.NODE_ENV === "development";
    const recipientEmail = isDevelopment
      ? "delivered@resend.dev"
      : data.customerEmail;

    const { data: emailData, error } = await resend.emails.send({
      from: "Hotel Booking <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `Booking Confirmation - ${data.reservationId}`,
      react: BookingConfirmationEmail({
        customerName: data.customerName,
        reservationId: data.reservationId,
        roomName: data.roomName,
        checkIn: formatDate(data.checkIn.toISOString()),
        checkOut: formatDate(data.checkOut.toISOString()),
        nights,
        totalAmount: formatCurrency(data.totalAmount),
      }),
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    return { success: false, error };
  }
}

export async function sendPaymentSuccessEmail(data: PaymentEmailData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: "RESEND_API_KEY not configured",
      };
    }

    const isDevelopment = process.env.NODE_ENV === "development";
    const recipientEmail = isDevelopment
      ? "delivered@resend.dev"
      : data.customerEmail;

    const { data: emailData, error } = await resend.emails.send({
      from: "Hotel Booking <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `Payment Successful - ${data.reservationId}`,
      react: PaymentSuccessEmail({
        customerName: data.customerName,
        reservationId: data.reservationId,
        roomName: data.roomName,
        checkIn: formatDate(data.checkIn.toISOString()),
        checkOut: formatDate(data.checkOut.toISOString()),
        totalAmount: formatCurrency(data.totalAmount),
        paymentMethod: data.paymentMethod || "Online Payment",
      }),
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    return { success: false, error };
  }
}
