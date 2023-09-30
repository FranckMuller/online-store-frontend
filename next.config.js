/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "3500",
    //     pathname: "/uploads/**",
    //   },
    // ],
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
