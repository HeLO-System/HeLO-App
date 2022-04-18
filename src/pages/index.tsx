import { Button } from "@components/Button";
import { RecordPanel } from "@components/RecordPanel";
import { Clan } from "@types";
import { fetchData } from "@util";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Discord from "../../public/Discord-Logo-White.svg";

/**
 * Landing page
 */
const Home: NextPage = () => {
  const router = useRouter();
  const [topClansByScore, setTopClansByScore] = useState<Clan[]>([]);
  const [topClansByScoreLoading, setTopClansByScoreLoading] = useState(true);
  const [topClansByGames, setTopClansByGames] = useState<Clan[]>([]);
  const [topClansByGamesLoading, setTopClansByGamesLoading] = useState(true);

  useEffect(() => {
    setTopClansByScoreLoading(true);
    setTopClansByGamesLoading(true);
    fetchData<Clan[]>("/api/clans?limit=5&sort_by=num_matches&desc=true")
      .then((data: Clan[]) => {
        setTopClansByGames(data);
        setTopClansByGamesLoading(false);
      })
      .catch(null);
    fetchData<Clan[]>("/api/clans?limit=5&sort_by=score&desc=true")
      .then((data: Clan[]) => {
        setTopClansByScore(data);
        setTopClansByScoreLoading(false);
      })
      .catch(null);
  }, []);

  return (
    <div>
      <div
        className="flex flex-col w-screen h-screen items-center"
        id="masked-overflow"
      >
        <h1 className="text-5xl mt-40 text-center font-['Gotham-Book'] tracking-[0.3em]">
          HeLO-System
        </h1>
        <h2 className="text-[1.75rem] mt-5 text-center font-['Gotham-Book'] text-gray-800">
          Hell Let Loose Competitive Clan Ranking
        </h2>
        <section className="mt-10 flex gap-10 flex-col md:flex-row">
          <Button
            text="What is HeLO?"
            className="text-xl p-4"
            onClick={(): void => {
              router.push("/about").catch(null);
            }}
          ></Button>
          <Button
            text="Join our Discord"
            className="text-xl p-4"
            icon={<Discord className="text-xl" />}
            onClick={(): void => {
              window.open("https://discord.gg/dmtcbrV7t5", "_blank");
            }}
          ></Button>
        </section>
        <RecordPanel
          className="mt-32"
          title="Top Clans By Score"
          clans={topClansByScore}
        />
        <RecordPanel
          className="mt-10"
          title="Top Clans By Played Matches"
          clans={topClansByGames}
        />
      </div>
    </div>
  );
};

export default Home;
