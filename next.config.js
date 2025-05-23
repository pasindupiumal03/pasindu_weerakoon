/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Add case-sensitive path resolution
    config.resolve.symlinks = false;
    
    // Disable React DevTools in development
    if (dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-devtools': 'noop2',
      };
    }
    
    return config;
  },
  // Ensure proper casing in imports
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add proper page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Configure images
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig 