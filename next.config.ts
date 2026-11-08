import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  // pages are regenerated at runtime, so the markdown has to be deployed too
  outputFileTracingIncludes: {
    '/**/*': ['./content/**/*'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/dogefromage/**' },
    ],
  },
};

export default nextConfig;
