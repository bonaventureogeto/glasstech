// Client video testimonials: YouTube Shorts (9:16) that play in place in the
// "What clients say" section. `client` and `service` label each card; until
// they are filled in, the card shows the title instead.

export interface Testimonial {
  id: string;
  youtubeId: string;
  /** Describes the video; also the player's accessible title */
  title: string;
  /** The client, as they are happy to be named */
  client?: string;
  /** The job, e.g. "Office partitioning" */
  service?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "hackhouse",
    youtubeId: "mhPdD0nXm40",
    title: "Hackhouse x Glasstech client testimonial",
    client: "",
    service: "",
  },
  {
    id: "partitioning",
    youtubeId: "kATQIiQdLuM",
    title: "Client testimonial on modern partitioning",
    client: "",
    service: "",
  },
];
