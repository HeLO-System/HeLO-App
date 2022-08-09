/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Layout } from "@components/Layout";
import { ClanTagProvider } from "@hooks";
import { init } from "@socialgouv/matomo-next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import { AppProps } from "next/app";
import { FC, useEffect } from "react";
import "../styles/globals.scss";

const hourInMs = 3600000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: hourInMs,
    },
  },
});

const defaultSeoConfig: DefaultSeoProps = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://helo-system.de",
    description: "Hell Let Loose Competitive Clan Ranking",
    images: [
      {
        url: "https://helo-system.de/og-preview.webp",
        alt: "Hell Let Loose Competitive Clan Ranking",
        type: "image/webp",
      },
      {
        url: "https://helo-system.de/og-preview.png",
        alt: "Hell Let Loose Competitive Clan Ranking",
        type: "image/png",
      },
    ],
    site_name: "HeLO-System",
  },
  defaultOpenGraphImageHeight: 630,
  defaultOpenGraphImageWidth: 1200,
  twitter: {
    cardType: "summary_large_image",
  },
  defaultTitle: "HeLO-System",
  titleTemplate: "HeLO | %s",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/helo_white.svg",
      type: "image/svg+xml",
    },
  ],
};

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL || "";
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "";
const MATOMO_JS = process.env.NEXT_PUBLIC_MATOMO_JS || "";
const MATOMO_PHP = process.env.NEXT_PUBLIC_MATOMO_PHP || "";

const App: FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    init({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
      jsTrackerFile: MATOMO_JS,
      phpTrackerFile: MATOMO_PHP,
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <DefaultSeo {...defaultSeoConfig} />
        <ClanTagProvider>
          <Layout>
            <div
              className="fixed w-screen h-screen -z-10"
              id="background-image"
            />
            <Component {...pageProps} />
          </Layout>
        </ClanTagProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
