/* eslint-disable @next/next/no-img-element */
import { ClanCard } from "@components/ClanCard";
import { CustomLink } from "@components/CustomLink";
import { GlassPanel } from "@components/GlassPanel";
import { Searchbar } from "@components/Searchbar";
import { ClansQueryParams, fetchClans } from "@queries";
import { range } from "@util";
import { NextPage } from "next";
import { useQuery } from "react-query";
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
  const { data: topClansByScore } = useQuery(
    ["clans", topClansByScoreParams],
    () => fetchClans(topClansByScoreParams)
  );

  const { data: topClansByGames } = useQuery(
    ["clans", topClansByGamesParams],
    () => fetchClans(topClansByGamesParams)
  );

  return (
    <div
      className="flex flex-col w-screen h-screen text-white"
      id="masked-overflow"
    >
      <div className="absolute flex flex-row w-full md:justify-end justify-center md:p-10 p-4 top-0 z-10">
        <Searchbar />
      </div>
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
          text="What is HeLO?"
          className="text-xl p-4 md:col-span-3"
          href="/about"
        />
        <CustomLink
          text="Join our Discord"
          className="text-xl p-4 md:col-span-3 md:col-start-5"
          icon={<Discord className="text-xl" />}
          target="_blank"
          href="https://discord.gg/dmtcbrV7t5"
        />
        <CustomLink
          text="View all Clans"
          className="text-xl p-4 md:col-span-3 md:col-start-3 mt-10"
          href="/clans"
        />
      </section>

      <GlassPanel
        title="Top Clans By Score"
        className="mx-10 lg:mx-auto mt-32 p-4 lg:min-w-[1000px]"
      >
        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-10 gap-y-5">
          {topClansByScore
            ? topClansByScore?.map((clan) => (
                <ClanCard clan={clan} key={clan._id.$oid} />
              ))
            : range(clanRecordLimit).map((index) => <ClanCard key={index} />)}
        </div>
      </GlassPanel>

      <GlassPanel
        title="Top Clans By Games"
        className="mx-10 lg:mx-auto mt-10 p-4 lg:min-w-[1000px]"
      >
        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-10 gap-y-5">
          {topClansByGames
            ? topClansByGames?.map((clan) => (
                <ClanCard clan={clan} key={clan._id.$oid} />
              ))
            : range(clanRecordLimit).map((index) => <ClanCard key={index} />)}
        </div>
      </GlassPanel>
    </div>
  );
};

export default Home;
