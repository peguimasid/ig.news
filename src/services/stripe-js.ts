import { loadStripe } from '@stripe/stripe-js';

export async function getStripe() {
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  return stripe;
}
