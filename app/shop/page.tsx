import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/catalog";

const FILTERS = [
  { label: "All", href: "/shop" },
  { label: "For Her", href: "/shop?gender=her" },
  { label: "For Him", href: "/shop?gender=him" },
  { label: "Best Sellers", href: "/shop?badge=BEST%20SELLER" },
  { label: "New Arrivals", href: "/shop?category=new-arrivals" },
  { label: "Gift Sets", href: "/shop?category=gift-sets" },
  { label: "Collections", href: "/shop?category=collections" },
];

export const metadata = {
  title: "Shop",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    gender?: string;
    badge?: string;
  }>;
}) {
  const params = await searchParams;
  const products = await getProducts({
    category: params.category,
    gender: params.gender,
    badge: params.badge,
  });

  const title = params.badge
    ? params.badge
    : params.gender === "her"
      ? "For Her"
      : params.gender === "him"
        ? "For Him"
        : params.category === "gift-sets"
          ? "Gift Sets"
          : params.category === "new-arrivals"
            ? "New Arrivals"
            : params.category === "collections"
              ? "Collections"
              : "All Fragrances";

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12 lg:px-6 lg:py-16">
      <div className="mb-6 text-center sm:mb-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Shop</p>
        <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted sm:mt-3">
          {products.length} fragrance{products.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="-mx-3 mb-8 overflow-x-auto px-3 sm:mx-0 sm:mb-10 sm:overflow-visible sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
          {FILTERS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="inline-flex min-h-10 shrink-0 items-center border border-border px-3.5 py-2 text-[10px] uppercase tracking-[0.12em] text-ink transition hover:border-ink hover:bg-ink hover:text-cream sm:px-4 sm:text-[11px] sm:tracking-[0.14em]"
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <p className="py-20 text-center text-muted">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
