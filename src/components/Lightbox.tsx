"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import type { MediaItem } from "@/content/media";
import { eyebrowFor } from "@/content/labels";

// Full-screen viewer on a native modal <dialog>: focus is trapped, Esc closes
// and focus returns to the tile that opened it. Arrow keys step through `items`.
export default function Lightbox({
  items,
  index,
  onChange,
}: {
  items: MediaItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const item = index === null ? null : items[index];
  const count = items.length;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) {
      d.showModal();
      // Start on Close rather than the video, so the arrow keys page through items.
      closeButton.current?.focus();
    }
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (delta: number) => index !== null && onChange((index + delta + count) % count);

  return (
    <dialog
      ref={dialog}
      aria-label={item ? item.title : "Project viewer"}
      onClose={() => onChange(null)}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      onKeyDown={(e) => {
        if (e.target instanceof HTMLVideoElement) return; // arrows seek the video
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="lightbox on-dark fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
    >
      {item && (
        <div
          className="flex h-full flex-col items-center justify-center gap-4 px-4 pt-16 pb-6 md:px-20"
          onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        >
          <figure className="flex max-h-full min-h-0 flex-col items-center gap-4">
            {item.type === "video" ? (
              <video
                key={item.id}
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                muted
                loop
                playsInline
                aria-label={item.alt}
                className="max-h-[74dvh] w-auto max-w-full rounded-card bg-navy-deep"
              />
            ) : (
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 80vw, 92vw"
                className="h-auto max-h-[74dvh] w-auto max-w-full rounded-card object-contain"
              />
            )}
            <figcaption className="flex max-w-[640px] flex-col items-center gap-1 text-center">
              <span className="eyebrow text-[11px] text-sky">{eyebrowFor(item)}</span>
              <span className="font-display text-lg font-semibold">{item.title}</span>
              <span className="text-sm text-mist">{item.alt}</span>
              {count > 1 && (
                <span className="text-xs text-mist-muted">
                  {index! + 1} of {count}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}

      <button
        ref={closeButton}
        type="button"
        onClick={() => dialog.current?.close()}
        aria-label="Close viewer"
        className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
      >
        <CloseIcon size={22} />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous project"
            className="absolute top-3 left-3 inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 md:top-1/2 md:size-12 md:-translate-y-1/2"
          >
            <ChevronLeftIcon size={24} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next project"
            className="absolute top-3 left-16 inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 md:top-1/2 md:right-3 md:left-auto md:size-12 md:-translate-y-1/2"
          >
            <ChevronRightIcon size={24} />
          </button>
        </>
      )}
    </dialog>
  );
}
