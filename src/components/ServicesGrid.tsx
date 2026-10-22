import type { ComponentType } from "react";
import {
  BuildingIcon,
  CarIcon,
  ChevronRightIcon,
  PartitionIcon,
  RailingIcon,
  ShowerIcon,
  WrenchIcon,
} from "@/components/icons";
import { whatsappLink } from "@/content/site";

const services: { title: string; body: string; spec: string; Icon: ComponentType<{ size?: number }> }[] = [
  {
    title: "Glass shower cubicles",
    body: "Frameless and semi-frameless enclosures cut to your bathroom, with polished edges and quality hardware.",
    spec: "8 to 10mm · Toughened · Frameless",
    Icon: ShowerIcon,
  },
  {
    title: "Office partitioning",
    body: "Single and double-glazed partitions that open up floor plans while keeping noise where it belongs.",
    spec: "Acoustic · Framed or butt-joint",
    Icon: PartitionIcon,
  },
  {
    title: "Building glass supply",
    body: "Float, toughened, laminated and low-iron glass supplied by the sheet to contractors and fabricators.",
    spec: "Wholesale · Cut to size",
    Icon: BuildingIcon,
  },
  {
    title: "Balconies and railings",
    body: "Structural glass balustrades and Juliet balconies engineered to hold, finished to look effortless.",
    spec: "Laminated · Spigot or channel",
    Icon: RailingIcon,
  },
  {
    title: "Automotive glass",
    body: "Windshield replacement, chip repair and side glass for private vehicles, fleets and insurance claims.",
    spec: "OEM-grade · Same-day",
    Icon: CarIcon,
  },
  {
    title: "Repair and maintenance",
    body: "Re-sealing, re-glazing, hardware swaps and breakage call-outs for the glass you already have.",
    spec: "Call-out · Warranty work",
    Icon: WrenchIcon,
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line bg-frost">
      <div className="shell flex flex-col gap-6 py-16 md:gap-12 md:py-24">
        <div className="reveal flex flex-col gap-5 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-8">
          <div className="flex max-w-[640px] flex-col gap-3 md:gap-4">
            <p className="eyebrow text-[11px] text-navy md:text-xs">What we make and fit</p>
            <h2 id="services-title" className="text-h2 font-bold">
              Products and services
            </h2>
            <p className="text-[15px] text-muted md:text-[17px] md:leading-[1.65]">
              Every job starts with a real measurement and ends with a clean, safe install. No guesswork, no leftover
              mess.
            </p>
          </div>
          <a
            href={whatsappLink("Hi Glasstech, I'm not sure which glass I need. Can you advise?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline self-start md:self-auto"
          >
            Not sure what you need? Ask us
          </a>
        </div>

        <ul className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {services.map(({ title, body, spec, Icon }, i) => (
            <li key={title} className="reveal">
              <a
                href="#contact"
                className="group flex h-full items-center gap-3.5 rounded-[14px] border border-line bg-white p-[18px] text-ink transition-colors hover:border-navy md:min-h-[280px] md:flex-col md:items-stretch md:justify-between md:gap-14 md:rounded-card md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-tile text-navy">
                    <Icon size={22} />
                  </span>
                  <span className="hidden text-xs font-semibold tracking-[0.1em] text-muted md:block" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-0.5 md:flex-none md:gap-2.5">
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] md:text-[22px]">{title}</h3>
                  <p className="hidden text-[15px] text-muted md:block">{body}</p>
                  <p className="text-xs text-muted md:text-[11px] md:font-semibold md:tracking-[0.1em] md:text-navy md:uppercase">
                    {spec}
                  </p>
                </div>
                <ChevronRightIcon size={18} className="shrink-0 text-mist-muted md:hidden" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
