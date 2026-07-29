import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-3 py-8 sm:gap-10 sm:px-4 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-16">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark sm:aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] sm:left-4 sm:top-4 sm:px-2.5 sm:text-[10px] sm:tracking-[0.14em] ${
              product.badge === "NEW" || product.badge === "SALE"
                ? "bg-gold text-ink"
                : "bg-ink text-cream"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center pb-8 lg:pb-0">
        <Link
          href="/shop"
          className="mb-3 inline-flex min-h-10 items-center text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink sm:mb-4"
        >
          ← Back to Shop
        </Link>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          {product.type}
        </p>
        <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl md:text-5xl">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-3.5 sm:size-4"
              fill={i < Math.round(product.rating) ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          ))}
          <span className="ml-2 text-sm text-muted">
            ({product.reviewCount} reviews)
          </span>
        </div>
        <p className="mt-4 text-xl font-medium tracking-wide sm:text-2xl">
          {formatPrice(product.price)}
          {product.compareAtPrice ? (
            <span className="ml-3 text-base text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </p>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
          {product.description}
        </p>
        <div className="mt-5 sm:mt-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink">
            Notes
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.notes.map((note) => (
              <span
                key={note}
                className="border border-border px-3 py-1.5 text-xs text-ink-soft"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 sm:mt-8">
          <AddToCartButton slug={product.slug} />
        </div>
        <p className="mt-4 text-xs text-muted">
          {product.stock > 0
            ? `${product.stock} in stock · Free shipping over $100`
            : "Out of stock"}
        </p>
      </div>
    </div>
  );
}
