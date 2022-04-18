import { Factions } from "./factions";

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
  factor: 1;
  conf1: string;
  conf2: string;
  recalculate: boolean;
  score_posted: boolean;
  map: string;
};
