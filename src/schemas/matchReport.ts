/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Maps } from "@constants";
import { z } from "zod";

export const MatchTypes = z.enum(["Friendly", "Competitive"]);
export const MatchResults = z.enum(["5:0", "4:1", "3:2", "2:3", "1:4", "0:5"]);

export const MatchReportClanSchema = z.object({
  tag: z.string(),
  players: z.number(),
});

export const MatchReportSchema = z.object({
  matchType: MatchTypes,
  axisClans: z.array(MatchReportClanSchema).nonempty(),
  alliesClans: z.array(MatchReportClanSchema).nonempty(),
  map: Maps,
  result: MatchResults,
  date: z.string(),
  time: z.number().min(5).max(90),
  caps: z.tuple([z.string(), z.string(), z.string(), z.string(), z.string()]),
});
