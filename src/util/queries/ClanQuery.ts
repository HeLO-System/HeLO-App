import { Clan } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export const fetchClan = async (clanId: string): Promise<Clan> => {
  const { data } = await axios.get<Clan>(`/api/clan/${clanId}`);
  return data;
};

export const useClan = (clanId: string): UseQueryResult<Clan> =>
  useQuery(["clan", clanId], () => fetchClan(clanId));
