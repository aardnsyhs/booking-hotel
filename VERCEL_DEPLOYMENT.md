# Vercel Deployment Guide

## Error: Missing API key for Resend

Jika kamu mendapat error saat build di Vercel:

```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
```

## Solution

### 1. Add Environment Variable di Vercel

1. Buka Vercel Dashboard
2. Pilih project kamu
3. Go to **Settings** → **Environment Variables**
4. Add variable baru:
   - **Name**: `RESEND_API_KEY`
   - **Value**: API key dari Resend (format: `re_xxxxx`)
   - **Environment**: Production, Preview, Development (pilih semua)

### 2. Get Resend API Key

1. Login ke https://resend.com
2. Go to **API Keys** di dashboard
3. Create new API key atau copy existing key
4. Paste ke Vercel environment variables

### 3. Redeploy

Setelah menambahkan environment variable:

1. Go to **Deployments** tab
2. Click **Redeploy** pada deployment terakhir
3. Atau push commit baru ke GitHub untuk trigger deployment

## Other Required Environment Variables

Pastikan semua environment variables berikut sudah di-set di Vercel:

```env
# Database
POSTGRES_PRISMA_URL=your_postgres_url
POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling

# Auth
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Payment (Midtrans)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Vercel Blob (for image upload)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Base URL
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## Testing After Deployment

1. **Test Email**: Visit `/api/test-email` untuk test email functionality
2. **Test Booking**: Buat booking baru dan cek apakah email terkirim
3. **Test Cancellation**: Cancel booking dan cek cancellation email

## Troubleshooting

### Build fails with "Missing API key"

- Pastikan `RESEND_API_KEY` sudah ditambahkan di Vercel
- Pastikan API key format benar (starts with `re_`)
- Redeploy setelah menambahkan variable

### Email not sending in production

- Check Resend dashboard untuk error logs
- Pastikan domain sudah verified di Resend (jika menggunakan custom domain)
- Check Vercel logs untuk error messages

### Environment variables not working

- Pastikan variable ditambahkan untuk environment yang benar (Production/Preview/Development)
- Redeploy setelah menambahkan/mengubah variables
- Variables tidak akan ter-apply pada deployment yang sudah ada
