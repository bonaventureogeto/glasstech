import type { NextConfig } from "next";

// The canonical host. Redirects use statusCode 301: `permanent: true` would
// send a 308.
const WWW = "https://www.glasstech.co.ke";

// The previous site (glasstechandinteriors.com, with and without www) and
// where each of its pages lives now. Anything else keeps its path. These only
// take effect once that domain points at this project; until then it is a
// separate site behind Cloudflare.
const OLD_HOST = "(www\\.)?glasstechandinteriors\\.com";
const oldPages: [source: string, destination: string][] = [
  ["/about-us", "/#about"],
  ["/products-services", "/#services"],
  ["/glass-shower-cubicles-in-kenya", "/#services"],
  ["/office-partitioning-services-in-kenya", "/#services"],
  ["/building-glass-suppliers-in-kenya", "/#services"],
  ["/portfolio", "/work"],
  ["/project/:slug*", "/work"],
  ["/contact-us", "/#contact"],
  ["/shop", "/"],
  ["/cart", "/"],
];

const nextConfig: NextConfig = {
  // Next's own trailing-slash redirect is a 308 and runs before the rules
  // below, which would add a 308 hop to every old-site URL (they end in "/").
  // It is off; the last rule below does the same job with a 301.
  skipTrailingSlashRedirect: true,

  images: {
    // Only optimise the site's own media and the hosts below; everything else is rejected.
    localPatterns: [{ pathname: "/media/**", search: "" }],
    remotePatterns: [
      // YouTube thumbnails for the video testimonials
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**", search: "" },
      // Google reviewers' profile photos (optional authorPhoto in src/content/reviews.json)
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**", search: "" },
    ],
  },

  async redirects() {
    return [
      // The bare domain. Vercel's domain settings redirect it to www today (with
      // a 308); this keeps it a 301 to the same path if that setting goes.
      {
        source: "/:path*",
        has: [{ type: "host", value: "glasstech\\.co\\.ke" }],
        destination: `${WWW}/:path*`,
        statusCode: 301,
      },
      ...oldPages.map(([source, destination]) => ({
        // With or without the old site's trailing slash
        source: `${source}{/}?`,
        has: [{ type: "host" as const, value: OLD_HOST }],
        destination: `${WWW}${destination}`,
        statusCode: 301 as const,
      })),
      {
        source: "/:path*",
        has: [{ type: "host", value: OLD_HOST }],
        destination: `${WWW}/:path*`,
        statusCode: 301,
      },
      // A trailing slash on this site: one 301 to the path without it
      {
        source: "/:path+/",
        destination: "/:path+",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
