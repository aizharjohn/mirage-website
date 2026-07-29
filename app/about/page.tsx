export const metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
        Our Story
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
        Crafted to Inspire
      </h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
        <p>
          Miragé Perfumes was founded on a simple belief: a fragrance should do
          more than scent the air — it should leave a mark on memory.
        </p>
        <p>
          We source the finest ingredients and blend them into compositions that
          feel both timeless and modern. From the depth of Noir Oud to the light
          of Rose Lumière, every bottle is made to be worn and remembered.
        </p>
        <p>
          Luxury scents. Timeless memories. Yours.
        </p>
      </div>
    </div>
  );
}
