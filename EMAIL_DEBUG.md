# Email Debugging Guide

## Quick Test

### 1. Test Email Configuration

Visit this URL in your browser:

```
http://localhost:3000/api/test-email
```

This will:

- ✅ Check if `RESEND_API_KEY` is configured
- ✅ Validate API key format
- ✅ Send a test email to `delivered@resend.dev`
- ✅ Return detailed error messages if something fails

### 2. Check Console Logs

When you create a booking, check your terminal/console for these logs:

**Successful email:**

```
🔄 Sending booking confirmation email...
📧 Attempting to send booking confirmation email...
Recipient: user@example.com
Reservation ID: abc123
✅ Booking confirmation email sent successfully!
Email ID: re_abc123xyz
✅ Email sent successfully
```

**Failed email (no API key):**

```
📧 Attempting to send booking confirmation email...
❌ RESEND_API_KEY is not configured in .env
```

**Failed email (invalid API key):**

```
📧 Attempting to send booking confirmation email...
❌ Failed to send booking confirmation email: { error details }
```

## Common Issues & Solutions

### Issue 1: No logs appearing

**Problem:** You don't see any email-related logs in console

**Solution:**

1. Make sure you're looking at the **server terminal** (not browser console)
2. Restart your dev server: `pnpm dev`
3. Try creating a new booking

### Issue 2: "RESEND_API_KEY is not configured"

**Problem:** API key is missing

**Solution:**

1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Create a new API key
3. Add to `.env` file:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
4. Restart dev server

### Issue 3: "Invalid API key"

**Problem:** API key format is wrong or expired

**Solution:**

1. Check if your API key starts with `re_`
2. Make sure there are no extra spaces or quotes
3. Generate a new API key from Resend dashboard
4. Update `.env` and restart server

### Issue 4: Email sent but not received

**Problem:** Logs show success but email not in inbox

**Possible causes:**

**A. Development Mode Restrictions**

- Resend free tier only sends to verified email addresses in development
- Solution: Use your verified email or `delivered@resend.dev` for testing

**B. Email in Spam/Junk**

- Check your spam folder
- Add `onboarding@resend.dev` to contacts

**C. Wrong Email Address**

- Check the logs to see which email address was used
- Make sure your user account has a valid email

### Issue 5: "Domain not verified"

**Problem:** Production emails not sending

**Solution:**

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Add and verify your domain
3. Update `from` field in `lib/email.ts`:
   ```typescript
   from: "Hotel Booking <noreply@yourdomain.com>";
   ```

## Step-by-Step Debugging

### Step 1: Verify Environment Variable

```bash
# Windows (PowerShell)
echo $env:RESEND_API_KEY

# Should output: re_xxxxxxxxxxxxx
# If empty, API key is not set
```

### Step 2: Test API Endpoint

```bash
# Visit in browser or use curl
curl http://localhost:3000/api/test-email
```

Expected response (success):

```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "emailId": "re_abc123",
  "note": "Check the Resend dashboard..."
}
```

### Step 3: Check Resend Dashboard

1. Go to [https://resend.com/emails](https://resend.com/emails)
2. You should see your test email in the list
3. Click to view details and delivery status

### Step 4: Test Real Booking Flow

1. Create a new booking
2. Watch terminal for logs
3. Check email inbox (or spam)
4. Check Resend dashboard for delivery status

## Getting Help

If emails still not working after following this guide:

1. **Check Resend Status:** [https://resend.com/status](https://resend.com/status)
2. **View Resend Logs:** [https://resend.com/emails](https://resend.com/emails)
3. **Check API Key Permissions:** Make sure it has "Sending access"
4. **Contact Resend Support:** [https://resend.com/support](https://resend.com/support)

## Development vs Production

### Development (localhost)

- Use `onboarding@resend.dev` as sender
- Can only send to verified emails
- 100 emails per day limit

### Production (deployed)

- Verify your domain first
- Use your domain as sender (e.g., `noreply@yourdomain.com`)
- Can send to any email address
- Higher rate limits based on plan

## Quick Checklist

- [ ] `RESEND_API_KEY` is set in `.env`
- [ ] API key starts with `re_`
- [ ] Dev server restarted after adding API key
- [ ] Test endpoint returns success
- [ ] Console shows email logs when booking
- [ ] Email appears in Resend dashboard
- [ ] Checked spam folder
- [ ] Using verified email address (dev mode)
