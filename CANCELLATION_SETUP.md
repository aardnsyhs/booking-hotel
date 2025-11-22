# Booking Cancellation Feature

## ✅ What's Been Implemented

### 1. Database Schema Updates

Added new fields to `Reservation` model:

- `status`: confirmed, cancelled, completed
- `cancellationReason`: User's reason for cancellation
- `cancellationDate`: When the cancellation was requested
- `refundAmount`: Calculated refund amount
- `refundStatus`: pending, approved, rejected, processed

### 2. Cancellation Policy (`lib/cancellation-policy.ts`)

**Refund Policy:**

- **More than 7 days before check-in**: 100% refund
- **3-7 days before check-in**: 50% refund
- **1-3 days before check-in**: 25% refund
- **Less than 24 hours before check-in**: No refund (cannot cancel)
- **After check-in**: Cannot cancel

### 3. Server Actions (`lib/actions.ts`)

- `requestCancellation()`: Handles cancellation requests
  - Validates user authorization
  - Checks if reservation can be cancelled
  - Calculates refund based on policy
  - Updates reservation status

### 4. UI Components

- **CancelBookingButton**: Modal with cancellation form
  - Shows cancellation policy
  - Requires reason for cancellation
  - Displays refund amount before confirmation
- **CheckoutDetail**: Updated to show:
  - Cancel button (only for paid bookings)
  - Cancellation info (if cancelled)
  - Refund status

- **Reservations Page**: Shows "CANCELLED" badge

## 🔧 Setup Instructions

### Step 1: Restart Dev Server

The Prisma client needs to be regenerated after schema changes.

```bash
# Stop your dev server (Ctrl+C)
# Then restart:
pnpm dev
```

### Step 2: Verify Migration

Check if migration was applied:

```bash
npx prisma studio
```

Look for the new fields in the `Reservation` table.

### Step 3: Test Cancellation Flow

1. **Create a booking** and complete payment
2. **Go to checkout page** - you should see "Cancel Booking" button
3. **Click Cancel Booking**:
   - Modal appears with cancellation policy
   - Enter reason for cancellation
   - Confirm cancellation
4. **Check refund amount** based on how far from check-in date
5. **Verify status** changes to "CANCELLED" in reservations page

## 📋 Cancellation Flow

```
User clicks "Cancel Booking"
↓
Modal shows cancellation policy & refund amount
↓
User enters reason
↓
System validates:
  - Is user authorized?
  - Is booking paid?
  - Can booking be cancelled? (check-in date)
↓
Calculate refund based on policy
↓
Update reservation:
  - status = "cancelled"
  - refundStatus = "pending"
  - refundAmount = calculated amount
↓
Show success message with refund details
↓
Admin reviews and processes refund (future feature)
```

## 🎯 Future Enhancements

### Admin Dashboard for Cancellations

- View all cancellation requests
- Approve/reject cancellations
- Process refunds
- Send refund confirmation emails

### Email Notifications

- Cancellation confirmation email
- Refund processed email
- Admin notification for new cancellation

### Refund Processing

- Integration with payment gateway for automatic refunds
- Track refund transaction IDs
- Refund history

## 🐛 Troubleshooting

### Error: Property 'status' does not exist

**Solution:** Prisma client needs regeneration

```bash
npx prisma generate
```

### Cancel button not showing

**Checklist:**

- [ ] Booking status is not "cancelled"
- [ ] Payment status is "paid"
- [ ] Check-in date is more than 24 hours away

### Refund amount is 0

**Cause:** Trying to cancel within 24 hours of check-in
**Solution:** Cancellation policy prevents cancellation within 24 hours

## 📊 Testing Scenarios

### Scenario 1: Full Refund

- Create booking with check-in date 10 days from now
- Complete payment
- Cancel booking
- **Expected:** 100% refund

### Scenario 2: Partial Refund (50%)

- Create booking with check-in date 5 days from now
- Complete payment
- Cancel booking
- **Expected:** 50% refund

### Scenario 3: Cannot Cancel

- Create booking with check-in date tomorrow
- Complete payment
- Try to cancel
- **Expected:** "Cannot cancel within 24 hours of check-in"

### Scenario 4: Already Cancelled

- Cancel a booking
- Try to cancel again
- **Expected:** "Reservation already cancelled"

## 💡 Tips

1. **Test with different dates** to see different refund percentages
2. **Check Prisma Studio** to see database changes
3. **Use browser DevTools** to see console logs during cancellation
4. **Refund status** starts as "pending" - admin needs to approve

## 🔐 Security Notes

- Only the user who made the booking can cancel it
- Cannot cancel unpaid bookings
- Cannot cancel after check-in date
- Refund amount is calculated server-side (cannot be manipulated)
