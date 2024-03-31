export default {
  dangerouslyAllowSVG: true,
  distDir: ".next",
  output: "out",
  eslint: {
    dirs: ["."],
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["bd.gaadicdn.com"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: "https://api.bikedekho.com/v1/pwa",
    NEXT_PUBLIC_MEDIA_URL: "https://bd.gaadicdn.com/pwa/img",
  },
};
