/* eslint-disable @next/next/no-img-element */
import { CustomLink } from "@components/CustomLink";
import { GlassPanel } from "@components/GlassPanel";
import { RecordClanPanel, RecordMiscPanel } from "@components/RecordPanel";
import { ClansQueryParams, fetchClans } from "@queries";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Discord from "../../public/Discord-Logo-White.svg";
import Logo from "../../public/helo.svg";

const clanRecordLimit = 5;

const topClansByScoreParams: ClansQueryParams = {
  limit: clanRecordLimit,
  sort_by: "score",
  desc: true,
};

const topClansByGamesParams: ClansQueryParams = {
  limit: clanRecordLimit,
  sort_by: "num_matches",
  desc: true,
};

/**
 * Landing page
 */
const Home: NextPage = () => {
  const router = useRouter();

  const { data: topClansByScore } = useQuery(
    ["clans", topClansByScoreParams],
    () => fetchClans(topClansByScoreParams)
  );

  const { data: topClansByGames } = useQuery(
    ["clans", topClansByGamesParams],
    () => fetchClans(topClansByGamesParams)
  );

  useEffect(() => {
    router.prefetch("/clan/[pid]");
  }, [router]);

  return (
    <div
      className="flex flex-col w-screen h-screen text-white"
      id="masked-overflow"
    >
      <GlassPanel className="before:rounded-full mx-auto mt-32 bg-e-2 !rounded-full p-10">
        <Logo className="h-32 w-32 fill-white" />
      </GlassPanel>
      <h1
        className="text-5xl mt-10 text-center font-gotham-book tracking-[0.3em] font-bold"
        style={{ textShadow: "0 0 8px black" }}
      >
        HeLO-System
      </h1>
      <h2
        className="text-[1.75rem] mt-5 text-center font-gotham-book"
        style={{ textShadow: "0 0 8px black" }}
      >
        Hell Let Loose Competitive Clan Ranking
      </h2>

      <section className="mt-10 mx-auto grid gap-y-10 md:gap-y-10 md:grid-cols-7 justify-center items-center whitespace-nowrap">
        <CustomLink
          icon={<img src="/kofi.png" className="h-6" alt="KoFi" />}
          text="Support us"
          className="text-xl p-4 md:col-span-3"
          href="https://ko-fi.com/helosystem"
        />
        <CustomLink
          text="Join our Discord"
          className="text-xl p-4 md:col-span-3 md:col-start-5"
          icon={<Discord className="text-xl" />}
          target="_blank"
          href="https://discord.gg/dmtcbrV7t5"
        />
      </section>

      <RecordClanPanel
        title="Top Clans By Score"
        className="mx-10 lg:mx-auto mt-32 p-4 lg:min-w-[1000px]"
        clans={topClansByScore}
      />
      <RecordClanPanel
        title="Top Clans By Games"
        className="mx-10 lg:mx-auto mt-10 p-4 lg:min-w-[1000px]"
        clans={topClansByGames}
      />
      <RecordMiscPanel className="mx-10 lg:mx-auto mt-10 p-4 lg:min-w-[1000px] mb-20" />
    </div>
  );
};

export default Home;
