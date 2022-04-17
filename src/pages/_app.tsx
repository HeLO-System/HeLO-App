import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import Layout from "../components/Layout";
import "../styles/globals.scss";

const App: FC<AppProps> = ({ Component, pageProps }) => (
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
      <meta name="twitter:title" content="Helo-System" />
      <meta
        name="twitter:description"
        content="Hell Let Loose Competitive Clan Ranking"
      />
    </Head>
    <div className="fixed w-screen h-screen -z-10">
      <Image
        src="/background.webp"
        layout="fill"
        objectFit="cover"
        objectPosition="50% 0%"
        alt="Omaha Beach"
      />
    </div>
    <Component {...pageProps} />
  </Layout>
);

export default App;
