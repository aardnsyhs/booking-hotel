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

interface BookingConfirmationEmailProps {
  customerName?: string;
  reservationId?: string;
  roomName?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  totalAmount?: string;
}

export const BookingConfirmationEmail = ({
  customerName = "Guest",
  reservationId = "RES-XXXXX",
  roomName = "Deluxe Room",
  checkIn = "January 1, 2024",
  checkOut = "January 3, 2024",
  nights = 2,
  totalAmount = "Rp 1,000,000",
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your booking confirmation - {reservationId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Confirmation</Heading>
          <Text style={text}>Dear {customerName},</Text>
          <Text style={text}>
            Thank you for your reservation! Your booking has been confirmed.
          </Text>

          <Section style={bookingDetails}>
            <Heading style={h2}>Booking Details</Heading>
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
            <Text style={detailRow}>
              <strong>Duration:</strong> {nights} night{nights > 1 ? "s" : ""}
            </Text>
            <Hr style={hr} />
            <Text style={totalAmountStyle}>
              <strong>Total Amount:</strong> {totalAmount}
            </Text>
          </Section>

          <Text style={text}>
            Please complete your payment to secure your reservation. You can
            view your booking details and make payment by visiting your
            reservations page.
          </Text>

          <Text style={footer}>
            If you have any questions, please don&apos;t hesitate to contact us.
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

export default BookingConfirmationEmail;

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

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 40px",
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
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold" as const,
  margin: "16px 0 8px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "16px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 40px",
  marginTop: "32px",
};
