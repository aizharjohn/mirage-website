import { NextRequest, NextResponse } from "next/server";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import { getStripe } from "@/lib/stripe";
import { OrderModel } from "@/models/Order";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (isMongoConfigured()) {
      await connectDB();
      await OrderModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: "paid",
          email: session.customer_details?.email || session.customer_email,
          amountTotal: (session.amount_total ?? 0) / 100,
        },
      );
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (isMongoConfigured()) {
      await connectDB();
      await OrderModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: "failed" },
      );
    }
  }

  return NextResponse.json({ received: true });
}
