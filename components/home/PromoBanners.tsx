import Image from "next/image";
import Link from "next/link";

export function PromoBanners() {
  return (
    <section className="mx-auto grid max-w-7xl gap-3 px-3 pb-12 sm:grid-cols-2 sm:gap-4 sm:px-4 sm:pb-16 lg:gap-6 lg:px-6 lg:pb-20">
      <div className="relative flex min-h-[260px] flex-col justify-center overflow-hidden bg-cream-dark px-5 py-10 sm:min-h-[300px] sm:px-8 sm:py-12 md:min-h-[320px] md:px-10">
        <div className="relative z-10 max-w-[220px] sm:max-w-xs">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dark sm:text-[11px] sm:tracking-[0.22em]">
            The Perfect Gift
          </p>
          <h3 className="mt-2 font-serif text-2xl text-ink sm:mt-3 sm:text-3xl md:text-4xl">
            Gift Sets
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
            Beautifully curated sets for every occasion.
          </p>
          <Link
            href="/shop?category=gift-sets"
            className="mt-5 inline-flex min-h-11 items-center bg-ink px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-cream transition hover:bg-ink-soft sm:mt-6 sm:px-6 sm:text-[11px] sm:tracking-[0.18em]"
          >
            Shop Gift Sets
          </Link>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=900&q=80"
          alt="Gift set of perfume bottles"
          width={320}
          height={320}
          className="pointer-events-none absolute -right-8 bottom-0 h-[55%] w-auto object-contain opacity-80 sm:-right-6 sm:h-[70%] sm:opacity-90 md:right-4"
        />
      </div>

      <div className="relative flex min-h-[260px] flex-col justify-center overflow-hidden px-5 py-10 sm:min-h-[300px] sm:px-8 sm:py-12 md:min-h-[320px] md:px-10">
        <Image
          src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80"
          alt="Limited time fragrance offer"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative z-10 max-w-[240px] sm:max-w-xs">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold sm:text-[11px] sm:tracking-[0.22em]">
            Limited Time Only
          </p>
          <h3 className="mt-2 font-serif text-2xl text-cream sm:mt-3 sm:text-3xl md:text-4xl">
            Special Offer
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/80 sm:mt-3">
            Enjoy up to 20% off on selected fragrances.
          </p>
          <Link
            href="/shop?badge=SALE"
            className="mt-5 inline-flex min-h-11 items-center border border-cream px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-cream transition hover:bg-cream hover:text-ink sm:mt-6 sm:px-6 sm:text-[11px] sm:tracking-[0.18em]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
