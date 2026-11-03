"use client";

import { useState, type ReactNode } from "react";
import FeatureVideo from "@/components/FeatureVideo";
import VideoTestimonial from "@/components/VideoTestimonial";
import type { MediaItem } from "@/content/media";
import type { Testimonial } from "@/content/testimonials";

// The feature video first, across the full width, then the client Shorts: a
// snap scroller on phones (240px cards), 280px cards from tablet up, with
// `aside` (the YouTube link) beside them from 1024px. One video plays at a
// time: starting any of them pauses the feature or unloads the last Short.
export default function VideoTestimonials({
  feature,
  items,
  aside,
}: {
  feature?: MediaItem;
  items: Testimonial[];
  aside?: ReactNode;
}) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {feature && (
        <FeatureVideo
          video={feature}
          label="As featured"
          playing={playing === feature.id}
          onPlay={() => setPlaying(feature.id)}
          className="reveal"
        />
      )}
      {items.length > 0 && (
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-x-16">
          <ul
            aria-label="Client video testimonials"
            className="reveal -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0 lg:col-start-2 lg:row-start-1"
          >
            {items.map((t) => (
              <li key={t.id} className="w-60 flex-none snap-start md:w-70">
                <VideoTestimonial testimonial={t} playing={playing === t.id} onPlay={() => setPlaying(t.id)} />
              </li>
            ))}
          </ul>
          {aside && <div className="lg:col-start-1 lg:row-start-1">{aside}</div>}
        </div>
      )}
    </div>
  );
}
