"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import { PlayIcon } from "@/components/icons";
import type { MediaItem } from "@/content/media";
import { eyebrowFor, filters, type WorkFilter } from "@/content/labels";
import { whatsappLink } from "@/content/site";

// Desktop bento: one wide and one medium tile, then three equal tiles.
const spans = [
  "md:col-span-7 md:min-h-[400px] lg:min-h-[460px]",
  "md:col-span-5 md:min-h-[400px] lg:min-h-[460px]",
  "md:col-span-4 md:min-h-[340px] lg:min-h-[380px]",
  "md:col-span-4 md:min-h-[340px] lg:min-h-[380px]",
  "md:col-span-4 md:min-h-[340px] lg:min-h-[380px]",
];
const tileSizes = [
  "(min-width: 768px) 58vw, 280px",
  "(min-width: 768px) 42vw, 280px",
  "(min-width: 768px) 33vw, 280px",
  "(min-width: 768px) 33vw, 280px",
  "(min-width: 768px) 33vw, 280px",
];

export default function WorkBento({
  heading,
  sets,
}: {
  heading: ReactNode;
  sets: Record<WorkFilter, MediaItem[]>;
}) {
  const [filter, setFilter] = useState<WorkFilter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const items = sets[filter];

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-8">
        {heading}
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className="chip"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mull-light flex min-h-[260px] flex-col items-start justify-end gap-4 rounded-card border border-line p-6 md:min-h-[320px] md:p-8">
          <p className="max-w-[460px] text-[17px] text-ink">
            Automotive project photos are on their way. Windshields, chip repairs and side glass are fitted every week:
            book a fitting and see the work in person.
          </p>
          <a
            href={whatsappLink("Hi Glasstech, I'd like to book an auto glass fitting.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red"
          >
            Book a fitting
          </a>
        </div>
      ) : (
        <>
          <ul
            aria-label="Selected projects"
            className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3.5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-12 md:gap-5 md:overflow-visible md:p-0"
          >
            {items.map((item, i) => (
              <li key={item.id} className={`flex flex-[0_0_280px] snap-start md:flex-auto ${spans[i] ?? spans[4]}`}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-haspopup="dialog"
                  className="group relative flex min-h-[340px] w-full flex-col justify-end overflow-hidden rounded-card border border-line bg-[#e8eff5] p-4 text-left md:rounded-[18px] md:p-6"
                >
                  <Image
                    src={item.poster ?? item.src}
                    alt={item.alt}
                    fill
                    sizes={tileSizes[i] ?? tileSizes[4]}
                    className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  {item.type === "video" && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-navy md:top-6 md:left-6">
                      <PlayIcon size={11} />
                      Video
                    </span>
                  )}
                  <span className="relative flex flex-col gap-1 rounded-xl bg-white px-4 py-3.5 md:px-5 md:py-[18px]">
                    <span className="eyebrow text-[10px] tracking-[0.1em] text-navy md:text-[11px]">{eyebrowFor(item)}</span>
                    <span className="font-display text-[17px] font-semibold text-ink md:text-xl">{item.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="-mt-2 text-center text-xs text-muted md:hidden" aria-hidden="true">
            Swipe to explore projects
          </p>
        </>
      )}

      <Lightbox items={items} index={open} onChange={setOpen} />
    </>
  );
}
