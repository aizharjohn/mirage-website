"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

function SocialIcon({
  className,
  path,
}: {
  className?: string;
  path: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d={path} />
    </svg>
  );
}

const SOCIAL = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    path: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z",
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.68a8.18 8.18 0 0 0 4.76 1.52V6.74a4.84 4.84 0 0 1-1-.05z",
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    path: "M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z",
  },
] as const;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      setMessage(data.message || "You're subscribed.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:gap-8 md:px-6 lg:flex-row lg:justify-between">
        <div className="flex items-start gap-3 text-center lg:text-left">
          <Mail className="mt-0.5 hidden size-6 shrink-0 text-gold sm:block" />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] sm:text-[12px] sm:tracking-[0.22em]">
              Stay in the Know
            </p>
            <p className="mt-1 max-w-sm text-sm text-cream/70">
              Subscribe for exclusive offers, new arrivals, and fragrance tips.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="min-h-12 flex-1 border border-white/20 bg-ink px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-12 bg-gold px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition hover:bg-gold-dark disabled:opacity-60"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>

        <div className="flex items-center gap-1">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="inline-flex size-11 items-center justify-center hover:text-gold"
            >
              <SocialIcon className="size-5" path={s.path} />
            </a>
          ))}
        </div>
      </div>
      {message && (
        <p
          className={`px-4 pb-4 text-center text-sm ${
            status === "error" ? "text-red-300" : "text-gold"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
