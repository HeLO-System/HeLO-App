import { Winrate } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export const fetchWinrate = async (clanId: string): Promise<Winrate> => {
  const { data } = await axios.get<Winrate>(
    `/api/statistics/winrate/${clanId}`
  );
  return data;
};

export const useWinrate = (params: string): UseQueryResult<Winrate> =>
  useQuery(["statistics", "winrate", params], () => fetchWinrate(params));
