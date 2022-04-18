export type Clan = {
  _id: { $oid: string };
  tag: string;
  name: string;
  score: number;
  num_matches: number;
  flag?: string;
  invite?: string;
  icon?: string;
  alt_tags?: string[];
  last_updated?: string;
};
