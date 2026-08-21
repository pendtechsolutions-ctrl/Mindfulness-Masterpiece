// Booking configuration — replace the placeholder values when payment accounts are ready.
// A real API URL is required before the site will accept bookings or alter seat totals.
window.MindfulnessBooking = {
  apiUrl: "", // Example: https://mindfulness-booking-api.your-account.workers.dev
  events: [
    {
      id: "next-paint-night",
      title: "Next Paint Night",
      date: "Date coming soon",
      venue: "Location coming soon",
      priceCents: 0,
      capacity: 0,
      seatsSold: 0,
      description: "Details will be posted soon. Join the waitlist or check back for the announcement."
    }
  ],
  payment: {
    paypalClientId: "", // Add the live PayPal client ID here later.
    squareApplicationId: "", // Cash App Pay is processed through Square.
    squareLocationId: ""
  }
};
