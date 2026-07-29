import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "For Her",
    href: "/shop?gender=her",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1630573133526-8d090e0269af?w=600&q=80",
  },
  {
    title: "For Him",
    href: "/shop?gender=him",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1732828912683-57104a2d1b4b?w=600&q=80",
  },
  {
    title: "Collections",
    href: "/shop?category=collections",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?w=600&q=80",
  },
  {
    title: "Gift Sets",
    href: "/shop?category=gift-sets",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?w=600&q=80",
  },
  {
    title: "New Arrivals",
    href: "/shop?category=new-arrivals",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1768025719875-48ed072f3084?w=600&q=80",
  },
];

function CategoryItem({
  cat,
  size = "md",
}: {
  cat: (typeof CATEGORIES)[number];
  size?: "sm" | "md";
}) {
  const circle =
    size === "sm"
      ? "mb-3 size-24"
      : "mb-3 aspect-square w-[min(100%,9rem)] sm:mb-4 md:w-[min(100%,10rem)]";

  return (
    <Link
      href={cat.href}
      className="group flex w-full max-w-[10rem] flex-col items-center text-center"
    >
      <div
        className={`relative overflow-hidden rounded-full border border-border ${circle}`}
      >
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="160px"
        />
      </div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink sm:text-[12px] sm:tracking-[0.18em]">
        {cat.title}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted transition group-hover:text-gold sm:text-[11px] sm:tracking-[0.14em]">
        {cat.cta} →
      </p>
    </Link>
  );
}

export function Categories() {
  return (
    <section className="border-t border-border bg-cream-dark/40 py-12 sm:py-16 lg:py-20">
      {/* Mobile snap */}
      <div className="snap-row gap-5 px-4 sm:hidden">
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="w-[28vw] min-w-[100px]">
            <CategoryItem cat={cat} size="sm" />
          </div>
        ))}
      </div>

      {/* Tablet+: evenly spaced single row */}
      <div className="mx-auto hidden max-w-7xl grid-cols-5 items-start justify-items-center gap-4 px-4 sm:grid md:gap-6 lg:gap-8 lg:px-6">
        {CATEGORIES.map((cat) => (
          <CategoryItem key={cat.title} cat={cat} />
        ))}
      </div>
    </section>
  );
}
