import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between gap-4 px-4 sm:mb-10 lg:px-6">
        <h2 className="font-serif text-2xl tracking-wide text-ink sm:text-3xl md:text-4xl">
          Best Sellers
        </h2>
        <Link
          href="/shop?badge=BEST%20SELLER"
          className="shrink-0 text-[10px] font-medium uppercase tracking-[0.16em] text-ink transition hover:text-gold sm:text-[11px] sm:tracking-[0.18em]"
        >
          View All →
        </Link>
      </div>

      {/* Mobile: snap carousel */}
      <div className="snap-row px-4 sm:hidden">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            className="w-[58vw] max-w-[220px]"
          />
        ))}
      </div>

      {/* Tablet+: 5-col grid matching featured count */}
      <div className="mx-auto hidden max-w-7xl grid-cols-5 gap-x-3 gap-y-10 px-4 sm:grid md:gap-x-4 lg:gap-x-5 lg:px-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
