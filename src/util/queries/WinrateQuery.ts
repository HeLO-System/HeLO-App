import { CustomUseQueryOptions, Factions, Map, Winrate } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export type WinrateParams = {
  map?: Map;
  side?: Factions;
};

export const fetchWinrate = async (
  clanId: string,
  params?: WinrateParams
): Promise<Winrate> => {
  const { data } = await axios.get<Winrate>(
    `/helo-api/statistics/winrate/${clanId}`,
    { params }
  );
  return data;
};

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
