export default {
  // robots: async () => {
  //   if (process.env.NODE_ENV === "development") {
  //     return {
  //       UserAgent: "*",
  //       Disallow: "/",
  //     };
  //   }
  //   return {
  //     content: `
  //       User-agent: *
  //       Allow: /`,
  //   };
  // },
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
