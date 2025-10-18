"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../clerk/lib/getSession";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function createCheckoutSession(product: {
  id: string;
  name: string;
  description?: string;
  priceInCents: number;
  currency?: string;
}) {
  const { userId } = await getCurrentUser();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: product.currency ?? "usd",
          product_data: {
            name: product.name,
            description: product.description ?? "",
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}`,
    metadata: {
      productId: product.id,
      userId,
    },
  });

  // Redirect user to Stripe Checkout
  redirect(session.url!);
}
