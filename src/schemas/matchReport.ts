/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Maps } from "@constants";
import { MatchReportClan } from "@types";
import { z } from "zod";

export const MatchTypes = z.enum(["Friendly", "Competitive"]);
export const MatchResults = z.enum(["5:0", "4:1", "3:2", "2:3", "1:4", "0:5"]);

export const MatchReportClanSchema = z.object({
  tag: z.string(),
  players: z.number(),
});

const clanRefiner: [
  (value: MatchReportClan[]) => boolean,
  { message: string }
] = [
  (clans) => clans.map(({ tag }) => tag).every((e, i, a) => a.indexOf(e) === i),
  { message: "All clans on the same side must be unique" },
];

export const MatchReportSchema = z.object({
  matchType: MatchTypes,
  axisClans: z
    .array(MatchReportClanSchema)
    .nonempty()
    .refine(...clanRefiner),
  alliesClans: z
    .array(MatchReportClanSchema)
    .nonempty()
    .refine(...clanRefiner),
  map: Maps,
  result: MatchResults,
  date: z.string(),
  time: z.number().min(5).max(90),
  caps: z.tuple([z.string(), z.string(), z.string(), z.string(), z.string()]),
  streamUrl: z.string().optional(),
  event: z.string().optional(),
  comment: z.string().optional(),
});
