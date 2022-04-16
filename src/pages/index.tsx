import { Button } from "@components/Button";
import { RecordPanel } from "@components/RecordPanel";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Discord from "../../public/Discord-Logo-White.svg";

/**
 * Landing page
 */
const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <div
        className="flex flex-col w-screen h-screen items-center"
        id="masked-overflow"
      >
        <div className="text-4xl mt-40 text-center font-['Gotham-Book'] tracking-[0.3em]">
          HeLO-System
        </div>
        <div className="text-[1.75rem] mt-5 text-center font-['Gotham-Book']">
          Hell Let Loose Competitive Clan Ranking
        </div>
        <div className="mt-10 flex gap-10 flex-col md:flex-row">
          <Button
            text="What is HeLO?"
            className="text-xl p-4"
            onClick={(): void => {
              router.push("/about").catch(() => null);
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
        </div>
        <RecordPanel
          className="mt-32"
          title="Top Clans By Score"
          clans={[
            {
              name: "91.PzG",
              tag: "91.PzG",
              score: 1000,
              num_matches: 20,
              icon: "/91pzg.png",
            },
            { name: "Core", tag: "91.PzG", score: 900, num_matches: 24 },
            { name: "Phx", tag: "91.PzG", score: 750, num_matches: 22 },
            { name: "StDb", tag: "91.PzG", score: 600, num_matches: 12 },
            { name: "38.", tag: "91.PzG", score: 500, num_matches: 2 },
          ]}
        />
        <RecordPanel
          className="mt-10"
          title="Top Clans By Played Matches"
          clans={[
            {
              name: "91.PzG",
              tag: "91.PzG",
              score: 1000,
              num_matches: 20,
              icon: "/91pzg.png",
            },
            { name: "Core", tag: "91.PzG", score: 900, num_matches: 24 },
            { name: "Phx", tag: "91.PzG", score: 750, num_matches: 22 },
            { name: "StDb", tag: "91.PzG", score: 600, num_matches: 12 },
            { name: "38.", tag: "91.PzG", score: 500, num_matches: 2 },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
