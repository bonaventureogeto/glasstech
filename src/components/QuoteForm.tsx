"use client";

import type { FormEvent } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { quoteMessage, site, whatsappLink } from "@/content/site";

const field =
  "w-full rounded-button border border-white/18 bg-white/6 px-4 text-[15px] text-white placeholder:text-mist-muted focus-visible:border-sky";
const label = "eyebrow text-xs tracking-[0.1em] text-mist-muted";

export default function QuoteForm() {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [quoteMessage];
    for (const [key, name] of [["Name", "name"], ["Phone", "phone"], ["Job", "job"]]) {
      const value = String(data.get(name) ?? "").trim();
      if (value) lines.push(`${key}: ${value}`);
    }
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    // Without JS the form still opens WhatsApp with a plain quote request.
    <form
      action={`https://wa.me/${site.whatsappNumber}`}
      method="get"
      target="_blank"
      onSubmit={submit}
      aria-label="Get a measured quote"
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="text" value={quoteMessage} />
      <div className="flex flex-col gap-3.5">
        <label htmlFor="quote-name" className={label}>
          Your name
        </label>
        <input id="quote-name" name="name" type="text" autoComplete="name" placeholder="Jane Wanjiru" className={`${field} h-12`} />
        <label htmlFor="quote-phone" className={label}>
          Phone
        </label>
        <input
          id="quote-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+254 7…"
          className={`${field} h-12`}
        />
        <label htmlFor="quote-job" className={label}>
          The job
        </label>
        <textarea
          id="quote-job"
          name="job"
          rows={3}
          placeholder="e.g. Frameless shower screen, 2m x 2.1m, Kilimani"
          className={`${field} resize-y py-3`}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="submit" className="btn btn-red min-h-[52px] text-[15px]">
          <WhatsAppIcon />
          Send on WhatsApp
        </button>
        <a href={site.phones[0].href} className="btn btn-ghost min-h-[52px] text-[15px]">
          <PhoneIcon size={18} />
          Call the workshop
        </a>
      </div>
    </form>
  );
}
