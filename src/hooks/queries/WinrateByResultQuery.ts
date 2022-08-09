import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CustomUseQueryOptions, Factions, Map, WinrateByResult } from "@types";
import axios from "axios";

export type WinrateByResultParams = {
  map?: Map;
  side?: Factions;
};

export const fetchWinrateByResult = async (
  clanId: string,
  params?: WinrateByResultParams
): Promise<WinrateByResult> =>
  axios
    .get<WinrateByResult>(`/helo-api/statistics/result_types/${clanId}`, {
      params,
    })
    .then(({ data }) => data);

export const useWinrateByResult = <T = WinrateByResult>(
  clanId: string,
  params?: WinrateByResultParams,
  options?: CustomUseQueryOptions<WinrateByResult, T>
): UseQueryResult<T> =>
  useQuery<WinrateByResult, unknown, T>(
    ["statistics", "result_types", clanId, params],
    () => fetchWinrateByResult(clanId, params),
    options
  );
