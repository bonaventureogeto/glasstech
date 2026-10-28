"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PlayIcon } from "@/components/icons";
import type { Testimonial } from "@/content/testimonials";

// A 9:16 card for one YouTube Short. Until it is played it is a thumbnail and a
// button; the YouTube player only loads on click, in place, and autoplays.
export default function VideoTestimonial({
  testimonial: { youtubeId, title, client, service },
  playing,
  onPlay,
}: {
  testimonial: Testimonial;
  playing: boolean;
  onPlay: () => void;
}) {
  const player = useRef<HTMLIFrameElement>(null);
  const label = client || service || title;

  // The play button is gone once the player is in, so hand focus to the player.
  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);

  return (
    <figure className="flex flex-col overflow-hidden rounded-card border border-line bg-frost">
      <div className="relative aspect-[9/16] bg-navy-deep">
        {playing ? (
          <iframe
            ref={player}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
            title={`YouTube video: ${title}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            <Image
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              // The thumbnail is 4:3 with the Short in its middle; cropped to 9:16
              // it renders about 2.4 times the card's width.
              sizes="(min-width: 768px) 664px, 569px"
              className="object-cover"
            />
            <span className="relative flex size-14 items-center justify-center rounded-full bg-red text-white shadow-[0_8px_24px_rgb(0_0_0/0.35)] transition-colors group-hover:bg-red-hover md:size-16">
              <PlayIcon size={26} />
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex flex-col gap-0.5 px-4 py-3.5">
        <span className="text-[15px] leading-snug font-semibold text-ink">{label}</span>
        {client && service && <span className="text-[13px] text-muted">{service}</span>}
      </figcaption>
    </figure>
  );
}
