import { GlassPanel } from "@components/GlassPanel";
import { useMatches } from "@queries";
import { Factions, Match } from "@types";
import { useClanTags } from "@util";
import { DateTime } from "luxon";
import { FC } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

type FormattedMatch = {
  id: string;
  name: string;
  allies: string[];
  enemies: string[];
  side: Factions;
  caps: number;
  map: string;
  players: number;
  date: string;
  duration: string;
  factor: number;
};

const matchFormatter = (
  {
    match_id: name,
    map,
    players,
    factor,
    clans1_ids,
    clans2_ids,
    ...match
  }: Match,
  clanId: string
): FormattedMatch => {
  const formattedMatch: Partial<FormattedMatch> = {
    id: match._id.$oid,
    name,
    map,
    players,
    date: DateTime.fromMillis(match.date.$date).toISODate(),
    duration: `${match.duration} min`,
    factor,
  };
  if (clans1_ids.includes(clanId)) {
    formattedMatch.allies = clans1_ids.filter((f) => f !== clanId);
    formattedMatch.enemies = clans2_ids;
    formattedMatch.side = match.side1;
    formattedMatch.caps = match.caps1;
  } else {
    formattedMatch.allies = clans2_ids.filter((f) => f !== clanId);
    formattedMatch.enemies = clans1_ids;
    formattedMatch.side = match.side2;
    formattedMatch.caps = match.caps2;
  }
  return formattedMatch as FormattedMatch;
};

const columns: TableColumn<FormattedMatch>[] = [
  {
    name: "Name",
    selector: (match) => match.name,
    sortable: true,
  },
  {
    name: "Date",
    selector: (match) => match.date,
    sortable: true,
    id: "date",
  },
  {
    name: "Allies",
    selector: (match) => match.allies.join(", "),
    sortable: true,
    cell: (match) => <ClanTagsList clanIds={match.allies} />,
  },
  {
    name: "Enemies",
    selector: (match) => match.allies.join(", "),
    sortable: true,
    cell: (match) => <ClanTagsList clanIds={match.enemies} />,
  },
  {
    name: "Side",
    selector: (match) => match.side,
    sortable: true,
  },
  {
    name: "Caps",
    selector: (match) => match.caps,
    sortable: true,
  },
  {
    name: "Map",
    selector: (match) => match.map,
    sortable: true,
  },
  {
    name: "Players",
    selector: (match) => match.players,
    sortable: true,
  },
  {
    name: "Duration",
    selector: (match) => match.duration,
    sortable: true,
  },
  {
    name: "Factor",
    selector: (match) => match.factor,
    sortable: true,
  },
];
export interface MatchesTableProps {
  clanId?: string;
}

export const MatchesTable: FC<MatchesTableProps> = ({ clanId }) => {
  const { data: matches } = useMatches<FormattedMatch[]>(
    { clan_ids: clanId },
    {
      enabled: !!clanId,
      select: (data) =>
        data.map((match) => matchFormatter(match, clanId as string)),
    }
  );

  return (
    <GlassPanel title="Match Archive" className="p-4 mx-10">
      <DataTable
        columns={columns}
        data={matches || []}
        defaultSortFieldId="date"
        defaultSortAsc={false}
        theme="dark"
      />
    </GlassPanel>
  );
};

const ClanTagsList: FC<{ clanIds: string[] }> = ({ clanIds }) => {
  const { getTag } = useClanTags();
  return <div>{clanIds.map((clanId) => getTag(clanId)).join(", ")}</div>;
};
