export interface Env { BOOKINGS: D1Database }

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json", "access-control-allow-origin": "*" }
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { headers: {
      "access-control-allow-origin": "*", "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }});
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/events") {
      const { results } = await env.BOOKINGS.prepare(
        "SELECT id, title, starts_at, venue, price_cents, capacity, seats_sold FROM events WHERE is_active = 1 ORDER BY starts_at"
      ).all();
      return json({ events: results.map((event: any) => ({ ...event, seats_remaining: event.capacity - event.seats_sold })) });
    }
    if (request.method === "POST" && url.pathname === "/bookings") {
      const data = await request.json<any>();
      if (!data.eventId || !data.name || !data.email || !Number.isInteger(data.quantity) || data.quantity < 1) {
        return json({ error: "Event, name, email, and a valid seat quantity are required." }, 400);
      }
      // Payment verification belongs here. Do not reduce capacity from a browser request.
      return json({
        status: "payment_setup_required",
        message: "Payment processing has not been configured yet. No seats were charged or reserved."
      }, 503);
    }
    return json({ error: "Not found" }, 404);
  }
};
