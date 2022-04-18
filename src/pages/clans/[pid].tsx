/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-head-element */
import { Button } from "@components/Button";
import { GlassPanel } from "@components/GlassPanel";
import {
  ArrowLeft24Regular,
  ShieldFilled,
  TrophyFilled,
} from "@fluentui/react-icons";
import { ChatIcon } from "@heroicons/react/solid";
import { Clan } from "@types";
import { fetchData } from "@util";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Discord from "../../../public/Discord-Logo-White.svg";

const ClanPage: NextPage = () => {
  const router = useRouter();
  const [clan, setClan] = useState<Clan>();
  const { pid } = router.query;

  useEffect(() => {
    if (pid) {
      fetchData<Clan>(`/api/clan/${pid as string}`)
        .then((data: Clan) => {
          setClan(data);
          if (data.tag !== pid) {
            history.pushState(null, "", data.tag);
          }
        })
        .catch(null);
    }
  }, [pid]);

  return (
    <>
      <Head>
        <title> {clan?.name ? `HeLO | ${clan.name}` : "HeLo-System"}</title>
        <meta
          property="og:image"
          content={`https://${
            process.env.NEXT_PUBLIC_VERCEL_URL || "helo-system.de"
          }/api/og-image?clan=${pid as string}`}
        />
      </Head>
      <div className="flex p-10 flex-col gap-8">
        <button
          className="w-min"
          onClick={(): void => {
            void router.push("/");
          }}
        >
          <GlassPanel className="p-2 flex gap-2 items-center text-white text-xl font-gotham-book">
            <ArrowLeft24Regular />
            <span className="whitespace-nowrap">HeLO-System</span>
          </GlassPanel>
        </button>

        <GlassPanel className="p-4 flex flex-wrap items-center">
          <div className="w-16 h-16 md:w-32 md:h-32  mr-4 overflow-hidden">
            {clan?.icon ? (
              <img src={clan.icon} className="w-full h-full" alt="Clan Logo" />
            ) : (
              <Image
                src="/hll.png"
                height="100%"
                width="100%"
                alt="Clan Logo"
                className="rounded-full"
              />
            )}
          </div>
          <div className="font-gotham-book">
            <h1 className="text-6xl">{clan?.tag}</h1>
            <h2 className="text-3xl hidden md:block">{clan?.name}</h2>
          </div>
          <h2 className="text-3xl font-gotham-book md:hidden">{clan?.name}</h2>
          <hr className="basis-full h-0 md:hidden border-black my-4"></hr>
          <div className="flex flex-col items-center mr-auto md:mr-0 mx-auto">
            <h2 className="text-3xl flex items-center">
              <TrophyFilled className="text-accent" />
              Score
            </h2>
            <h1 className="text-5xl font-bold">{clan?.score}</h1>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <h2 className="text-3xl flex items-center">
              <ShieldFilled />
              Matches
            </h2>
            <h1 className="text-5xl font-bold">{clan?.num_matches}</h1>
          </div>
          {clan?.invite && (
            <>
              <hr className="basis-full h-0 md:hidden border-black my-4"></hr>
              <Button
                text="Join Discord"
                className="text-xl p-4 mx-auto"
                icon={<Discord className="text-xl" />}
                onClick={(): void => {
                  window.open("https://discord.gg/dmtcbrV7t5", "_blank");
                }}
              ></Button>
            </>
          )}
        </GlassPanel>
      </div>
    </>
  );
};

const ClanBak: NextPage = () => (
  <>
    <Head>
      <title> {`HeLO | ${""}`}</title>
      <meta
        property="og:image"
        content={`https://${
          process.env.NEXT_PUBLIC_VERCEL_URL || "helo-system.de"
        }/api/og-image?name=Sto%C3%9Ftrupp_Donnerbalken&score=1000&tag=StdB&num_matches=10`}
      />
    </Head>
    <div className="flex flex-col gap-5 py-16 pr-5 h-screen justify-start bg-gray-900 ">
      <div className="flex flex-row pl-10 pr-5 w-fill h-fit rounded-r-2xl gap-5 bg-black shadow-xl shadow-black justify-start items-center text-white">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png"
          alt=""
          className="w-48 h-40 justify-start rounded-xl m-10 shadow-2xl shadow-red-400"
        ></img>
        <div className="flex flex-col gap-2 h-28 m-10 justify-center">
          <p className="flex items-center justify-center font-bold text-8xl">
            Corvus Rex
          </p>
          <p className="flex items-center justify-center font-mono text-5xl">
            CoRe
          </p>
        </div>
        <div className="flex flex-col gap-2 ml-20 px-20 py-4">
          <p className="flex items-center justify-center font-mono text-2xl">
            Score
          </p>
          <p className="flex items-center justify-center font-bold text-5xl">
            752
          </p>
        </div>

        <div className="flex flex-col gap-2 px-5 py-4 mr-auto">
          <p className="flex items-center justify-center font-mono text-2xl">
            Matches played
          </p>
          <p className="flex items-center justify-center font-bold text-5xl">
            38
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="flex items-center justify-center font-semibold">
            Discord
          </p>
          <button className="flex justify-center-items-center">
            <ChatIcon className="w-4 hover:scale-125" />
          </button>
        </div>
      </div>

      <div className="flex flex-col w-fill h-fit bg-black shadow-xl shadow-black text-white pl-20 pt-5 pb-10 rounded-r-2xl gap-5">
        <p className="font-bold text-4xl">Recent matches</p>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col overflow-hidden items-center justify-center bg-gray-900 h-40 w-72 rounded-xl pt-2 px-3 text-gray-300">
            <div className="flex flex-col bg-green-800 w-72 h-fit mb-2">
              <p className="flex items-center justify-center font-semibold text-lg">
                WIN
              </p>
            </div>
            <p className="text-2xl items-center justify-center">
              <span className="font-bold text-white items-start">ClanTag1</span>{" "}
              : ClanTag2
            </p>
            <p className=" items-center justify-center text-2xl font-mono">
              <span className="font-bold text-white">5 </span>: 0
            </p>
            <p className="text-md font-italic">eventtag</p>
            <p className="text-md text-gray-400">22.03.2022</p>
          </div>
          <div className="flex flex-col overflow-hidden items-center justify-center bg-gray-900 h-40 w-72 rounded-xl pt-2 px-3 text-gray-300">
            <div className="flex flex-col bg-red-800 w-72 h-fit mb-2">
              <p className="flex items-center justify-center font-semibold text-lg">
                LOSS
              </p>
            </div>
            <p className="text-2xl items-center justify-center">
              <span className="font-bold text-white items-start">ClanTag1</span>{" "}
              : ClanTag2
            </p>
            <p className=" items-center justify-center text-2xl font-mono">
              <span className="font-bold text-white">2 </span>: 3
            </p>
            <p className="text-md font-italic">eventtag</p>
            <p className="text-md text-gray-400">22.03.2022</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ClanPage;
