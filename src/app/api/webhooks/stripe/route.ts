import { db } from "@/drizzle";
import { AddressTable, OrderTable } from "@/drizzle/schema"; // <-- your orders table
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

// Disable body parsing so we can verify signature properly
export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    // Handle event types
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Ensure payment was successful
      if (session.payment_status === "paid") {
        const productId = session.metadata?.productId;
        const userId = session.metadata?.userId;

        console.log("✅ Payment successful for product:", productId);

        const shippingDetails = await db.query.AddressTable.findFirst({
          orderBy: desc(AddressTable.createdAt),
        });

        // Insert order record into your database
        await db.insert(OrderTable).values({
          paymentIntentId: session.payment_intent,
          shippingAddressId: shippingDetails?.id,
          pricePaidInCents: session.amount_total ?? 0,
          status: "PROCESSING",
          productId,
          userId,
        });

        console.log("🧾 Order added to database.");
      }
    }

    // You can handle refund, failed payments, etc.
    else {
      console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook handler failed:", err);
    return new NextResponse(`Webhook Handler Error: ${err.message}`, {
      status: 500,
    });
  }
}
