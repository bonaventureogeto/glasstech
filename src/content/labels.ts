import type { MediaCategory, MediaItem, MediaSector } from "@/content/media";

export const categoryLabels: Record<MediaCategory, string> = {
  facade: "Facades",
  "balcony-railing": "Balconies and railings",
  "windows-glazing": "Windows and glazing",
  "office-partition": "Office partitions",
  "shower-cubicle": "Shower cubicles",
  interior: "Interior fit-out",
  automotive: "Automotive glass",
  workshop: "Workshop and yard",
  team: "Our team",
};

// Order of the groups on /work
export const categoryOrder: MediaCategory[] = [
  "facade",
  "balcony-railing",
  "windows-glazing",
  "office-partition",
  "shower-cubicle",
  "interior",
  "automotive",
  "workshop",
  "team",
];

export const sectorLabels: Record<MediaSector, string> = {
  residential: "Residential",
  commercial: "Commercial",
  automotive: "Automotive",
};

export type WorkFilter = "all" | MediaSector;

export const filters: { value: WorkFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "automotive", label: "Automotive" },
];

export function eyebrowFor(item: MediaItem) {
  const category = categoryLabels[item.category];
  return item.sector ? `${sectorLabels[item.sector]} · ${category}` : category;
}
