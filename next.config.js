/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:4000/api/:path*",
        destination: "https://sb-backend.cyclic.app/api/:path*",
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
