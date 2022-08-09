import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Clan, CustomUseQueryOptions, Match } from "@types";
import axios from "axios";

export type SearchQueryParams<T> = {
  q: string;
  type: "clan" | "match";
  limit?: number;
  offset?: number;
  sort_by?: keyof T;
  desc?: boolean;
};

export const fetchSearch = async <T>(
  params?: SearchQueryParams<T>
): Promise<T[]> =>
  axios
    .get<T[]>("/helo-api/search", {
      params,
    })
    .then(({ data }) => data);

export const useSearch = <T extends Clan | Match>(
  params?: SearchQueryParams<T>,
  options?: CustomUseQueryOptions<T[]>
): UseQueryResult<T[]> =>
  useQuery(["search", params], () => fetchSearch<T>(params), options);
