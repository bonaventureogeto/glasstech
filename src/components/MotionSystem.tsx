"use client";

import { useEffect } from "react";

// Fades and lifts `.reveal` elements (400ms, 12px; see globals.css) as they
// scroll into view. With reduced motion the CSS shows them immediately.
export default function MotionSystem() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal:not(.in)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
