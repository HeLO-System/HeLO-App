import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CustomUseQueryOptions, Factions, Map, Winrate } from "@types";
import axios from "axios";

export type WinrateParams = {
  map?: Map;
  side?: Factions;
};

export const fetchWinrate = async (
  clanId: string,
  params?: WinrateParams
): Promise<Winrate> =>
  axios
    .get<Winrate>(`/helo-api/statistics/winrate/${clanId}`, {
      params,
    })
    .then(({ data }) => data);

export const useWinrate = <T = Winrate>(
  clanId: string,
  params?: WinrateParams,
  options?: CustomUseQueryOptions<Winrate, T>
): UseQueryResult<T> =>
  useQuery<Winrate, unknown, T>(
    ["statistics", "winrate", clanId, params],
    () => fetchWinrate(clanId, params),
    options
  );
