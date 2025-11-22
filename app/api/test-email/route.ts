import { NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY is not configured in .env file",
          message:
            "Please add RESEND_API_KEY to your .env file. Get your API key from https://resend.com/api-keys",
        },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY.startsWith("re_")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid RESEND_API_KEY format",
          message: "Resend API keys should start with 're_'",
        },
        { status: 500 }
      );
    }

    const result = await sendBookingConfirmationEmail({
      customerName: "Test User",
      customerEmail: "delivered@resend.dev",
      reservationId: "TEST-123456",
      roomName: "Deluxe Room",
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 86400000),
      totalAmount: 1000000,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully!",
        emailId: result.data?.id,
        note: "Check the Resend dashboard at https://resend.com/emails to see the email",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: "Failed to send test email. Check the error details above.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "An unexpected error occurred while testing email",
      },
      { status: 500 }
    );
  }
}
