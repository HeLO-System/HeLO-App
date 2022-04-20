import { Factions, Map, Winrate } from "@types";
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
    `/api/statistics/winrate/${clanId}`,
    { params }
  );
  return data;
};

export const useWinrate = (
  clanId: string,
  params?: WinrateParams
): UseQueryResult<Winrate> =>
  useQuery(["statistics", "winrate", clanId, params], () =>
    fetchWinrate(clanId, params)
  );
