import { NextResponse } from "next/server";
import { seedProducts } from "@/lib/catalog";

export async function POST() {
  try {
    const result = await seedProducts();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to seed",
      },
      { status: 500 },
    );
  }
}
