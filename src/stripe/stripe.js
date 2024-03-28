// stripe.js
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51O8JrkLKZFhBV9bUuvAuv9wOaBXtIErwQhrUEeo1vygb3rR7qYJpu6lROiUNzxH0qPDJznqzoYXRByKM59QOHVih007lc4suFs"
);
export default stripePromise;
