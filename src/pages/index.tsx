import { Button } from "@components/Button";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Discord from "../../public/Discord-Logo-White.svg";

/**
 * Landing page
 */
const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center">
      <Head>
        <title>HeLO</title>
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
      <div className="text-4xl mt-40 text-center font-['Gotham-Book'] tracking-[0.3em]">
        HeLO-System
      </div>
      <div className="text-[1.75rem] mt-5 text-center font-['Gotham-Book']">
        Hell Let Loose Competitive Clan Ranking
      </div>
      <div className="mt-10 flex gap-10">
        <Button text="What is HeLo"></Button>
        <Button
          text="Join our Discord"
          icon={<Discord className="text-xl" />}
          onClick={() => {
            window.open("https://discord.gg/dmtcbrV7t5", "_blank");
          }}
        ></Button>
      </div>
    </div>
  );
};

export default Home;
