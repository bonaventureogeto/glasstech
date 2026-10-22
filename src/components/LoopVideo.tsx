"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import type { MediaLoop } from "@/content/media";

// The video plays when the visitor has not asked for reduced motion and is not
// on Save-Data, and only on wider screens unless the loop opts in to phones.
// Everyone else gets the poster.
const WIDE = "(min-width: 768px)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type Connection = { saveData?: boolean; addEventListener?: (t: string, cb: () => void) => void; removeEventListener?: (t: string, cb: () => void) => void };
const connection = () => (navigator as Navigator & { connection?: Connection }).connection;

function subscribe(onChange: () => void) {
  const lists = [WIDE, MOTION_OK].map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  connection()?.addEventListener?.("change", onChange);
  return () => {
    lists.forEach((l) => l.removeEventListener("change", onChange));
    connection()?.removeEventListener?.("change", onChange);
  };
}

const matches = (q: string) => window.matchMedia(q).matches;
const canPlay = (onPhones: boolean) =>
  (onPhones || matches(WIDE)) && matches(MOTION_OK) && connection()?.saveData !== true;

export default function LoopVideo({
  loop,
  sizes,
  priority = false,
  playOnPhones = false,
  className = "",
}: {
  loop: MediaLoop;
  sizes: string;
  /** Above the fold: load the poster eagerly at high priority (it is the LCP image). */
  priority?: boolean;
  /** Play below 768px too, instead of giving phones the poster. */
  playOnPhones?: boolean;
  className?: string;
}) {
  const play = useSyncExternalStore(subscribe, () => canPlay(playOnPhones), () => false);

  // `className` must position the box (relative or absolute) and give it a size.
  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        src={loop.poster}
        alt={loop.alt}
        fill
        sizes={sizes}
        preload={priority}
        className="object-cover"
      />
      {play && (
        <video
          className="absolute inset-0 size-full object-cover"
          src={loop.src}
          poster={loop.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
