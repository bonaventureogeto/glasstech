"use client";

import { useEffect, useId, useRef, useState } from "react";

// Review text clamped to six lines, with a toggle that expands it in place.
// The toggle only shows when the text is actually cut off at the current width.
export default function ReviewText({ text }: { text: string }) {
  const id = useId();
  const body = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = body.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setClamped(el.scrollHeight > el.clientHeight + 1));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-start gap-1">
      <blockquote>
        <p
          id={id}
          ref={body}
          className={`text-[15px] leading-[1.6] whitespace-pre-line text-ink ${expanded ? "" : "line-clamp-6"}`}
        >
          {text}
        </p>
      </blockquote>
      {(clamped || expanded) && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
          className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-navy underline underline-offset-4 hover:text-red"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
