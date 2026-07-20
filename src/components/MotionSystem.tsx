"use client";

import { useEffect } from "react";

export default function MotionSystem() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFine = window.matchMedia("(pointer: fine)").matches;

    /* ── 1. Page load orchestration ─────────────────── */
    const loadTimer = setTimeout(() => {
      document.body.classList.add("is-loaded");
    }, 600);

    /* ── 2. Lenis smooth scroll ─────────────────────── */
    let lenisInstance: InstanceType<typeof import("lenis").default> | null = null;
    let rafId: number;

    if (!prefersReduced) {
      import("lenis").then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });

        // Expose for nav
        (window as unknown as Record<string, unknown>).lenis = lenisInstance;

        // Intercept anchor clicks
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          a.addEventListener("click", (e) => {
            const href = (a as HTMLAnchorElement).getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (target && lenisInstance) {
              e.preventDefault();
              lenisInstance.scrollTo(target as HTMLElement);
            }
          });
        });

        function raf(time: number) {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      });
    }

    /* ── 3. Scroll reveals ──────────────────────────── */
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });

    /* ── 4. Count-ups ───────────────────────────────── */
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.countTarget || "0", 10);
          const suffix = el.dataset.countSuffix || "";
          countObserver.unobserve(el);

          if (prefersReduced) {
            el.innerHTML = `${target}<span class="text-[var(--edge)]">${suffix}</span>`;
            return;
          }

          const duration = 1400;
          const start = performance.now();

          function animate(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.innerHTML = `${current}<span class="text-[var(--edge)]">${suffix}</span>`;
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.6 }
    );

    document.querySelectorAll("[data-count-target]").forEach((el) => {
      countObserver.observe(el);
    });

    /* ── 5. Parallax ────────────────────────────────── */
    let parallaxRafId: number;

    if (!prefersReduced && isFine) {
      const parElements = document.querySelectorAll("[data-par]");

      function onParallaxScroll() {
        const vh = window.innerHeight;
        const scrollY = window.scrollY;

        parElements.forEach((el) => {
          const rect = (el as HTMLElement).getBoundingClientRect();
          // Skip if too far out of viewport
          if (rect.bottom < -200 || rect.top > vh + 200) return;

          const factor = parseFloat(
            (el as HTMLElement).dataset.par || "0"
          );
          const center = rect.top + rect.height / 2;
          const offset = (center - vh / 2) * factor;

          // Get existing transform and only append translateY
          const existing = (el as HTMLElement).style.transform;
          const base = existing.replace(/translateY\([^)]*\)/g, "").trim();
          (el as HTMLElement).style.transform = `${base} translateY(${offset}px)`.trim();
        });

        parallaxRafId = requestAnimationFrame(onParallaxScroll);
      }
      parallaxRafId = requestAnimationFrame(onParallaxScroll);
    }

    /* ── 6. Magnetic buttons ────────────────────────── */
    const magneticCleanups: (() => void)[] = [];

    if (isFine && !prefersReduced) {
      document.querySelectorAll(".magnetic").forEach((el) => {
        const htmlEl = el as HTMLElement;

        const onMove = (e: MouseEvent) => {
          const rect = htmlEl.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          htmlEl.style.transform = `translate(${x}px, ${y}px)`;
        };

        const onLeave = () => {
          htmlEl.style.transform = "";
        };

        htmlEl.addEventListener("mousemove", onMove);
        htmlEl.addEventListener("mouseleave", onLeave);
        magneticCleanups.push(() => {
          htmlEl.removeEventListener("mousemove", onMove);
          htmlEl.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    /* ── Cleanup ────────────────────────────────────── */
    return () => {
      clearTimeout(loadTimer);
      if (lenisInstance) {
        lenisInstance.destroy();
        cancelAnimationFrame(rafId);
      }
      revealObserver.disconnect();
      countObserver.disconnect();
      if (parallaxRafId) cancelAnimationFrame(parallaxRafId);
      magneticCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
