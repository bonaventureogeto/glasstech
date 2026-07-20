"use client";

import { useState, useMemo } from "react";

const services = [
  "Automotive glass",
  "Glass shower cubicle",
  "Office partitioning",
  "Building glass supply",
  "Balconies & railings",
  "Mirrors & splashbacks",
];

const glassTypes = [
  "Toughened",
  "Laminated",
  "Low-iron",
  "Float \u00b7 clear",
  "Mirror",
  "Not sure yet",
];

const locations = [
  "Nairobi",
  "Kiambu",
  "Machakos",
  "Nakuru",
  "Mombasa",
  "Elsewhere in Kenya",
];

const ServiceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--edge-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
  </svg>
);
const GlassIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--edge-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16v16H4z" /><path d="M4 4l16 16" />
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--edge-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Configurator() {
  const [service, setService] = useState(services[0]);
  const [glass, setGlass] = useState(glassTypes[0]);
  const [location, setLocation] = useState(locations[0]);

  const waLink = useMemo(() => {
    const text = `Hi Glasstech, I'd like a quote.\nService: ${service}\nGlass type: ${glass}\nLocation: ${location}`;
    return `https://wa.me/254714498682?text=${encodeURIComponent(text)}`;
  }, [service, glass, location]);

  const selectClass =
    "appearance-none bg-transparent border-0 text-[var(--ink)] text-[14px] w-full cursor-pointer pr-6 focus:outline-none font-medium";

  return (
    <div className="configurator-wrap load-fade" style={{ transitionDelay: "800ms" }}>
      <div
        className="rounded-[20px] p-1.5"
        style={{
          background: "rgba(251,253,252,.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 12px 48px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.06)",
        }}
      >
        <div className="grid grid-cols-2 min-[880px]:grid-cols-[1fr_1fr_1fr_56px] gap-0">
          <Cell icon={<ServiceIcon />} label="Service" className="col-span-2 min-[880px]:col-span-1">
            <select value={service} onChange={(e) => setService(e.target.value)} className={selectClass} aria-label="Select service">
              {services.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Cell>
          <Cell icon={<GlassIcon />} label="Glass type" divider>
            <select value={glass} onChange={(e) => setGlass(e.target.value)} className={selectClass} aria-label="Select glass type">
              {glassTypes.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Cell>
          <Cell icon={<PinIcon />} label="Location" divider>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass} aria-label="Select location">
              {locations.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Cell>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic col-span-2 min-[880px]:col-span-1 min-[880px]:w-[56px] h-[52px] min-[880px]:h-auto rounded-2xl flex items-center justify-center text-white transition-colors hover:bg-[var(--ink-2)]"
            style={{ background: "var(--ink)" }}
            aria-label="Get quote on WhatsApp"
          >
            <SearchIcon />
          </a>
        </div>
      </div>

      <style jsx>{`
        .configurator-wrap {
          position: relative;
          z-index: 20;
          padding: 0 var(--pad);
          margin: -34px auto 0;
          max-width: calc(var(--maxw) + var(--pad) * 2);
        }
        @media (min-width: 880px) {
          .configurator-wrap {
            position: relative;
            margin-top: -50px;
          }
        }
      `}</style>
    </div>
  );
}

function Cell({
  icon,
  label,
  children,
  divider,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  divider?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`px-4 py-3 min-[880px]:py-4 relative ${className || ""}`}
      style={divider ? { boxShadow: "inset 1px 0 0 var(--line)" } : undefined}
    >
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="font-mono text-[10px] tracking-[.06em] uppercase text-[var(--muted)]">{label}</span>
      </div>
      <div className="relative">
        {children}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted-2)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
