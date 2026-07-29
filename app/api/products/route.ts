import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const products = await getProducts({
    category: searchParams.get("category") || undefined,
    gender: searchParams.get("gender") || undefined,
    badge: searchParams.get("badge") || undefined,
    featured: searchParams.get("featured") === "true" || undefined,
  });

  return NextResponse.json({ products });
}
