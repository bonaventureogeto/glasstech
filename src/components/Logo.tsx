import Image from "next/image";

// Mark plus the GLASSTECH / AND INTERIOR SOLUTIONS lockup used in the header.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 md:gap-3">
      <Image
        src="/brand/logo-mark.svg"
        alt="Glasstech logo"
        width={40}
        height={40}
        className={compact ? "size-[34px]" : "size-[34px] md:size-10"}
      />
      <span className="flex flex-col leading-[1.05] whitespace-nowrap">
        <span
          className={`font-display font-extrabold tracking-[0.02em] text-navy ${
            compact ? "text-base" : "text-base md:text-lg"
          }`}
        >
          GLASSTECH
        </span>{" "}
        <span
          className={`font-bold uppercase tracking-[0.1em] text-red ${
            compact ? "text-[9px]" : "text-[9px] md:text-[10px]"
          }`}
        >
          and interior solutions
        </span>
      </span>
    </span>
  );
}
