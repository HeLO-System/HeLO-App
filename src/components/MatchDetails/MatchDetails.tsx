/* eslint-disable @next/next/no-img-element */
import { AutoTextSkeleton } from "@components/AutoSkeletons";
import { useClanTags } from "@hooks";
import { Factions, Match } from "@types";
import classNames from "classnames";
import { DateTime } from "luxon";
import { FC } from "react";

interface MatchDetailsProps {
  match?: Match;
  clanId?: string;
}

export const MatchDetails: FC<MatchDetailsProps> = ({ match, clanId }) => {
  const { getTag } = useClanTags();

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
        {match &&
          `${getTag(match.clans1_ids[0])} : ${getTag(match.clans2_ids[0])}`}
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
      </AutoTextSkeleton>
      <AutoTextSkeleton className="min-w-[3rem] text-center ">
        {match && DateTime.fromMillis(match.date.$date).toISODate()}
      </AutoTextSkeleton>
    </div>
  );
};

const WinLoseBanner: FC<{ caps1?: number; caps2?: number }> = ({
  caps1,
  caps2,
}) => {
  let text = "DEFEAT";
  let background = "bg-red-800";

  if (caps1 === undefined || caps2 === undefined) {
    text = "\u200B";
    background = "bg-gray-700";
  } else if (caps1 > caps2) {
    text = "VICTORY";
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
