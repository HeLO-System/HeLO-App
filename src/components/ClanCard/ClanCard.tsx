/* eslint-disable @next/next/no-img-element */
import { Shield24Filled, Trophy24Filled } from "@fluentui/react-icons";
import { Clan } from "@types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

interface ClanCardProps {
  clan: Clan;
  className?: string;
}

export const ClanCard: FC<ClanCardProps> = ({ clan }) => {
  const router = useRouter();

  return (
    <button
      className="bg-e-2 rounded-lg hover:scale-105 shadow-elevation-1 text-font  w-40 flex flex-col items-center py-4"
      onClick={(): void => {
        router.push(`/clans/${clan.tag}`).catch(() => null);
      }}
    >
      {clan.icon ? (
        <img
          src={clan.icon}
          className="rounded-full h-16 w-16"
          alt="Clan Logo"
        />
      ) : (
        <Image
          src="/hll.png"
          height="64"
          width="64"
          className="rounded-full"
          alt="Clan Logo"
        />
      )}

      <div className="text-lg">{clan.name}</div>
      <hr className="mx-4 border-border border-" />
      <div className="flex md:flex-col justify-around">
        <div>
          <Trophy24Filled className="h-4 text-accent" />
          {clan.score}
        </div>
        <div>
          <Shield24Filled className="h-4" />
          {clan.num_matches}
        </div>
      </div>
    </button>
  );
};
