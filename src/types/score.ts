export type Score = {
  _id: {
    $oid: string;
  };
  clan: string;
  match_id: string;
  score: number;
  _created_at: {
    $date: number;
  };
  num_matches: number;
};
