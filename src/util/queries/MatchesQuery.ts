import { Map, Match } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export type MatchesParams = {
  select?: string;
  match_id?: string;
  clan_ids?: string;
  caps?: number;
  caps_from?: number;
  map?: Map;
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
  const { data } = await axios.get<Match[]>("/api/matches", { params });
  return data;
};

export const useMatches = (params?: any): UseQueryResult<Match[]> =>
  useQuery(["matches", params], () => fetchMatches(params));
