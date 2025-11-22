# Booking Cancellation Email Notification

## Overview

Email notification otomatis yang dikirim ke customer ketika booking mereka dibatalkan.

## Features

- ✅ Email template dengan design profesional
- ✅ Informasi detail tentang booking yang dibatalkan
- ✅ Informasi refund (jumlah, status, dan estimasi waktu)
- ✅ Penjelasan kebijakan pembatalan
- ✅ Status refund dengan warna yang berbeda (pending, approved, processed, rejected)

## Email Content

Email mencakup informasi berikut:

1. **Reservation Details**
   - Reservation ID
   - Room name
   - Check-in & Check-out dates
   - Cancellation reason
   - Original amount

2. **Refund Information**
   - Refund amount
   - Refund status (PENDING, APPROVED, PROCESSED, REJECTED)
   - Informasi timeline refund berdasarkan status

3. **Cancellation Policy**
   - 7+ days before check-in: 100% refund
   - 3-6 days before check-in: 50% refund
   - Less than 3 days: No refund

## Implementation

### Files Created/Modified

1. **emails/booking-cancellation.tsx** - Email template
2. **lib/email.ts** - Added `sendBookingCancellationEmail()` function
3. **lib/actions.ts** - Modified `requestCancellation()` to send email

### Usage

Email akan otomatis terkirim ketika:

- User membatalkan booking melalui `CancelBookingButton`
- Fungsi `requestCancellation()` dipanggil
- Booking status berubah menjadi "cancelled"

### Email Sending Flow

```
User clicks Cancel → requestCancellation() →
Update DB (status: cancelled) →
sendBookingCancellationEmail() →
Email sent to customer
```

## Testing

Untuk testing di development:

- Email akan dikirim ke `delivered@resend.dev` (Resend test email)
- Check Resend dashboard untuk melihat email yang terkirim
- Di production, email akan dikirim ke customer email yang sebenarnya

## Environment Variables

Pastikan `RESEND_API_KEY` sudah di-set di `.env`:

```
RESEND_API_KEY=your_resend_api_key
```

## Email Preview

Email memiliki:

- Red banner dengan "✕ Booking Cancelled"
- Gray box untuk booking details
- Yellow box untuk refund information
- Blue box untuk cancellation policy
- Footer dengan contact information

## Future Improvements

- [ ] Add email preview in admin dashboard
- [ ] Add option to resend cancellation email
- [ ] Add email tracking (opened, clicked)
- [ ] Customize email template per hotel brand
