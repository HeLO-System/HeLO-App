// pages/server-sitemap.xml/index.tsx

import { ClanTagStore } from "@pages/api/clantags";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clans = await axios
    .get<ClanTagStore>("https://helo-system.de/api/clantags")
    .then(({ data }) => data);

  const fields: ISitemapField[] = Object.values(clans).map((tag) => ({
    loc: `https://helo-system.de/clans/${tag}`,
    priority: 0.5,
  }));

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
export default function Sitemap() {}
