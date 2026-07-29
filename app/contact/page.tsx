"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 lg:py-24">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
        Contact
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
        We&apos;re Here to Help
      </h1>
      <p className="mt-4 text-muted">
        Questions about orders, shipping, or finding your signature scent?
        Reach out and we&apos;ll get back within 1–2 business days.
      </p>

      {sent ? (
        <p className="mt-10 border border-border bg-cream-dark/50 p-6 text-sm text-ink">
          Thank you — your message has been received. (Demo form; wire to email
          later.)
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <div>
            <label htmlFor="name" className="text-[11px] uppercase tracking-[0.14em]">
              Name
            </label>
            <input
              id="name"
              required
              className="mt-1.5 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-[11px] uppercase tracking-[0.14em]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1.5 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-[11px] uppercase tracking-[0.14em]">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className="mt-1.5 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </div>
          <button
            type="submit"
            className="bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition hover:bg-ink-soft"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-12 border-t border-border pt-8 text-sm text-muted">
        <p>hello@mirageperfumes.com</p>
        <p className="mt-1">Track order · Shipping · Returns — via this form</p>
      </div>
    </div>
  );
}
