"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/icons";
import { quoteMessage, site, whatsappLink } from "@/content/site";

const fields = [
  {
    id: "quote-service",
    label: "Service",
    options: [
      "Automotive glass",
      "Glass shower cubicle",
      "Office partitioning",
      "Building glass supply",
      "Balconies and railings",
      "Mirrors and splashbacks",
    ],
  },
  {
    id: "quote-glass",
    label: "Glass type",
    options: ["Toughened", "Laminated", "Low-iron", "Clear float", "Mirror", "Not sure yet"],
  },
  {
    id: "quote-location",
    label: "Location",
    options: ["Nairobi", "Kiambu", "Machakos", "Nakuru", "Mombasa", "Elsewhere in Kenya"],
  },
] as const;

export default function Configurator() {
  const [values, setValues] = useState<string[]>(fields.map((f) => f.options[0]));

  const message = `${quoteMessage}\nService: ${values[0]}\nGlass type: ${values[1]}\nLocation: ${values[2]}`;

  function submit(e: FormEvent) {
    e.preventDefault();
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      {/* Without JS this still opens WhatsApp with a plain quote request. */}
      <form
        action={`https://wa.me/${site.whatsappNumber}`}
        method="get"
        target="_blank"
        onSubmit={submit}
        aria-label="Quick quote"
        className="grid grid-cols-2 overflow-hidden rounded-card bg-white text-ink shadow-[0_24px_60px_rgb(0_0_0/0.35)] min-[880px]:grid-cols-4"
      >
        <input type="hidden" name="text" value={quoteMessage} />
        {fields.map((f, i) => (
          <div
            key={f.id}
            className={`relative flex flex-col gap-1.5 border-line px-[18px] pt-4 pb-2 min-[880px]:border-b-0 min-[880px]:px-[22px] min-[880px]:pt-[18px] min-[880px]:pb-2.5 ${
              i === 0 ? "col-span-2 border-b min-[880px]:col-span-1 min-[880px]:border-r" : "border-b"
            } ${i === 1 ? "border-r" : ""}`}
          >
            <label htmlFor={f.id} className="eyebrow text-[11px] text-navy">
              {f.label}
            </label>
            <select
              id={f.id}
              value={values[i]}
              onChange={(e) => setValues((v) => v.map((x, j) => (j === i ? e.target.value : x)))}
              className="min-h-11 w-full cursor-pointer appearance-none bg-transparent pr-6 text-base font-semibold text-ink"
            >
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <ChevronDownIcon
              size={16}
              className="pointer-events-none absolute right-[18px] bottom-[22px] text-muted min-[880px]:right-[22px] min-[880px]:bottom-6"
            />
          </div>
        ))}
        <div className="col-span-2 flex p-2.5 min-[880px]:col-span-1">
          <button type="submit" className="btn btn-navy min-h-[52px] flex-1 text-[15px] min-[880px]:min-h-14">
            Get my quote on WhatsApp
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </form>
      <p className="mt-3.5 text-center text-[13px] text-mist-muted">
        Reply within a couple of hours on business days. No obligation.
      </p>
    </div>
  );
}
