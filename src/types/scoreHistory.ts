export type ScoreHistory = {
  _id: { $oid: string };
  clan: string;
  score: string;
  num_matches: string;
  match_id: string;
  date: string;
  _created_at: {
    $date: string;
  };
};
