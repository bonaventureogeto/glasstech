import Image from "next/image";
import { media, pillarMedia } from "@/content/media";
import { whatsappLink } from "@/content/site";

const pillars = [
  {
    kicker: "01 · Automotive glass",
    title: "Back on the road, same day",
    body: "Windshield replacement, chip and crack repair, side and rear glass. Private cars, fleets and insurance jobs.",
    chips: ["Windshields", "Chip repair", "Side and rear", "Fleet and insurance"],
    cta: "Book a fitting",
    message: "Hi Glasstech, I'd like to book an auto glass fitting.",
    mediaId: pillarMedia.automotive,
  },
  {
    kicker: "02 · Architectural and interior",
    title: "From shower screens to facades",
    body: "Toughened and laminated glass supplied, fabricated and installed for homes, offices and developments across Kenya.",
    chips: ["Shower cubicles", "Partitions", "Facades", "Balconies"],
    cta: "Start a project",
    message: "Hi Glasstech, I'd like to start an architectural glass project.",
    mediaId: pillarMedia.architectural,
  },
];

export default function TwoPillars() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white">
      <div className="shell flex flex-col gap-7 py-16 md:gap-12 md:pt-28 md:pb-24">
        <div className="reveal grid gap-3 md:grid-cols-12 md:items-end md:gap-8">
          <div className="flex flex-col gap-3 md:col-span-7 md:gap-4">
            <p className="eyebrow text-[11px] text-navy md:text-xs">Two trades, one workshop</p>
            <h2 id="about-title" className="text-h2 font-bold">
              Whatever needs glass, <span className="text-red">we cut it.</span>
            </h2>
          </div>
          <p className="text-[15px] text-muted md:col-span-5 md:text-[17px] md:leading-[1.65]">
            We run vehicle glass and architectural glass off the same fabrication floor, so the same standard of
            measuring, cutting and fitting shows up on a saloon car and a six-storey facade.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {pillars.map((p) => {
            const photo = p.mediaId ? media.find((m) => m.id === p.mediaId) : undefined;
            return (
              <article
                key={p.kicker}
                className="reveal on-dark relative isolate flex min-h-[340px] flex-col justify-between gap-10 overflow-hidden rounded-card bg-navy-panel p-[22px] text-white md:min-h-[480px] md:rounded-panel md:p-8"
              >
                {/* Multiplied into the navy so bright sky and walls never sit behind the text */}
                {photo && (
                  <Image
                    src={photo.poster ?? photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-55 mix-blend-multiply"
                  />
                )}
                <div className="mull-grid absolute inset-0" aria-hidden="true" />
                <p className="eyebrow relative text-[11px] text-sky md:text-xs">{p.kicker}</p>
                <div className="relative flex flex-col gap-3 md:gap-3.5">
                  <h3 className="text-[26px] leading-[1.1] font-semibold tracking-[-0.01em] md:text-[32px]">{p.title}</h3>
                  <p className="max-w-[460px] text-[15px] leading-[1.55] text-mist md:text-base md:leading-[1.6]">{p.body}</p>
                  <ul className="hidden flex-wrap gap-2 md:flex" aria-label="Includes">
                    {p.chips.map((c) => (
                      <li key={c} className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(p.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-red mt-1 self-start md:mt-2"
                  >
                    {p.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
