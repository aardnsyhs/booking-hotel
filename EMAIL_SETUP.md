# Email Notification Setup

This project uses [Resend](https://resend.com) for sending transactional emails.

## Setup Instructions

### 1. Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get API Key

1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Hotel Booking Dev")
4. Copy the API key

### 3. Add to Environment Variables

Add the API key to your `.env` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

### 4. Verify Domain (Production Only)

For production, you need to verify your domain:

1. Go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records to your domain provider
5. Wait for verification (usually takes a few minutes)

Once verified, update the `from` field in `lib/email.ts`:

```typescript
from: "Hotel Booking <noreply@yourdomain.com>";
```

### 5. Test Email (Development)

**Important:** Without domain verification, Resend only allows sending to:

- Your verified email address (the one you used to sign up)
- `delivered@resend.dev` (test email that always succeeds)

**This project automatically handles this:**

- In **development mode**: All emails are sent to `delivered@resend.dev`
- In **production mode**: Emails are sent to actual user emails (requires domain verification)

To test with real emails in development, verify your domain first (see step 4 above).

## Email Templates

The project includes two email templates:

### 1. Booking Confirmation Email

- Sent when user creates a new reservation
- Includes reservation details and payment instructions
- Template: `emails/booking-confirmation.tsx`

### 2. Payment Success Email

- Sent when payment is successfully processed
- Includes payment receipt and check-in information
- Template: `emails/payment-success.tsx`

## Testing Emails Locally

To preview email templates locally:

```bash
pnpm email:dev
```

This will start the React Email preview server at `http://localhost:3000`

Note: Make sure your Next.js dev server is not running on port 3000, or the email preview will use a different port.

## Email Flow

1. **User creates reservation** → Booking Confirmation Email sent
2. **User completes payment** → Payment Success Email sent
3. **Midtrans webhook** → Payment Success Email sent (backup)

## Troubleshooting

### Emails not sending?

1. Check if `RESEND_API_KEY` is set correctly
2. Check console logs for error messages
3. Verify the recipient email is allowed (in dev mode)
4. Check Resend dashboard for logs

### Email template not rendering?

1. Make sure all required props are passed
2. Check for TypeScript errors
3. Preview template using `pnpm email dev`

## Free Tier Limits

Resend free tier includes:

- 100 emails per day
- 3,000 emails per month
- All features included

For production with higher volume, consider upgrading to a paid plan.
