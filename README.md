# Miragé Perfumes

Luxury fragrance e-commerce storefront built with Next.js 16, Tailwind CSS, MongoDB, and Stripe.

## Stack

- **Frontend:** Next.js App Router, Tailwind CSS v4, Lucide icons
- **Backend:** Next.js Route Handlers
- **Database:** MongoDB + Mongoose (optional — seed catalog falls back to in-memory data)
- **Payments:** Stripe Checkout (guest)

## Getting started

```bash
cd frontend
npm install
cp .env.local.example .env.local
# fill in MongoDB + Stripe keys (optional for browsing)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Seed MongoDB (optional)

With `MONGODB_URI` set:

```bash
curl -X POST http://localhost:3000/api/seed
```

### Stripe webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage (mockup sections) |
| `/shop` | Product grid + filters |
| `/shop/[slug]` | Product detail |
| `/cart` | Cart + Stripe checkout |
| `/checkout/success` | Post-payment thank you |
| `/about` `/contact` `/account` | Supporting pages |

## API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/products` | GET | List / filter products |
| `/api/products/[slug]` | GET | Single product |
| `/api/checkout` | POST | Create Stripe Checkout session |
| `/api/webhooks/stripe` | POST | Mark orders paid |
| `/api/newsletter` | POST | Subscribe email |
| `/api/seed` | POST | Upsert seed catalog |

## Notes

- Without `MONGODB_URI`, the UI still works using the built-in perfume catalog.
- Without Stripe keys, browsing and cart work; checkout returns a clear configuration error.
- Account / auth is intentionally out of scope for v1 (guest checkout only).
