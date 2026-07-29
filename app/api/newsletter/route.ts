import { NextRequest, NextResponse } from "next/server";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import { SubscriberModel } from "@/models/Subscriber";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (isMongoConfigured()) {
      await connectDB();
      await SubscriberModel.findOneAndUpdate(
        { email },
        { email },
        { upsert: true, new: true },
      );
    }

    return NextResponse.json({
      message: "Thank you for subscribing.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    if (message.includes("duplicate") || message.includes("E11000")) {
      return NextResponse.json({ message: "You're already subscribed." });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
