# Event checkout setup

The public booking page is intentionally in setup mode until the payment accounts are connected. It never marks a seat as sold from the browser.

## What to add later

1. Create a Cloudflare D1 database and run `worker/schema.sql`.
2. Deploy `worker/booking.ts` with the D1 binding shown in `worker/wrangler.toml`.
3. Add the Worker URL to `booking-config.js`.
4. Add the PayPal live Client ID and server-side secret, then add Square Cash App Pay credentials. Cash App Pay uses Square; a Cash App $cashtag alone cannot automatically confirm an online purchase.
5. Implement provider webhook validation. Only a verified payment should change `bookings.payment_status` to `paid` and atomically increase `events.seats_sold`.

## Seat protection rule

The database update must only succeed when `capacity - seats_sold >= quantity`. That check and the seat increment must happen together in the Worker after verified payment confirmation.
