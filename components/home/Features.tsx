import { Gift, ShieldCheck, Sparkles, SprayCan, Truck } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "On orders over $100",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    text: "Finest ingredients",
  },
  {
    icon: SprayCan,
    title: "Long Lasting",
    text: "Fragrances that stay",
  },
  {
    icon: Gift,
    title: "Gift Wrapping",
    text: "Make it extra special",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "Safe & trusted checkout",
  },
];

export function Features() {
  return (
    <section className="border-b border-border bg-cream">
      {/* Mobile: horizontal snap */}
      <div className="snap-row px-4 py-8 sm:hidden">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex w-[42vw] max-w-[160px] flex-col items-center text-center"
          >
            <f.icon className="mb-2.5 size-6 text-ink" strokeWidth={1.25} />
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink">
              {f.title}
            </p>
            <p className="mt-1 text-[11px] text-muted">{f.text}</p>
          </div>
        ))}
      </div>

      {/* Tablet+: single aligned row of 5 */}
      <div className="mx-auto hidden max-w-7xl grid-cols-5 gap-3 px-4 py-10 sm:grid md:gap-6 lg:gap-8 lg:px-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center text-center"
          >
            <f.icon className="mb-3 size-7 text-ink" strokeWidth={1.25} />
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink md:text-[11px] md:tracking-[0.18em]">
              {f.title}
            </p>
            <p className="mt-1 text-[11px] text-muted md:text-xs">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
