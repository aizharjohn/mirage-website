"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";

export function ProductCard({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <article className={`group flex flex-col ${className}`}>
      <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-cream-dark sm:mb-4">
        {product.badge && (
          <span
            className={`absolute left-2 top-2 z-10 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px] sm:tracking-[0.14em] ${
              product.badge === "NEW" || product.badge === "SALE"
                ? "bg-gold text-ink"
                : "bg-ink text-cream"
            }`}
          >
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 z-10 flex size-9 items-center justify-center text-ink/70 transition hover:text-ink sm:right-3 sm:top-3"
        >
          <Heart className="size-4 sm:size-5" strokeWidth={1.5} />
        </button>
        <Link href={`/shop/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 20vw"
          />
        </Link>
        {/* Always visible on touch; slide up on desktop hover */}
        <button
          type="button"
          onClick={() => addItem(product.slug)}
          className="absolute inset-x-0 bottom-0 bg-ink/95 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-cream transition sm:translate-y-full sm:py-3 sm:text-[11px] sm:tracking-[0.18em] sm:group-hover:translate-y-0"
        >
          Add to Cart
        </button>
      </div>
      <Link href={`/shop/${product.slug}`} className="block min-w-0">
        <h3 className="truncate font-serif text-base text-ink sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted sm:text-xs">{product.type}</p>
        <p className="mt-1.5 text-sm font-medium tracking-wide sm:mt-2">
          {formatPrice(product.price)}
          {product.compareAtPrice ? (
            <span className="ml-2 text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </p>
        <div className="mt-1 flex items-center gap-0.5 text-gold sm:mt-1.5 sm:gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-2.5 sm:size-3"
              fill={i < Math.round(product.rating) ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          ))}
          <span className="ml-1 text-[10px] text-muted sm:text-xs">
            ({product.reviewCount})
          </span>
        </div>
      </Link>
    </article>
  );
}
