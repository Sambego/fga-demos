import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    FGA_BRAND: process.env.FGA_BRAND,
  },
};

export default nextConfig;
