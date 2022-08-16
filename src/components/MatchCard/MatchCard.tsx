/* eslint-disable @next/next/no-img-element */
import { AutoTextSkeleton } from "@components/AutoSkeletons";
import { RecordCard } from "@components/RecordPanel/Cards";
import { useClanTags } from "@hooks";
import { Factions, Match } from "@types";
import classNames from "classnames";
import { DateTime } from "luxon";
import Link from "next/link";
import { FC } from "react";
import { WinLoseBanner } from "./WinLooseBanner";

interface MatchCardProps {
  match?: Match;
  clanId?: string;
}

export const MatchCard: FC<MatchCardProps> = ({ match, clanId }) => {
  const { getTag } = useClanTags();

  return (
    <RecordCard>
      <Link href={match ? `/matches/${match.match_id}` : ""}>
        <a className="py-2 flex flex-col items-center h-full">
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
          />
          <AutoTextSkeleton className="text-2xl min-w-[3rem] text-center font-mono grid grid-cols-[1fr_min-content_1fr]">
            {match && (
              <>
                <span className="whitespace-pre-line text-start">
                  {match.clans1_ids.map((id) => getTag(id)).join("\n")}
                </span>
                <span className="flex items-center px-4">vs</span>
                <span className="whitespace-pre-line text-start">
                  {match.clans2_ids.map((id) => getTag(id)).join("\n")}
                </span>
              </>
            )}
          </AutoTextSkeleton>
          <AutoTextSkeleton className="text-2xl min-w-[3rem] text-center font-mono flex-1 flex items-end">
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
                  className={classNames({
                    "font-bold": match.caps1 > match.caps2,
                  })}
                >
                  {match.caps1}
                </span>
                <span>:</span>
                <span
                  className={classNames({
                    "font-bold": match.caps1 < match.caps2,
                  })}
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
        </a>
      </Link>
    </RecordCard>
  );
};
