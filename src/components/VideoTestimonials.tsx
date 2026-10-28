"use client";

import { useState } from "react";
import VideoTestimonial from "@/components/VideoTestimonial";
import type { Testimonial } from "@/content/testimonials";

// The row of video cards: a snap scroller on phones (240px cards), 280px cards
// from tablet up. One player at a time: starting a video unloads the last one.
export default function VideoTestimonials({ items, className = "" }: { items: Testimonial[]; className?: string }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul
      aria-label="Client video testimonials"
      className={`-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0 ${className}`}
    >
      {items.map((t) => (
        <li key={t.id} className="w-60 flex-none snap-start md:w-70">
          <VideoTestimonial testimonial={t} playing={playing === t.id} onPlay={() => setPlaying(t.id)} />
        </li>
      ))}
    </ul>
  );
}
