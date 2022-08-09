/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Clan, Map, Match } from "@types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type MinDurationRecord = {
  duration: number;
  match_id: string;
};

type ScoreDiffRecord = {
  diff: number;
  lowest_score: number;
  highest_score: number;
  lowest_clan_id: string;
  highest_clan_id: string;
};

type MostPlayedMapRecord = {
  map: string;
  count: number;
};

export type MiscRecords = {
  total_matches: number;
  total_clans: number;
  score_diff: ScoreDiffRecord;
  min_duration: MinDurationRecord;
  most_played_map: MostPlayedMapRecord;
};

type MatchRecords = {
  min_duration: number;
  min_duration_match: string;
  most_played_map: string;
  most_played_map_count: number;
  total: number;
};

const getMatchRecords = (): Promise<MatchRecords> =>
  axios
    .get<Match[]>("https://helo-system.herokuapp.com/matches", {
      params: { select: "map,duration,match_id" },
    })
    .then(({ data }) => {
      let min_duration = 90;
      let min_duration_match = "";
      const [most_played_map, most_played_map_count] = Object.entries(
        data.reduce((acc, curr) => {
          acc[curr.map as Map] = (acc[curr.map as Map] || 0) + 1;
          if (curr.duration < min_duration) {
            min_duration = curr.duration;
            min_duration_match = curr.match_id;
          }
          return acc;
        }, {} as Record<Map, number>)
      ).sort((a, b) => b[1] - a[1])[0];
      return {
        most_played_map,
        most_played_map_count,
        min_duration,
        min_duration_match,
        total: data.length,
      };
    });
const getTotalClans = (): Promise<number> =>
  axios
    .get<Clan[]>("https://helo-system.herokuapp.com/clans", {
      params: { select: "id" },
    })
    .then(({ data }) => data.length);
const getMinScore = (): Promise<Clan> =>
  axios
    .get<Clan[]>("https://helo-system.herokuapp.com/clans", {
      params: { select: "score", limit: 1, sort_by: "score" },
    })
    .then(({ data }) => data[0]);
const getMaxScore = (): Promise<Clan> =>
  axios
    .get<Clan[]>("https://helo-system.herokuapp.com/clans", {
      params: { select: "score", limit: 1, sort_by: "score", desc: true },
    })
    .then(({ data }) => data[0]);

const handler = (
  _req: NextApiRequest,
  res: NextApiResponse<MiscRecords | { error: string }>
): Promise<void> =>
  Promise.all([
    getMatchRecords(),
    getTotalClans(),
    getMinScore(),
    getMaxScore(),
  ])
    .then(
      ([
        {
          total: total_matches,
          min_duration,
          min_duration_match,
          most_played_map,
          most_played_map_count,
        },
        total_clans,
        {
          _id: { $oid: lowest_clan_id },
          score: lowest_score,
        },
        {
          _id: { $oid: highest_clan_id },
          score: highest_score,
        },
      ]) =>
        res.status(200).json({
          min_duration: {
            match_id: min_duration_match,
            duration: min_duration,
          },
          most_played_map: {
            map: most_played_map,
            count: most_played_map_count,
          },
          total_clans,
          total_matches,
          score_diff: {
            diff: highest_score - lowest_score,
            lowest_score,
            highest_score,
            lowest_clan_id,
            highest_clan_id,
          },
        })
    )
    .catch(() => res.status(500).json({ error: "Internal Server Error" }));

export default handler;
