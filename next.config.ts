/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    // Configure path patterns that can be used with next/image
    remotePatterns: [],
    // Ensure static images are properly optimized by Next.js
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Ensure trailing slashes are used consistently
  trailingSlash: false,
};

export default nextConfig;
