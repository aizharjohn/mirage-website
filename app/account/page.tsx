import Link from "next/link";

export const metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
        Account
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Coming Soon</h1>
      <p className="mt-4 text-muted">
        Guest checkout is available now. Sign-in and order history will arrive
        in a future release.
      </p>
      <Link
        href="/shop"
        className="mt-10 inline-block bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
