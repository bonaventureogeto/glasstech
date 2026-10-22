import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only optimise the site's own media; everything else is rejected.
    localPatterns: [{ pathname: "/media/**", search: "" }],
  },
};

export default nextConfig;
