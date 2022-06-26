import { Clan, CustomUseQueryOptions } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export const fetchClan = async (clanId: string): Promise<Clan> => {
  const { data } = await axios.get<Clan>(`/helo-api/clan/${clanId}`);
  return data;
};

export const useClan = <T = Clan>(
  clanId: string,
  options?: CustomUseQueryOptions<Clan, T>
): UseQueryResult<T> =>
  useQuery(["clan", clanId], () => fetchClan(clanId), options);
