import { Layout } from "@components/Layout";
import { init } from "@socialgouv/matomo-next";
import { ClanTagProvider } from "@util";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
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

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL || "";
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "";
const MATOMO_JS = process.env.NEXT_PUBLIC_MATOMO_JS || "";
const MATOMO_PHP = process.env.NEXT_PUBLIC_MATOMO_PHP || "";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    init({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
      jsTrackerFile: MATOMO_JS,
      phpTrackerFile: MATOMO_PHP,
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ClanTagProvider>
        <Layout>
          <Head>
            <title>HeLO-System</title>
            <meta
              name="description"
              content="Hell Let Loose Competitive Clan Ranking"
            />
            <meta property="og:url" content="https://helo-system.de/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="HeLO-System" />
            <meta
              property="og:description"
              content="Hell Let Loose Competitive Clan Ranking"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="helo-system.de" />
            <meta property="twitter:url" content="https://helo-system.de/" />
            <meta name="twitter:title" content="HeLO-System" />
            <meta
              name="twitter:description"
              content="Hell Let Loose Competitive Clan Ranking"
            />
            <link rel="icon" type="image/svg+xml" href="/helo_white.svg" />
          </Head>
          <div
            className="fixed w-screen h-screen -z-10"
            id="background-image"
          ></div>
          <Component {...pageProps} />
        </Layout>
      </ClanTagProvider>
    </QueryClientProvider>
  );
};

export default App;
