import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/catalog";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import { getBaseUrl, getStripe } from "@/lib/stripe";
import { OrderModel } from "@/models/Order";

interface CheckoutItem {
  slug: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local.",
        },
        { status: 503 },
      );
    }

    const body = (await request.json()) as { items?: CheckoutItem[] };
    const items = body.items ?? [];

    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems: {
      price_data: {
        currency: string;
        product_data: { name: string; images?: string[] };
        unit_amount: number;
      };
      quantity: number;
    }[] = [];

    const orderItems: {
      slug: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }[] = [];

    let amountTotal = 0;

    for (const item of items) {
      if (!item.slug || item.quantity < 1) continue;
      const product = await getProductBySlug(item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.slug}` },
          { status: 400 },
        );
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 },
        );
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });

      orderItems.push({
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });

      amountTotal += product.price * item.quantity;
    }

    if (!lineItems.length) {
      return NextResponse.json({ error: "No valid items" }, { status: 400 });
    }

    const stripe = getStripe();
    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "AE", "PH"],
      },
      metadata: {
        items: JSON.stringify(
          orderItems.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        ),
      },
    });

    if (isMongoConfigured()) {
      await connectDB();
      await OrderModel.create({
        stripeSessionId: session.id,
        items: orderItems,
        amountTotal,
        currency: "usd",
        status: "pending",
      });
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Checkout failed",
      },
      { status: 500 },
    );
  }
}
