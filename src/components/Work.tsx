import Link from "next/link";
import WorkBento from "@/components/WorkBento";
import { bentoPicks, media, type MediaItem } from "@/content/media";
import type { WorkFilter } from "@/content/labels";

const pick = (ids: string[]) =>
  ids.map((id) => media.find((m) => m.id === id)).filter((m): m is MediaItem => Boolean(m));

export default function Work() {
  // Only the tiles shown on the homepage are sent to the browser.
  const sets: Record<WorkFilter, MediaItem[]> = {
    all: pick(bentoPicks.all),
    residential: pick(bentoPicks.residential),
    commercial: pick(bentoPicks.commercial),
    automotive: media.filter((m) => m.sector === "automotive").slice(0, 5),
  };

  return (
    <section id="work" aria-labelledby="work-title" className="bg-white">
      <div className="shell flex flex-col gap-6 py-16 md:gap-12 md:py-24">
        <WorkBento
          sets={sets}
          heading={
            <div className="reveal flex max-w-[640px] flex-col gap-3 md:gap-4">
              <p className="eyebrow text-[11px] text-navy md:text-xs">Selected projects</p>
              <h2 id="work-title" className="text-h2 font-bold">
                Work you can walk up to.
              </h2>
              <p className="text-[15px] text-muted md:text-[17px] md:leading-[1.65]">
                From office partitions to full residential glazing. Every project measured, cut and fitted by our own
                team.
              </p>
            </div>
          }
        />
        <div className="flex justify-center">
          <Link href="/work" className="btn btn-outline px-[22px]">
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
