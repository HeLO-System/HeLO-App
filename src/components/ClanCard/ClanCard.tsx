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
      className="bg-e-2 rounded-lg hover:scale-105 shadow-elevation-1 text-font h-48"
      onClick={(): void => {
        router.push(`/clans/${clan.tag}`).catch(() => null);
      }}
    >
      <Image src="/91pzg.png" height="64" width="64" className="rounded-full" />
      <div className="text-lg">{clan.name}</div>
      <div>
        <Trophy24Filled className="h-4" />
        {clan.score}
      </div>
      <div>
        <Shield24Filled className="h-4" />
        {clan.num_matches}
      </div>
    </button>
  );
};
