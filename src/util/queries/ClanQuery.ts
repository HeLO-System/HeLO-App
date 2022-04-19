import { Clan } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export const fetchClan = async (params: string): Promise<Clan> => {
  const { data } = await axios.get<Clan>(`/api/clan/${params}`);
  return data;
};

export const useClan = (params: string): UseQueryResult<Clan> =>
  useQuery(["clan", params], () => fetchClan(params));
