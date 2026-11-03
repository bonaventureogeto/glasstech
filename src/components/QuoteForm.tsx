"use client";

import { useState, type FormEvent } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { quoteGreeting, telHref, whatsappHref, type Line } from "@/content/links";

const field =
  "w-full rounded-button border border-white/18 bg-white/6 px-4 text-[15px] text-white placeholder:text-mist-muted focus-visible:border-sky";
const label = "eyebrow text-xs tracking-[0.1em] text-mist-muted";

// What the glass is for decides which line the message (and the call) goes to.
const kinds: { line: Line; label: string }[] = [
  { line: "architectural", label: "Building or interior glass" },
  { line: "automotive", label: "Vehicle glass" },
];

export default function QuoteForm() {
  const [line, setLine] = useState<Line>("architectural");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [quoteGreeting];
    if (line === "automotive") lines.push("For: vehicle glass");
    for (const [key, name] of [["Name", "name"], ["Phone", "phone"], ["Job", "job"]]) {
      const value = String(data.get(name) ?? "").trim();
      if (value) lines.push(`${key}: ${value}`);
    }
    window.open(whatsappHref(line, lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    // Without JS the form still opens WhatsApp (the architectural line) with a plain quote request.
    <form
      action={whatsappHref("architectural")}
      method="get"
      target="_blank"
      onSubmit={submit}
      aria-label="Get a measured quote"
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="text" value={quoteGreeting} />
      <fieldset>
        <legend className={`${label} mb-3.5`}>The glass is for</legend>
        <div className="grid grid-cols-2 gap-2">
          {kinds.map((k) => (
            <label key={k.line} className="flex cursor-pointer">
              <input
                type="radio"
                name="line"
                value={k.line}
                checked={line === k.line}
                onChange={() => setLine(k.line)}
                className="peer sr-only"
              />
              <span className="flex min-h-12 w-full items-center justify-center rounded-button border border-white/18 bg-white/6 px-3 text-center text-sm leading-tight font-semibold text-mist transition-colors peer-checked:border-white peer-checked:bg-white peer-checked:text-navy-deep peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky hover:border-white/40">
                {k.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
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
          placeholder={
            line === "automotive"
              ? "e.g. Cracked windshield, Toyota Probox, Westlands"
              : "e.g. Frameless shower screen, 2m x 2.1m, Kilimani"
          }
          className={`${field} resize-y py-3`}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="submit" className="btn btn-red min-h-[52px] text-[15px]">
          <WhatsAppIcon />
          Send on WhatsApp
        </button>
        <a href={telHref(line)} className="btn btn-ghost min-h-[52px] text-[15px]">
          <PhoneIcon size={18} />
          Call the workshop
        </a>
      </div>
    </form>
  );
}
