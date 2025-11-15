import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/streaming-sdui',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
