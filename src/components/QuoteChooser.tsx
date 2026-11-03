"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { lines, phones, quoteMessages, quoteOptions, whatsappHref } from "@/content/links";

type Placement = "below-start" | "below-end" | "below-center" | "above-end" | "sheet";

const panel: Record<Placement, string> = {
  "below-start": "top-full left-0 mt-2 w-[300px]",
  "below-end": "top-full right-0 mt-2 w-[300px]",
  "below-center": "top-full left-1/2 mt-2 w-[300px] -translate-x-1/2",
  "above-end": "bottom-full right-0 mb-3 w-[300px]",
  // Placed against the nearest positioned ancestor (the mobile bar), so it
  // spans the bar's width above it rather than hanging off the button.
  sheet: "inset-x-4 bottom-full mb-2",
};

// "Which quote?": a button that opens two WhatsApp links, one per line, each
// with its own prefilled message. Built on <details>, so it opens without
// JavaScript; with it, a click outside, Escape or picking an option closes it.
export default function QuoteChooser({
  children,
  label,
  buttonClassName,
  placement = "below-start",
  className = "",
}: {
  /** The button's content */
  children: ReactNode;
  /** Accessible name, when the button shows only an icon */
  label?: string;
  buttonClassName: string;
  placement?: Placement;
  className?: string;
}) {
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const d = details.current;
    if (!d) return;
    const onPointerDown = (e: PointerEvent) => {
      if (d.open && !d.contains(e.target as Node)) d.open = false;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !d.open) return;
      d.open = false;
      d.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details ref={details} className={`group ${placement === "sheet" ? "" : "relative"} ${className}`}>
      <summary aria-label={label} className={`${buttonClassName} list-none [&::-webkit-details-marker]:hidden`}>
        {children}
      </summary>
      <div
        className={`absolute z-50 flex flex-col gap-1 rounded-card border border-line bg-white p-2 text-left text-ink shadow-[0_18px_48px_rgb(6_47_77/0.28)] ${panel[placement]}`}
      >
        <p className="eyebrow px-3 pt-2 pb-1 text-[11px] text-navy">Get a quote on WhatsApp</p>
        <ul className="flex flex-col gap-1">
          {lines.map((line) => (
            <li key={line}>
              <a
                href={whatsappHref(line, quoteMessages[line])}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => details.current?.removeAttribute("open")}
                className="flex min-h-14 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-frost"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-red text-white">
                  <WhatsAppIcon size={18} />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[15px] leading-snug font-semibold">{quoteOptions[line].title}</span>
                  <span className="text-[13px] leading-snug text-muted">
                    {quoteOptions[line].blurb} · {phones[line].display}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
