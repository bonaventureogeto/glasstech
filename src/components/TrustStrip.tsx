const clients = [
  "Insurance claims",
  "Fleet operators",
  "Contractors and developers",
  "Homeowners",
  "Hospitality and offices",
];

export default function TrustStrip() {
  return (
    <section aria-label="Who we work for" className="border-t border-white/8 bg-navy-deep text-white">
      <div className="shell flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="eyebrow shrink-0 whitespace-nowrap text-sky">Trusted for</p>
        <ul className="flex flex-wrap gap-x-9 gap-y-2.5 text-sm font-medium text-mist">
          {clients.map((c) => (
            <li key={c} className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
