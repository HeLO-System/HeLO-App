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
        source: "/helo-api/:path*",
        destination: "https://helo-system.herokuapp.com/:path*",
      },
    ];
  },
  images: {
    domains: ["cdn.discordapp.com", "media.discordapp.net"],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

module.exports = nextConfig;
