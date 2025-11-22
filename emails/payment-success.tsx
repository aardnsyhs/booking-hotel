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

interface PaymentSuccessEmailProps {
  customerName?: string;
  reservationId?: string;
  roomName?: string;
  checkIn?: string;
  checkOut?: string;
  totalAmount?: string;
  paymentMethod?: string;
}

export const PaymentSuccessEmail = ({
  customerName = "Guest",
  reservationId = "RES-XXXXX",
  roomName = "Deluxe Room",
  checkIn = "January 1, 2024",
  checkOut = "January 3, 2024",
  totalAmount = "Rp 1,000,000",
  paymentMethod = "Online Payment",
}: PaymentSuccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Payment Successful - {reservationId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={successBanner}>
            <Heading style={successHeading}>✓ Payment Successful</Heading>
          </Section>

          <Text style={text}>Dear {customerName},</Text>
          <Text style={text}>
            Your payment has been successfully processed. Your reservation is
            now confirmed!
          </Text>

          <Section style={bookingDetails}>
            <Heading style={h2}>Reservation Details</Heading>
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
              <strong>Payment Method:</strong> {paymentMethod}
            </Text>
            <Text style={totalAmountStyle}>
              <strong>Amount Paid:</strong> {totalAmount}
            </Text>
          </Section>

          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>What&apos;s Next?</strong>
              <br />
              • You will receive a reminder email 24 hours before check-in
              <br />
              • Please bring a valid ID for check-in
              <br />• Check-in time: 2:00 PM | Check-out time: 12:00 PM
            </Text>
          </Section>

          <Text style={footer}>
            We look forward to welcoming you!
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

export default PaymentSuccessEmail;

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

const successBanner = {
  backgroundColor: "#10b981",
  padding: "20px 40px",
  textAlign: "center" as const,
};

const successHeading = {
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
  wordBreak: "break-word" as const,
  overflowWrap: "break-word" as const,
};

const bookingDetails = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  margin: "20px 40px",
  padding: "20px",
  maxWidth: "520px",
  boxSizing: "border-box" as const,
};

const detailRow = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "8px 0",
  wordBreak: "break-word" as const,
  overflowWrap: "break-word" as const,
};

const totalAmountStyle = {
  color: "#10b981",
  fontSize: "18px",
  fontWeight: "bold" as const,
  margin: "16px 0 8px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "16px 0",
};

const infoBox = {
  backgroundColor: "#eff6ff",
  borderRadius: "8px",
  margin: "20px 40px",
  padding: "20px",
  maxWidth: "520px",
  boxSizing: "border-box" as const,
};

const infoText = {
  color: "#1e40af",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
  wordBreak: "break-word" as const,
  overflowWrap: "break-word" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 40px",
  marginTop: "32px",
};
