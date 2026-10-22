// Real client quotes only, in the client's own words. The "What clients say"
// section stays hidden while this list is empty.
//
// Hackhouse Africa's quote goes here once it is supplied, for example:
//   { quote: "…", client: "Hackhouse Africa", name: "…", role: "…" },

export interface Testimonial {
  quote: string;
  /** The organisation, e.g. "Hackhouse Africa" */
  client: string;
  /** The person quoted, if they are happy to be named */
  name?: string;
  role?: string;
}

export const testimonials: Testimonial[] = [];
