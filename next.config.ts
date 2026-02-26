import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Optimize production build
  compress: true,
  
  // Disable telemetry in production
  typescript: {
    // Allow production builds to complete even if there are type errors
    // Remove this in development for strict type checking
    ignoreBuildErrors: false,
  },
  
  eslint: {
    // Run ESLint during builds
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
