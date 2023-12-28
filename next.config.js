/** @type {import('next').NextConfig} */
const path = require("node:path");

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve(__dirname, "src/app/styles"),
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3500",
        pathname: "/uploads/**",
      },
    ],
    // domains: ["localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:3500/uploads/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
