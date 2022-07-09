import { CustomUseQueryOptions, Match } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export const fetchMatch = async (matchId: string): Promise<Match> =>
  axios.get<Match>(`/helo-api/clan/${matchId}`).then(({ data }) => data);

export const useMatch = <T = Match>(
  matchId: string,
  options?: CustomUseQueryOptions<Match, T>
): UseQueryResult<T> =>
  useQuery(["clan", matchId], () => fetchMatch(matchId), options);
