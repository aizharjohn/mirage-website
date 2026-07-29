import Link from "next/link";
import { Lock } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Fragrances" },
      { href: "/shop?gender=her", label: "For Her" },
      { href: "/shop?gender=him", label: "For Him" },
      { href: "/shop?category=gift-sets", label: "Gift Sets" },
      { href: "/shop?badge=BEST%20SELLER", label: "Best Sellers" },
      { href: "/shop?category=new-arrivals", label: "New Arrivals" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { href: "/contact", label: "Track Order" },
      { href: "/contact", label: "Shipping & Delivery" },
      { href: "/contact", label: "Returns & Refunds" },
      { href: "/contact", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "About Us",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/about", label: "Ingredients" },
      { href: "/about", label: "Sustainability" },
      { href: "/about", label: "Reviews" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Terms of Service" },
      { href: "/contact", label: "Privacy Policy" },
      { href: "/contact", label: "Refund Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-6 lg:px-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center border border-gold text-[12px] tracking-[0.12em] text-gold sm:size-10 sm:text-[13px]">
              MP
            </span>
            <span className="font-serif text-base tracking-[0.14em] sm:text-lg">
              MIRAGÉ PERFUMES
            </span>
          </div>
          <p className="mb-3 font-serif text-base text-gold sm:text-lg">
            Luxury scents. Timeless memories. Yours.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-cream/65">
            Crafted with the finest ingredients and an obsession for lasting
            impressions. Discover fragrances made to leave a mark.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gold sm:mb-4">
              {col.title}
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {col.links.map((link) => (
                <li key={col.title + link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-[11px] text-cream/55 sm:flex-row sm:gap-4 sm:text-left sm:text-xs lg:px-6">
          <p className="inline-flex items-center gap-2 uppercase tracking-[0.12em]">
            <Lock className="size-3.5 text-gold" />
            Secure checkout · 100% secure
          </p>
          <p className="uppercase tracking-[0.1em]">
            We accept · Visa · Mastercard · Amex · PayPal
          </p>
          <p>© {new Date().getFullYear()} Mirage Perfumes. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
