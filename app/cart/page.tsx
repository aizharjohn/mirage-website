"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/types/product";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: { products: Product[] }) => setProducts(data.products ?? []))
      .finally(() => setLoading(false));
  }, []);

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.slug === item.slug);
        if (!product) return null;
        return { ...item, product };
      })
      .filter(Boolean) as { slug: string; quantity: number; product: Product }[];
  }, [items, products]);

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  async function checkout() {
    setCheckingOut(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setCheckingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center text-muted">
        Loading cart…
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
        <h1 className="font-serif text-3xl sm:text-4xl">Your Cart</h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex min-h-12 items-center bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-3 pb-28 pt-8 sm:px-4 sm:pb-16 sm:pt-12 lg:px-6 lg:py-16">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl">Your Cart</h1>
        <button
          type="button"
          onClick={clearCart}
          className="min-h-10 text-[11px] uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          Clear cart
        </button>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {lines.map((line) => (
          <div
            key={line.slug}
            className="flex gap-3 border-b border-border pb-5 sm:gap-4 sm:pb-6"
          >
            <Link
              href={`/shop/${line.slug}`}
              className="relative size-20 shrink-0 overflow-hidden bg-cream-dark sm:size-28"
            >
              <Image
                src={line.product.image}
                alt={line.product.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${line.slug}`}
                  className="font-serif text-lg hover:text-gold sm:text-xl"
                >
                  {line.product.name}
                </Link>
                <p className="text-xs text-muted sm:text-sm">{line.product.type}</p>
                <p className="mt-1 text-sm font-medium">
                  {formatPrice(line.product.price)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
                <div className="inline-flex border border-border">
                  <button
                    type="button"
                    aria-label="Decrease"
                    className="flex size-10 items-center justify-center"
                    onClick={() => updateQuantity(line.slug, line.quantity - 1)}
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="flex min-w-8 items-center justify-center text-sm">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase"
                    className="flex size-10 items-center justify-center"
                    onClick={() => updateQuantity(line.slug, line.quantity + 1)}
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <p className="min-w-16 text-right text-sm font-medium sm:min-w-20">
                  {formatPrice(line.product.price * line.quantity)}
                </p>
                <button
                  type="button"
                  aria-label="Remove"
                  onClick={() => removeItem(line.slug)}
                  className="flex size-10 items-center justify-center text-muted hover:text-ink"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop summary */}
      <div className="mt-10 hidden flex-col items-end gap-4 sm:flex">
        <div className="w-full max-w-sm space-y-2 border border-border bg-cream-dark/40 p-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-muted">
            Shipping & taxes calculated at checkout.
            {subtotal >= 100
              ? " You qualify for free shipping."
              : ` Add ${formatPrice(100 - subtotal)} more for free shipping.`}
          </p>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="button"
            disabled={checkingOut}
            onClick={checkout}
            className="mt-2 min-h-12 w-full bg-ink py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition hover:bg-ink-soft disabled:opacity-60"
          >
            {checkingOut ? "Redirecting…" : "Checkout with Stripe"}
          </button>
          <Link
            href="/shop"
            className="block text-center text-[11px] uppercase tracking-[0.14em] text-muted hover:text-ink"
          >
            Continue shopping
          </Link>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 p-3 backdrop-blur-md sm:hidden">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        {error && <p className="mb-2 text-xs text-red-700">{error}</p>}
        <button
          type="button"
          disabled={checkingOut}
          onClick={checkout}
          className="min-h-12 w-full bg-ink text-[11px] font-medium uppercase tracking-[0.2em] text-cream disabled:opacity-60"
        >
          {checkingOut ? "Redirecting…" : "Checkout with Stripe"}
        </button>
      </div>
    </div>
  );
}
