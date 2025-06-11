import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jantech.ir",
      }
    ]
  }
};

export default nextConfig;
