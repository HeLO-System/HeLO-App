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
