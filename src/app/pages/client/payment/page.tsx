"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../../components/PaymentForm/PaymentForm";
import { useSearchParams } from "next/navigation"; // Import useSearchParams from Next.js

// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Home() {

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
