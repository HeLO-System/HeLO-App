/* eslint-disable @next/next/no-img-element */
import { AutoTextSkeleton } from "@components/AutoSkeletons";
import { RecordCard } from "@components/RecordPanel/Cards";
import { useClanTags } from "@hooks";
import { Factions, Match } from "@types";
import classNames from "classnames";
import { DateTime } from "luxon";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { WinLoseBanner } from "./WinLooseBanner";

type SortedMatch = Match & {
  friendlyIds: string[];
  enemyIds: string[];
  friendlySide: Factions;
  enemySide: Factions;
  friendlyCaps: number;
  enemyCaps: number;
};

type MatchCardProps = {
  match?: Match;
  clanId?: string;
};

const matchMode = (match: Match, clanId: string): string => {
  let factionRe = /(Allie)s/;
  let mode = " ("
  if (match?.offensive) {
    const side = match?.clans1_ids.includes(clanId) ? match?.side1 : match?.side2;
    mode += side ? side.replace(factionRe, "$1d") + " " : ""
    return mode + "Offensive)"
  }
  return mode + "Warfare)"
}

export const MatchCard: FC<MatchCardProps> = ({ match, clanId }) => {
  const [sortedMatch, setSortedMatch] = useState<SortedMatch>();
  const { getTag } = useClanTags();

  useEffect(() => {
    if (match && clanId) {
      if (match.clans1_ids.includes(clanId)) {
        setSortedMatch({
          ...match,
          friendlyIds: match.clans1_ids,
          enemyIds: match.clans2_ids,
          friendlySide: match.side1,
          enemySide: match.side2,
          friendlyCaps: match.caps1,
          enemyCaps: match.caps2,
        });
      } else {
        setSortedMatch({
          ...match,
          friendlyIds: match.clans2_ids,
          enemyIds: match.clans1_ids,
          friendlySide: match.side2,
          enemySide: match.side1,
          friendlyCaps: match.caps2,
          enemyCaps: match.caps1,
        });
      }
    }
  }, [clanId, match]);

  return (
    <RecordCard>
      <Link href={match ? `/matches/${match.match_id}` : ""}>
        <a className="py-2 flex flex-col items-center h-full">
          <WinLoseBanner
            friendlyCaps={sortedMatch?.friendlyCaps}
            enemyCaps={sortedMatch?.enemyCaps}
            offensive={sortedMatch?.offensive}
            attacker={match?.clans1_ids.includes(clanId)}
          />
          <AutoTextSkeleton className="text-2xl min-w-[3rem] text-center font-mono grid grid-cols-[1fr_min-content_1fr] flex-1">
            {sortedMatch && (
              <>
                <span className="whitespace-pre-line text-start flex items-center">
                  {sortedMatch.friendlyIds.map((id) => getTag(id)).join("\n")}
                </span>
                <span className="flex items-center px-4">vs</span>
                <span className="whitespace-pre-line text-start flex items-center">
                  {sortedMatch.enemyIds.map((id) => getTag(id)).join("\n")}
                </span>
              </>
            )}
          </AutoTextSkeleton>
          <AutoTextSkeleton className="text-2xl min-w-[3rem] text-center font-mono">
            {sortedMatch && (
              <div className="flex items-center">
                <img
                  src={
                    sortedMatch.friendlySide === Factions.Allies
                      ? "/ico_HLLAllies.png"
                      : "/ico_HLLAxis.png"
                  }
                  alt={sortedMatch.friendlySide}
                  className="h-5 w-5 inline mr-2"
                />
                <span
                  className={classNames({
                    "font-bold":
                      sortedMatch.friendlyCaps > sortedMatch.enemyCaps,
                  })}
                >
                  {sortedMatch.friendlyCaps}
                </span>
                <span>:</span>
                <span
                  className={classNames({
                    "font-bold":
                      sortedMatch.friendlyCaps < sortedMatch.enemyCaps,
                  })}
                >
                  {sortedMatch.enemyCaps}
                </span>
                <img
                  src={
                    sortedMatch.enemySide === Factions.Allies
                      ? "/ico_HLLAllies.png"
                      : "/ico_HLLAxis.png"
                  }
                  alt={sortedMatch.enemySide}
                  className="h-5 w-5 inline ml-2"
                />
              </div>
            )}
          </AutoTextSkeleton>
          <AutoTextSkeleton className="min-w-[3rem] text-center">
            {match?.map}
            {matchMode(match)}
          </AutoTextSkeleton>

          <AutoTextSkeleton className="min-w-[3rem] text-center ">
            {match && DateTime.fromMillis(match.date.$date).toISODate()}
          </AutoTextSkeleton>
        </a>
      </Link>
    </RecordCard>
  );
};
