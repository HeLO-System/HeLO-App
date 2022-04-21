/* eslint-disable @next/next/no-img-element */
import { ClanCard } from "@components/ClanCard";
import { CustomLink } from "@components/CustomLink";
import { GlassPanel } from "@components/GlassPanel";
import { ClansQueryParams, fetchClans } from "@queries";
import { range } from "@util";
import { NextPage } from "next";
import { useQuery } from "react-query";
import Discord from "../../public/Discord-Logo-White.svg";

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
    <div className="flex flex-col w-screen h-screen" id="masked-overflow">
      <GlassPanel className=" mx-auto mt-32 bg-e-2 !rounded-full p-10">
        <img src="/HeLo.png" className="h-32 w-32" alt="HeLo-Logo" />
      </GlassPanel>
      <h1 className="text-5xl mt-10 text-center font-gotham-book tracking-[0.3em]">
        HeLO-System
      </h1>
      <h2 className="text-[1.75rem] mt-5 text-center font-gotham-book text-gray-800">
        Hell Let Loose Competitive Clan Ranking
      </h2>

      <section className="mt-10 mx-auto grid gap-10 md:grid-cols-2 justify-center items-center">
        <CustomLink
          text="What is HeLO?"
          className="text-xl p-4"
          href="/about"
        ></CustomLink>
        <CustomLink
          text="Join our Discord"
          className="text-xl p-4"
          icon={<Discord className="text-xl" />}
          target="_blank"
          href="https://discord.gg/dmtcbrV7t5"
        ></CustomLink>
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
