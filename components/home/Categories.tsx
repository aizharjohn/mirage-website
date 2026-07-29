import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "For Her",
    href: "/shop?gender=her",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
  },
  {
    title: "For Him",
    href: "/shop?gender=him",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a52d75?w=600&q=80",
  },
  {
    title: "Collections",
    href: "/shop?category=collections",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
  },
  {
    title: "Gift Sets",
    href: "/shop?category=gift-sets",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
  },
  {
    title: "New Arrivals",
    href: "/shop?category=new-arrivals",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&q=80",
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
      : "mb-3 size-28 sm:mb-4 sm:size-32 md:size-36";

  return (
    <Link
      href={cat.href}
      className="group flex flex-col items-center text-center"
    >
      <div
        className={`relative overflow-hidden rounded-full border border-border ${circle}`}
      >
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="144px"
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
      <div className="snap-row justify-start gap-6 px-4 sm:hidden">
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="w-[28vw] min-w-[100px]">
            <CategoryItem cat={cat} size="sm" />
          </div>
        ))}
      </div>

      {/* Tablet+ */}
      <div className="mx-auto hidden max-w-7xl flex-wrap justify-center gap-8 px-4 sm:flex sm:gap-10 md:justify-between lg:px-6">
        {CATEGORIES.map((cat) => (
          <CategoryItem key={cat.title} cat={cat} />
        ))}
      </div>
    </section>
  );
}
