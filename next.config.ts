import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
