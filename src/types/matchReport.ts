import {
  MatchReportClanSchema,
  MatchReportSchema,
  MatchResults,
  MatchTypes,
} from "@schemas";
import { z } from "zod";

export type MatchType = z.infer<typeof MatchTypes>;
export type MatchResult = z.infer<typeof MatchResults>;

export type MatchReportClan = z.infer<typeof MatchReportClanSchema>;

export type MatchReport = z.infer<typeof MatchReportSchema>;
