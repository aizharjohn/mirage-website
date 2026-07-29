"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
      <div className="inline-flex self-start border border-border">
        <button
          type="button"
          aria-label="Decrease quantity"
          className="flex size-12 items-center justify-center text-sm transition hover:bg-cream-dark"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span className="flex min-w-10 items-center justify-center text-sm">
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          className="flex size-12 items-center justify-center text-sm transition hover:bg-cream-dark"
          onClick={() => setQty((q) => q + 1)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="min-h-12 flex-1 bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition hover:bg-ink-soft sm:flex-none"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
