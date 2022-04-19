/* eslint-disable @typescript-eslint/no-explicit-any */
import { Match } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export type MatchesParams = {
  select?: string;
  match_id?: string;
  clan_ids?: string;
  caps?: number;
  caps_from?: number;
  map?: string;
  duration_from?: number;
  duration_to?: number;
  factor?: number;
  conf?: string;
  event?: string;
  date?: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
  sort_by?: string;
  desc?: boolean;
};

export const fetchMatches = async (params?: any): Promise<Match[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.get<Match[]>("/api/matches", { params });
  return data;
};

export const useMatches = (params?: any): UseQueryResult<Match[]> =>
  useQuery(["matches", params], () => fetchMatches(params));
