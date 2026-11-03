"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { PlayIcon } from "@/components/icons";
import type { MediaItem } from "@/content/media";

// A headline video (Jeff Koinange's feature). Until it is played it is the
// poster and a button; pressing it mounts the native player in place and starts
// it with sound. Never autoplays. The footage is vertical, so it sits on a
// blurred copy of its own poster that fills a 4:5 frame on phones and a 16:9
// one from tablet up.
//
// `playing` and `onPlay` join it to a group where one video plays at a time
// (the client videos): when `playing` turns false it pauses, keeping its place.
// It also pauses when any other player with controls starts, such as the
// /work lightbox.
export default function FeatureVideo({
  video,
  label,
  labelAs: Label = "p",
  labelId,
  playing,
  onPlay,
  sizes = "(min-width: 1280px) 385px, (min-width: 768px) 32vw, 71vw",
  className = "",
}: {
  video: MediaItem;
  /** Eyebrow above the player */
  label: string;
  labelAs?: "p" | "h2";
  labelId?: string;
  playing?: boolean;
  onPlay?: () => void;
  /** Width of the poster as shown: the frame's height times 9/16 */
  sizes?: string;
  className?: string;
}) {
  const [started, setStarted] = useState(false);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing === false) player.current?.pause();
  }, [playing]);

  useEffect(() => {
    const pauseForOthers = (e: Event) => {
      const own = player.current;
      if (own && e.target !== own && e.target instanceof HTMLVideoElement && e.target.controls) own.pause();
    };
    // `play` does not bubble, so listen in the capture phase
    document.addEventListener("play", pauseForOthers, true);
    return () => document.removeEventListener("play", pauseForOthers, true);
  }, []);

  function start() {
    // Mount the player now, inside the click, so play() counts as the visitor's
    // own action and Safari lets it start with sound.
    flushSync(() => setStarted(true));
    const v = player.current;
    if (!v) return;
    v.focus();
    // If playback is still refused, the native controls are there to press play.
    v.play().catch(() => {});
  }

  const seconds = video.duration ? Math.round(video.duration) : 0;
  const minutes = seconds ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}` : null;

  return (
    <figure className={`flex flex-col gap-3 md:gap-4 ${className}`}>
      <Label id={labelId} className="eyebrow text-[11px] text-navy md:text-xs">
        {label}
      </Label>
      <div className="relative isolate aspect-[4/5] overflow-hidden rounded-card bg-navy-deep md:aspect-video md:rounded-panel">
        {video.blurDataURL && (
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 bg-cover bg-center opacity-70 blur-2xl"
            style={{ backgroundImage: `url("${video.blurDataURL}")` }}
          />
        )}
        {started ? (
          <video
            ref={player}
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="none"
            onPlay={onPlay}
            aria-label={video.title}
            className="absolute inset-0 size-full object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={start}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            {video.poster && (
              <Image src={video.poster} alt={video.alt} fill sizes={sizes} className="object-contain" />
            )}
            <span className="relative flex size-16 items-center justify-center rounded-full bg-red text-white shadow-[0_8px_24px_rgb(0_0_0/0.35)] transition-colors group-hover:bg-red-hover md:size-20">
              <PlayIcon size={30} />
            </span>
          </button>
        )}
      </div>
      {video.caption && (
        <figcaption className="flex items-baseline justify-between gap-4">
          <span className="font-display text-lg leading-snug font-semibold text-ink md:text-xl">{video.caption}</span>
          {minutes && <span className="text-sm text-muted">{minutes}</span>}
        </figcaption>
      )}
    </figure>
  );
}
