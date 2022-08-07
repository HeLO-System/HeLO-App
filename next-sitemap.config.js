/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://helo-system.de",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://helo-system.de/server-sitemap.xml", // <==== Add here
    ],
  },
};

module.exports = config;
