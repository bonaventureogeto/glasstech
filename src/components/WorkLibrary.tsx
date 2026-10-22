"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import { PlayIcon } from "@/components/icons";
import type { MediaItem } from "@/content/media";
import { categoryLabels, categoryOrder, eyebrowFor, filters, sectorLabels, type WorkFilter } from "@/content/labels";
import { whatsappLink } from "@/content/site";

// Portrait tiles: the 800px variant is enough. Landscape media is cropped to a
// portrait tile, so it needs the full-size still to stay sharp on 2x screens.
const tileSrc = (m: MediaItem) => (m.height >= m.width ? m.thumb : (m.poster ?? m.src));

export default function WorkLibrary({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<WorkFilter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const groups = useMemo(() => {
    const visible = filter === "all" ? items : items.filter((m) => m.sector === filter);
    return categoryOrder
      .map((category) => ({ category, items: visible.filter((m) => m.category === category) }))
      .filter((g) => g.items.length > 0);
  }, [items, filter]);

  // The lightbox steps through everything currently shown, in page order.
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
        <p className="text-sm text-muted" aria-live="polite">
          {flat.length} {flat.length === 1 ? "item" : "items"}
          {filter !== "all" && ` in ${sectorLabels[filter].toLowerCase()}`}
        </p>
      </div>

      {groups.length === 0 && (
        <div className="mull-light flex min-h-[260px] flex-col items-start justify-end gap-4 rounded-card border border-line p-6 md:p-8">
          <p className="max-w-[460px] text-[17px]">
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
      )}

      {groups.map((g) => (
        <section key={g.category} aria-labelledby={`group-${g.category}`} className="flex flex-col gap-5">
          <h2 id={`group-${g.category}`} className="flex items-baseline gap-3 text-2xl font-bold tracking-[-0.01em] md:text-[32px]">
            {categoryLabels[g.category]}
            <span className="font-sans text-sm font-medium text-muted">{g.items.length}</span>
          </h2>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {g.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpen(flat.indexOf(item))}
                  aria-haspopup="dialog"
                  className="group flex w-full flex-col gap-2.5 text-left"
                >
                  <span className="relative block aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-[#e8eff5]">
                    <Image
                      src={tileSrc(item)}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 46vw"
                      className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                    {item.type === "video" && (
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-navy">
                        <PlayIcon size={10} />
                        {item.duration ? `0:${String(Math.round(item.duration)).padStart(2, "0")}` : "Video"}
                      </span>
                    )}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="eyebrow text-[10px] tracking-[0.1em] text-navy">{eyebrowFor(item)}</span>
                    <span className="font-display text-[15px] leading-snug font-semibold text-ink md:text-base">{item.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <Lightbox items={flat} index={open} onChange={setOpen} />
    </>
  );
}
