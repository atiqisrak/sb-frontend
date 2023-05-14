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
  images: {
    domains: [
      "https://sb-backend.cyclic.app/",
      "http://127.0.0.1:3000/",
      "https://sardarbikes.vercel.app/",
    ],
  },
};

module.exports = nextConfig;
