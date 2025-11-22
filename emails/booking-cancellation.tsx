import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface BookingCancellationEmailProps {
  customerName: string;
  reservationId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: string;
  refundAmount: string;
  cancellationReason: string;
  refundStatus: string;
}

export const BookingCancellationEmail = ({
  customerName,
  reservationId,
  roomName,
  checkIn,
  checkOut,
  totalAmount,
  refundAmount,
  cancellationReason,
  refundStatus,
}: BookingCancellationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Booking Cancelled - {reservationId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={cancelBanner}>
            <Heading style={cancelHeading}>✕ Booking Cancelled</Heading>
          </Section>

          <Text style={text}>Dear {customerName},</Text>
          <Text style={text}>
            Your booking has been cancelled as requested. We&apos;re sorry to
            see you go, but we hope to serve you again in the future.
          </Text>

          <Section style={bookingDetails}>
            <Heading style={h2}>Cancelled Reservation Details</Heading>
            <Hr style={hr} />
            <Text style={detailRow}>
              <strong>Reservation ID:</strong> {reservationId}
            </Text>
            <Text style={detailRow}>
              <strong>Room:</strong> {roomName}
            </Text>
            <Text style={detailRow}>
              <strong>Check-in:</strong> {checkIn}
            </Text>
            <Text style={detailRow}>
              <strong>Check-out:</strong> {checkOut}
            </Text>
            <Hr style={hr} />
            <Text style={detailRow}>
              <strong>Cancellation Reason:</strong> {cancellationReason}
            </Text>
            <Text style={detailRow}>
              <strong>Original Amount:</strong> {totalAmount}
            </Text>
          </Section>

          <Section style={refundBox}>
            <Heading style={h2}>Refund Information</Heading>
            <Hr style={hr} />
            <Text style={refundAmountStyle}>
              <strong>Refund Amount:</strong> {refundAmount}
            </Text>
            <Text style={detailRow}>
              <strong>Refund Status:</strong> {refundStatus.toUpperCase()}
            </Text>
            <Hr style={hr} />
            <Text style={infoText}>
              {refundStatus === "pending" &&
                "Your refund is being processed. It may take 3-5 business days to appear in your account."}
              {refundStatus === "approved" &&
                "Your refund has been approved and will be processed shortly."}
              {refundStatus === "processed" &&
                "Your refund has been processed. Please allow 3-5 business days for it to appear in your account."}
              {refundStatus === "rejected" &&
                "Unfortunately, your refund request was not eligible based on our cancellation policy."}
            </Text>
          </Section>

          <Section style={policyBox}>
            <Text style={policyText}>
              <strong>Cancellation Policy:</strong>
              <br />
              • Cancellations made 7+ days before check-in: 100% refund
              <br />
              • Cancellations made 3-6 days before check-in: 50% refund
              <br />• Cancellations made less than 3 days before check-in: No
              refund
            </Text>
          </Section>

          <Text style={footer}>
            If you have any questions about your cancellation or refund, please
            don&apos;t hesitate to contact us.
            <br />
            <br />
            Best regards,
            <br />
            Hotel Booking Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingCancellationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const cancelBanner = {
  backgroundColor: "#ef4444",
  padding: "20px 40px",
  textAlign: "center" as const,
};

const cancelHeading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 0 10px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
  marginTop: "20px",
};

const bookingDetails = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  margin: "20px 40px",
  padding: "20px",
};

const detailRow = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "8px 0",
};

const refundBox = {
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  margin: "20px 40px",
  padding: "20px",
};

const refundAmountStyle = {
  color: "#92400e",
  fontSize: "18px",
  fontWeight: "bold" as const,
  margin: "8px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "16px 0",
};

const policyBox = {
  backgroundColor: "#eff6ff",
  borderRadius: "8px",
  margin: "20px 40px",
  padding: "20px",
};

const policyText = {
  color: "#1e40af",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
};

const infoText = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "8px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 40px",
  marginTop: "32px",
};
