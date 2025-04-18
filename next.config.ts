import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'wookie.codesubmit.io',
      }
    ]
  }
};

export default nextConfig;
