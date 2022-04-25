/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api.helo-system.de/:path*",
      },
    ];
  },
  images: {
    domains: ["cdn.discordapp.com", "media.discordapp.net"],
  },
};

module.exports = nextConfig;
