"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1800&q=80",
    headline: "Crafted to Inspire.\nMade to Leave a Mark.",
    sub: "Premium fragrances for every moment, made unforgettable.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1800&q=80",
    headline: "Discover Noir Oud.\nDark. Warm. Unforgettable.",
    sub: "Our signature best seller — oud, amber, and black pepper.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1800&q=80",
    headline: "New Season Scents.\nLight Meets Luxury.",
    sub: "Explore Rose Lumière and the latest atelier arrivals.",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="relative min-h-[min(88dvh,640px)] w-full overflow-hidden bg-ink sm:min-h-[min(85vh,760px)] lg:min-h-[85vh]">
      {SLIDES.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt=""
          fill
          priority={i === 0}
          className={`object-cover object-[70%_center] transition-opacity duration-1000 sm:object-center ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/25 sm:bg-gradient-to-r sm:from-ink/75 sm:via-ink/45 sm:to-ink/20" />

      <div className="relative z-10 mx-auto flex min-h-[min(88dvh,640px)] max-w-7xl flex-col justify-end px-4 pb-16 pt-24 sm:min-h-[min(85vh,760px)] sm:justify-center sm:px-6 sm:pb-20 lg:min-h-[85vh] lg:px-8">
        <div key={index} className="max-w-xl">
          <h1 className="animate-fade-up font-serif text-[2rem] leading-[1.15] text-cream min-[400px]:text-4xl sm:text-5xl lg:text-6xl whitespace-pre-line">
            {slide.headline.split("\n").map((line, i) => (
              <span key={line} className={i === 1 ? "text-gold" : undefined}>
                {i > 0 ? "\n" : ""}
                {line}
              </span>
            ))}
          </h1>
          <p className="animate-fade-up animate-delay-1 mt-4 max-w-md text-sm leading-relaxed text-cream/85 sm:mt-5 sm:text-base lg:text-lg">
            {slide.sub}
          </p>
          <div className="animate-fade-up animate-delay-2 mt-6 sm:mt-8">
            <Link
              href="/shop"
              className="inline-flex w-full items-center justify-center bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-cream transition hover:bg-ink-soft sm:w-auto"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2.5 sm:bottom-8">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition sm:h-2 sm:w-2 ${
              i === index ? "bg-gold scale-110" : "bg-cream/50 hover:bg-cream/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
