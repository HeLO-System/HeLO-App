import { Factions } from "./factions";
import { Map } from "./map";

export type Match = {
  _id: {
    $oid: string;
  };
  match_id: string;
  clans1_ids: string[];
  clans2_ids: string[];
  player_dist1: number[];
  player_dist2: number[];
  side1: Factions;
  side2: Factions;
  caps1: number;
  caps2: number;
  players: number;
  date: {
    $date: number;
  };
  factor: number;
  conf1: string;
  conf2: string;
  recalculate: boolean;
  score_posted: boolean;
  map: Map;
  duration: number;
  event: string;
  strongpoints: [string, string, string, string, string];
  stream: string;
};

export type SortedMatch = Match & {
  axis_clan_ids: string[];
  allies_clan_ids: string[];
  axis_player_dist: number[];
  allies_player_dist: number[];
  axis_caps: number;
  allies_caps: number;
  axis_conf: string;
  allies_conf: string;
};
