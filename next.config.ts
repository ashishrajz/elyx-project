import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Ensure auth pages are NOT prerendered/exported
  output: "standalone", // ⬅️ prevents accidental `next export`
  experimental: {
    serverActions: true, // if you’re using server actions
  },
};

export default nextConfig;

