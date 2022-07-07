/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Factions, Map, Match } from "@types";
import { enumKeys } from "@util";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export type Statistics = {
  total_matches: number;
  map_statistics: MapStatistic;
  faction_winrate_by_map: FactionWinrateByMap;
  avg_length_per_map: AvgLengthPerMap;
};

export type MapStatistic = { map: string; games: number }[];
export type AvgLengthPerMap = { map: string; duration: string }[];
export type FactionWinrateByMap = {
  map: string;
  Axis: string;
  Allies: string;
}[];

const getMatchRecords = (): Promise<Statistics> =>
  axios
    .get<Match[]>("https://helo-system.herokuapp.com/matches", {
      params: { select: "map,duration,match_id,side1,side2,caps1,caps2" },
    })
    .then(({ data }) => {
      const gamesPerMap: Record<string, number> = {};
      const avgLength: Record<string, number> = {};
      const factionWinrateByMap: Record<
        string,
        { Axis: number; Allies: number }
      > = {};
      enumKeys(Map).forEach((map) => {
        gamesPerMap[map] = 0;
        avgLength[map] = 0;
        factionWinrateByMap[map] = { Axis: 0, Allies: 0 };
        enumKeys(Factions).forEach((faction) => {
          factionWinrateByMap[map][faction] = 0;
        });
      });
      data.forEach((match) => {
        const mapIndex = gamesPerMap[match.map] + 1;
        const winningFaction =
          match.caps1 > match.caps2 ? match.side1 : match.side2;
        const losingFaction =
          match.caps1 < match.caps2 ? match.side1 : match.side2;
        gamesPerMap[match.map] = mapIndex;
        avgLength[match.map] =
          (avgLength[match.map] * (mapIndex - 1)) / mapIndex +
          match.duration / mapIndex;

        factionWinrateByMap[match.map][winningFaction] =
          (factionWinrateByMap[match.map][winningFaction] * (mapIndex - 1)) /
            mapIndex +
          1 / mapIndex;
        factionWinrateByMap[match.map][losingFaction] =
          (factionWinrateByMap[match.map][losingFaction] * (mapIndex - 1)) /
            mapIndex +
          0 / mapIndex;
      });

      return {
        total_matches: data.length,
        map_statistics: Object.entries(gamesPerMap)
          .map(([map, games]) => ({
            map,
            games,
          }))
          .sort(({ games: gamesA }, { games: gamesB }) => gamesA - gamesB),
        avg_length_per_map: Object.entries(avgLength).map(
          ([map, duration]) => ({
            map,
            duration: duration.toFixed(2),
          })
        ),
        faction_winrate_by_map: Object.entries(factionWinrateByMap).map(
          ([map, { Allies, Axis }]) => ({
            map,
            Axis: Axis.toFixed(2),
            Allies: Allies.toFixed(2),
          })
        ),
      };
    });

const handler = (
  _req: NextApiRequest,
  res: NextApiResponse<Statistics | { error: string }>
): Promise<void> =>
  getMatchRecords()
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500).json({ error: "Internal Server Error" }));

export default handler;
