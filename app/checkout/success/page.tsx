"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <CheckCircle className="mx-auto size-14 text-gold" strokeWidth={1.25} />
      <h1 className="mt-6 font-serif text-4xl text-ink">Thank You</h1>
      <p className="mt-4 text-muted">
        Your order has been placed. A confirmation email will arrive shortly
        from Stripe.
      </p>
      {sessionId && (
        <p className="mt-3 break-all text-xs text-muted/70">
          Reference: {sessionId}
        </p>
      )}
      <Link
        href="/shop"
        className="mt-10 inline-block bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-muted">Confirming order…</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
