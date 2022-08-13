import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CustomUseQueryOptions, Match, SortedMatch } from "@types";
import axios from "axios";

const playerDist = (playersDist: number[], players: number): number[] =>
  playersDist.length ? playersDist : [players];

export const fetchMatch = async (matchId: string): Promise<SortedMatch> =>
  axios.get<Match>(`/helo-api/match/${matchId}`).then(({ data }) => {
    if (data.side1 === "Allies") {
      return {
        ...data,
        axis_clan_ids: data.clans2_ids,
        allies_clan_ids: data.clans1_ids,
        axis_player_dist: playerDist(data.player_dist2, data.players),
        allies_player_dist: playerDist(data.player_dist1, data.players),
        axis_caps: data.caps2,
        allies_caps: data.caps1,
        axis_conf: data.conf2,
        allies_conf: data.conf1,
      };
    }
    return {
      ...data,
      axis_clan_ids: data.clans1_ids,
      allies_clan_ids: data.clans2_ids,
      axis_player_dist: playerDist(data.player_dist1, data.players),
      allies_player_dist: playerDist(data.player_dist2, data.players),
      axis_caps: data.caps1,
      allies_caps: data.caps2,
      axis_conf: data.conf1,
      allies_conf: data.conf2,
    };
  });

export const useMatch = <T = SortedMatch>(
  matchId: string,
  options?: CustomUseQueryOptions<Match, T>
): UseQueryResult<T> =>
  useQuery(["match", matchId], () => fetchMatch(matchId), options);
