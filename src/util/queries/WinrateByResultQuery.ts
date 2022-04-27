import { CustomUseQueryOptions, Factions, Map, WinrateByResult } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export type WinrateByResultParams = {
  map?: Map;
  side?: Factions;
};

export const fetchWinrateByResult = async (
  clanId: string,
  params?: WinrateByResultParams
): Promise<WinrateByResult> => {
  const { data } = await axios.get<WinrateByResult>(
    `/helo-api/statistics/result_types/${clanId}`,
    { params }
  );
  return data;
};

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
