"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const NAV = [
  { href: "/", label: "Home" },
  {
    href: "/shop",
    label: "Shop",
    children: [
      { href: "/shop?gender=her", label: "For Her" },
      { href: "/shop?gender=him", label: "For Him" },
      { href: "/shop?category=gift-sets", label: "Gift Sets" },
    ],
  },
  { href: "/shop?badge=BEST%20SELLER", label: "Best Sellers" },
  { href: "/shop?category=new-arrivals", label: "New Arrivals" },
  {
    href: "/shop?category=collections",
    label: "Collections",
    children: [
      { href: "/shop?category=collections", label: "Atelier" },
      { href: "/shop?category=fragrances", label: "All Fragrances" },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2 shrink-0 sm:gap-2.5">
      <span className="flex size-8 items-center justify-center border border-gold text-[11px] font-medium leading-none tracking-[0.12em] text-gold transition-colors group-hover:bg-gold group-hover:text-ink sm:size-9 sm:text-[12px]">
        MP
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-base tracking-[0.14em] text-ink sm:text-lg md:text-xl">
          MIRAGÉ
        </span>
        <span className="mt-0.5 font-sans text-[8px] tracking-[0.28em] text-ink sm:mt-1 sm:text-[9px]">
          PERFUMES
        </span>
      </span>
    </Link>
  );
}

function NavItem({
  href,
  label,
  active,
  hasDropdown,
}: {
  href: string;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}) {
  return (
    <Link
      href={href}
      className="nav-link inline-flex h-9 items-center gap-1 whitespace-nowrap text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-ink xl:text-[11px] xl:tracking-[0.16em]"
      data-active={active}
    >
      {label}
      {hasDropdown ? (
        <ChevronDown className="size-3 shrink-0 opacity-60" aria-hidden />
      ) : null}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto] items-center gap-2 px-3 sm:h-16 sm:grid-cols-[auto_1fr_auto] sm:gap-4 sm:px-4 lg:h-[4.25rem] lg:px-6">
        <Logo />

        <nav className="hidden h-full items-center justify-center gap-4 xl:gap-7 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="group relative flex h-full items-center"
              >
                <NavItem
                  href={item.href}
                  label={item.label}
                  active={pathname.startsWith("/shop")}
                  hasDropdown
                />
                <div className="invisible absolute left-0 top-full z-20 min-w-[180px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="border border-border bg-cream py-2 shadow-sm">
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-[11px] uppercase leading-none tracking-[0.14em] text-ink-soft transition-colors hover:bg-cream-dark hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.href} className="flex h-full items-center">
                <NavItem
                  href={item.href}
                  label={item.label}
                  active={pathname === item.href}
                />
              </div>
            ),
          )}
        </nav>

        <div className="flex h-full items-center justify-end gap-0.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="hidden size-10 items-center justify-center text-ink transition-opacity hover:opacity-60 sm:inline-flex"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden size-10 items-center justify-center text-ink transition-opacity hover:opacity-60 sm:inline-flex"
          >
            <User className="size-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden size-10 items-center justify-center text-ink transition-opacity hover:opacity-60 md:inline-flex"
          >
            <Heart className="size-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/cart"
            aria-label={`Cart, ${itemCount} items`}
            className="relative inline-flex size-10 items-center justify-center text-ink transition-opacity hover:opacity-60"
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center bg-ink text-[9px] font-medium leading-none text-cream">
              {itemCount}
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-[calc(env(safe-area-inset-top)+3.5rem)] z-40 bg-ink/40 transition-opacity sm:top-[calc(env(safe-area-inset-top)+4rem)] lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <div
        className={`absolute inset-x-0 top-full z-50 max-h-[min(80vh,calc(100dvh-3.5rem))] overflow-y-auto border-t border-border bg-cream shadow-lg transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3 pb-8">
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-border/60 last:border-0">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between py-3 text-left text-xs uppercase tracking-[0.16em]"
                    onClick={() =>
                      setExpanded((v) => (v === item.label ? null : item.label))
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 transition ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expanded === item.label && (
                    <div className="mb-3 ml-3 flex flex-col border-l border-border pl-3">
                      <Link
                        href={item.href}
                        className="min-h-10 py-2.5 text-[11px] uppercase tracking-[0.14em] text-ink"
                        onClick={() => setOpen(false)}
                      >
                        View all
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="min-h-10 py-2.5 text-[11px] uppercase tracking-[0.14em] text-muted"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center py-3 text-xs uppercase tracking-[0.16em]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/account"
            className="mt-2 flex min-h-12 items-center py-3 text-xs uppercase tracking-[0.16em] text-muted sm:hidden"
            onClick={() => setOpen(false)}
          >
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
