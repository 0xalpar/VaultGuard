
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  cacheComponents: false,

  partialPrefetching: false,

  turbopack: {
    root: path.resolve(__dirname),
  },

  experimental: {
    agentFeedback: false,
  },
};

export default nextConfig;
