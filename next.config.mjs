/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript during production builds (if you're using TypeScript)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
