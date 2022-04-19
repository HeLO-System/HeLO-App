/* eslint-disable @next/next/no-img-element */
import { AutoTextSkeleton } from "@components/AutoSkeletons";
import { fetchClan } from "@queries";
import { Factions, Match } from "@types";
import classNames from "classnames";
import { FC } from "react";
import { useQuery } from "react-query";

interface MatchDetailsProps {
  match?: Match;
  clanId?: string;
}

export const MatchDetails: FC<MatchDetailsProps> = ({ match, clanId }) => {
  const { data: clan1 } = useQuery(
    ["clan", match?.clans1_ids[0]],
    () => fetchClan(match?.clans1_ids[0] as string),
    { enabled: !!match?.clans1_ids }
  );
  const { data: clan2 } = useQuery(
    ["clan", match?.clans2_ids[0]],
    () => fetchClan(match?.clans2_ids[0] as string),
    { enabled: !!match?.clans2_ids }
  );

  return (
    <div className="bg-e-2 shadow-elevation-1 hover:scale-105 rounded-lg py-2 flex flex-col items-center ">
      <WinLoseBanner
        caps1={
          clanId && match && match.clans1_ids.includes(clanId)
            ? match.caps1
            : match?.caps2
        }
        caps2={
          clanId && match && match.clans1_ids.includes(clanId)
            ? match.caps2
            : match?.caps1
        }
      ></WinLoseBanner>
      <AutoTextSkeleton className="text-2xl min-w-[3rem] text-center font-mono">
        {clan1 && clan2 && `${clan1.tag} : ${clan2.tag}`}
      </AutoTextSkeleton>
      <AutoTextSkeleton className="text-2xl min-w-[3rem] text-center font-mono">
        {match && (
          <div className="flex items-center">
            <img
              src={
                match.side1 === Factions.Allies
                  ? "/ico_HLLAllies.png"
                  : "/ico_HLLAxis.png"
              }
              alt={match.side1}
              className="h-5 w-5 inline mr-2"
            />
            <span
              className={classNames({ "font-bold": match.caps1 > match.caps2 })}
            >
              {match.caps1}
            </span>
            <span>:</span>
            <span
              className={classNames({ "font-bold": match.caps1 < match.caps2 })}
            >
              {match.caps2}
            </span>
            <img
              src={
                match.side2 === Factions.Allies
                  ? "/ico_HLLAllies.png"
                  : "/ico_HLLAxis.png"
              }
              alt={match.side1}
              className="h-5 w-5 inline ml-2"
            />
          </div>
        )}
      </AutoTextSkeleton>
      <AutoTextSkeleton className="min-w-[3rem] text-center">
        {match?.map}
      </AutoTextSkeleton>{" "}
      <AutoTextSkeleton className="min-w-[3rem] text-center ">
        {match && new Date(match.date.$date).toISOString().split("T")[0]}
      </AutoTextSkeleton>
    </div>
  );
};

const WinLoseBanner: FC<{ caps1?: number; caps2?: number }> = ({
  caps1,
  caps2,
}) => {
  let text = "LOSS";
  let background = "bg-red-800";

  if (caps1 === undefined || caps2 === undefined) {
    text = "\u200B";
    background = "bg-gray-700";
  } else if (caps1 > caps2) {
    text = "WIN";
    background = "bg-green-800";
  }

  return (
    <div
      className={classNames(
        "w-full text-center mb-2 font-semibold",
        background
      )}
    >
      {text}
    </div>
  );
};
