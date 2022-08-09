import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Clan, CustomUseQueryOptions } from "@types";
import axios from "axios";

export const fetchClan = async (clanId: string): Promise<Clan> =>
  axios.get<Clan>(`/helo-api/clan/${clanId}`).then(({ data }) => data);

export const useClan = <T = Clan>(
  clanId: string,
  options?: CustomUseQueryOptions<Clan, T>
): UseQueryResult<T> =>
  useQuery(["clan", clanId], () => fetchClan(clanId), options);
