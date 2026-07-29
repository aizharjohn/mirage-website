"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HelpCircle, Sparkles, Truck } from "lucide-react";

const MESSAGES = [
  {
    icon: Truck,
    text: "Free shipping on orders over $100",
  },
  {
    icon: Sparkles,
    text: (
      <>
        20% OFF first order · Code: <span className="text-gold">MIRAGE20</span>
      </>
    ),
  },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const current = MESSAGES[index];
  const Icon = current.icon;

  return (
    <div className="bg-ink text-cream text-[10px] tracking-[0.08em] uppercase sm:text-[11px]">
      {/* Mobile: rotating single message */}
      <div className="flex items-center justify-center gap-2 px-3 py-2.5 sm:hidden">
        <Icon className="size-3.5 shrink-0 text-gold" aria-hidden />
        <p key={index} className="animate-fade-in text-center">
          {current.text}
        </p>
      </div>

      {/* Tablet+: full bar */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:flex md:px-6">
        <p className="flex min-w-0 items-center gap-2">
          <Truck className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">Free shipping on orders over $100</span>
        </p>
        <p className="flex min-w-0 items-center gap-2 text-center">
          <Sparkles className="size-3.5 shrink-0 text-gold" aria-hidden />
          <span className="truncate">
            20% OFF your first order | Use code:{" "}
            <span className="text-gold">MIRAGE20</span>
          </span>
        </p>
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <Link
            href="/contact"
            className="transition-opacity hover:opacity-70"
          >
            Track Order
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            <HelpCircle className="size-3.5" aria-hidden />
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
