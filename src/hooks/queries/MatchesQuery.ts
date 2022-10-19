import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CustomUseQueryOptions, Map, Match } from "@types";
import axios from "axios";

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

export interface MatchesResponse {
  matches: Match[];
  meta: {
    total_count: number;
    count: number;
    offset: number;
  };
}

function isMatchesResponse(
  object: Match[] | MatchesResponse
): object is MatchesResponse {
  return "meta" in object;
}

export const fetchMatches = async (
  params?: MatchesParams
): Promise<MatchesResponse> =>
  axios
    .get<MatchesResponse | Match[]>("/helo-api/matches", { params })
    .then(({ data }) => {
      if (isMatchesResponse(data)) {
        return data as MatchesResponse;
      }
      return {
        matches: data as Match[],
        meta: {
          offset: 0,
          count: data.length,
          total_count: 0,
        },
      };
    });

export const useMatches = <T = MatchesResponse>(
  params?: MatchesParams,
  options?: CustomUseQueryOptions<MatchesResponse, T>
): UseQueryResult<T> =>
  useQuery(["matches", params], () => fetchMatches(params), options);
