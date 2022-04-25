import { Clan, CustomUseQueryOptions } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

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

export const fetchClans = async (
  params?: ClansQueryParams
): Promise<Clan[]> => {
  const { data } = await axios.get<Clan[]>("/api/clans", { params });
  return data;
};

export const useClans = <T = Clan[]>(
  params?: ClansQueryParams,
  options?: CustomUseQueryOptions<Clan[], T>
): UseQueryResult<T> =>
  useQuery(["clana", params], () => fetchClans(params), options);
