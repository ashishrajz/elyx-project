import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Prevents static export (required for Clerk & dynamic routes)
  output: "standalone",
};

export default nextConfig;

