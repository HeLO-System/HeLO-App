import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CustomUseQueryOptions, Score } from "@types";
import axios from "axios";

export type ScoreQueryParams = {
  select?: (keyof Score)[];
  clan_id?: string;
  match_id?: string;
  num_matches?: number;
  num_from?: number;
  num_to?: number;
  score?: number;
  score_from?: number;
  score_to?: number;
  limit?: number;
  offset?: number;
  sort_by?: keyof Score;
  desc?: boolean;
};

export const fetchScore = async (params?: ScoreQueryParams): Promise<Score[]> =>
  axios
    .get<Score[]>("/helo-api/scores", {
      params,
    })
    .then(({ data }) => data);

export const useScore = (
  params?: ScoreQueryParams,
  options?: CustomUseQueryOptions<Score[]>
): UseQueryResult<Score[]> =>
  useQuery(["search", params], () => fetchScore(params), options);
