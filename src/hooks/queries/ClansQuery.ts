import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Clan, CustomUseQueryOptions } from "@types";
import axios from "axios";

export type ClansQueryParams = {
  select?: string;
  tag?: string;
  name?: string;
  num_matches?: number;
  score_from?: number;
  score_to?: number;
  limit?: number;
  offset?: number;
  sort_by?: keyof Clan;
  desc?: boolean;
};

export const fetchClans = async (params?: ClansQueryParams): Promise<Clan[]> =>
  axios.get<Clan[]>("/helo-api/clans", { params }).then(({ data }) => data);

export const useClans = <T = Clan[]>(
  params?: ClansQueryParams,
  options?: CustomUseQueryOptions<Clan[], T>
): UseQueryResult<T> =>
  useQuery(["clans", params], () => fetchClans(params), options);
