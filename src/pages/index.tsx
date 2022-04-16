import { Button } from "@components/Button";
import { RecordPanel } from "@components/RecordPanel";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Discord from "../../public/Discord-Logo-White.svg";

/**
 * Landing page
 */
const Home: NextPage = () => (
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
      <div className="mt-10 flex gap-10">
        <Button text="What is HeLo"></Button>
        <Button
          text="Join our Discord"
          icon={<Discord className="text-xl" />}
          onClick={(): void => {
            window.open("https://discord.gg/dmtcbrV7t5", "_blank");
          }}
        ></Button>
      </div>
      <RecordPanel
        className="mt-32"
        title="Top Clans By ELO"
        clans={[
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
        ]}
      />
      <RecordPanel
        className="mt-10"
        title="Top Clans By Played Matches"
        clans={[
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
          { name: "91.PzG", tag: "91.PzG", score: 100, num_matches: 2 },
        ]}
      />
    </div>
  </div>
);

export default Home;
