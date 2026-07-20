"use client";

import { useEffect, useState, useCallback } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setOpen(false);
      const el = document.querySelector(href);
      if (el) {
        // Use Lenis if available
        const lenis = (window as unknown as { lenis?: { scrollTo: (el: Element) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(el);
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <nav
      className="fixed top-4 left-1/2 z-[100] w-[calc(100%-32px)] max-w-[1120px] -translate-x-1/2 load-fade"
      style={{ transitionDelay: "0ms" }}
    >
      <div
        className={`flex items-center justify-between gap-4 rounded-full px-5 py-2.5 transition-all duration-500 ${
          solid
            ? "bg-[rgba(6,15,13,.82)] shadow-[0_8px_32px_rgba(0,0,0,.35)]"
            : "bg-[rgba(10,22,20,.55)] shadow-[0_8px_32px_rgba(0,0,0,.18)]"
        }`}
        style={{
          backdropFilter: "blur(16px) saturate(1.3)",
          WebkitBackdropFilter: "blur(16px) saturate(1.3)",
          border: "1px solid rgba(255,255,255,.14)",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline shrink-0" aria-label="Glasstech home">
          <div className="relative w-[30px] h-[30px] rounded-lg overflow-hidden" style={{ background: "linear-gradient(135deg, var(--edge), var(--edge-deep))" }}>
            {/* Sheen sweep */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,.45) 50%, transparent 70%)",
                animation: "sheen 5.5s ease-in-out infinite",
              }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white text-[15px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
              Glasstech
            </span>
            <span className="font-mono text-[9px] tracking-[.08em] uppercase text-[var(--muted-2)]">
              Interior Solutions Ltd
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden min-[920px]:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="px-3 py-1.5 text-[13.5px] text-[var(--frost)] opacity-75 hover:opacity-100 transition-opacity rounded-full no-underline"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="ml-2 flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium no-underline transition-colors bg-[var(--frost)] text-[var(--ink)] hover:bg-white"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--edge)]" />
            Get a quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="min-[920px]:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className="absolute w-5 h-[1.5px] bg-white transition-all duration-300"
            style={{
              transform: open ? "rotate(45deg)" : "translateY(-4px)",
            }}
          />
          <span
            className="absolute w-5 h-[1.5px] bg-white transition-all duration-300"
            style={{
              transform: open ? "rotate(-45deg)" : "translateY(4px)",
              opacity: open ? 1 : 1,
            }}
          />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 top-0 z-[-1] min-[920px]:hidden transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(6,15,13,.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transitionTimingFunction: "var(--e-out)",
        }}
      >
        <div className="flex flex-col items-start justify-center h-full px-8 gap-2">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="text-[clamp(28px,6vw,42px)] font-display text-white no-underline py-2 opacity-80 hover:opacity-100 transition-opacity"
              style={{
                fontFamily: "var(--font-bricolage)",
                letterSpacing: "-.02em",
                transitionDelay: open ? `${i * 50 + 100}ms` : "0ms",
                transform: open ? "translateX(0)" : "translateX(40px)",
                opacity: open ? 0.8 : 0,
                transition: "transform .5s var(--e-out), opacity .5s var(--e-out)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium no-underline bg-[var(--frost)] text-[var(--ink)]"
            style={{
              transitionDelay: open ? "350ms" : "0ms",
              transform: open ? "translateX(0)" : "translateX(40px)",
              opacity: open ? 1 : 0,
              transition: "transform .5s var(--e-out), opacity .5s var(--e-out)",
            }}
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--edge)]" />
            Get a quote
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes sheen {
          0%, 100% { transform: translateX(-120%); }
          50% { transform: translateX(120%); }
        }
      `}</style>
    </nav>
  );
}
