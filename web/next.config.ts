import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'educandoseubolso.blog.br' }],
  },
  devIndicators: false
};

export default nextConfig;
