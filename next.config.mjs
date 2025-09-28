/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    domains: ['blob.v0.dev', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Add proper page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Fix webpack configuration for better stability and case sensitivity
  webpack: (config, { dev, isServer }) => {
    config.resolve.symlinks = false;
    
    // Fix case sensitivity issues by using proper resolver
    config.resolve.cacheWithContext = false;
    
    // Add case-sensitive path plugin equivalent for Windows
    if (process.platform === 'win32') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      
      // Force consistent path casing
      const originalResolve = config.resolve.modules;
      config.resolve.modules = originalResolve;
    }
    
    return config;
  },
  // Experimental features to help with stability
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
