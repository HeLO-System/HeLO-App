/* eslint-disable @next/next/no-img-element */
import { ClanIcon } from "@components/ClanIcon";
import { CustomLink } from "@components/CustomLink";
import { GlassPanel } from "@components/GlassPanel";
import { ShieldFilled, TrophyFilled } from "@fluentui/react-icons";
import { Clan } from "@types";
import { FC } from "react";
import Discord from "../../../public/Discord-Logo-White.svg";

interface ClanDetailsProps {
  clan?: Clan;
}

export const ClanDetails: FC<ClanDetailsProps> = ({ clan }) => (
  <GlassPanel className="p-4 mx-10 flex flex-wrap items-center">
    <div className="relative w-16 h-16 md:w-32 md:h-32  mr-4 overflow-hidden">
      <ClanIcon
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        imageProps={{ height: 256, width: 256, quality: 50 }}
        logoClassName="fill-white"
        icon={clan?.icon}
      />
    </div>
    <div className="font-gotham-book ">
      <h1 className="text-6xl">{clan?.tag}</h1>
      <h2 className="text-3xl hidden md:block">{clan?.name}</h2>
    </div>
    <div className="basis-full h-0 md:hidden" />
    <h2 className="text-3xl font-gotham-book md:hidden">{clan?.name}</h2>
    <hr className="basis-full h-0 md:hidden border-white my-4" />
    <div className="flex flex-col items-center mr-auto md:mr-0 mx-auto">
      <h2 className="text-3xl flex items-center">
        <TrophyFilled className="text-accent" />
        Score
      </h2>
      <h1 className="text-5xl font-bold">
        {clan?.score && Math.round(clan.score)}
      </h1>
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
        <hr className="basis-full h-0 md:hidden border-white my-4" />
        <CustomLink
          text="Join Discord"
          className="text-3xl p-4 mx-auto md:ml-0 md:mr-8"
          icon={<Discord className="text-3xl" />}
          href={clan.invite}
          target="_blank"
        />
      </>
    )}
  </GlassPanel>
);
