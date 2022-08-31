/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { MatchLinkCell } from "@components/LinkCell";
import { useClanTags } from "@hooks";
import { useMatches } from "@queries";
import { Match } from "@types";
import { DateTime } from "luxon";
import { FC } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const getColumns = (
  getTag: (id: string, fallback?: string) => string
): TableColumn<Match>[] => [
  {
    name: "Id",
    selector: (match) => match.match_id,
    sortable: true,
    cell: (match) => (
      <MatchLinkCell tag={match.match_id} value={match.match_id} />
    ),
  },
  {
    name: "Date",
    selector: (match) => match.date.$date,
    sortable: true,
    cell: (match) => (
      <MatchLinkCell
        tag={match.match_id}
        value={DateTime.fromMillis(match.date.$date).toISODate()}
      />
    ),
  },
  {
    name: "Side 1",
    selector: (match) => match.clans1_ids[0],
    sortable: true,
    cell: (match) => (
      <MatchLinkCell
        tag={match.match_id}
        value={match.clans1_ids.map((clan) => getTag(clan, "-")).join(", ")}
      />
    ),
  },
  {
    name: "Faction 1",
    selector: (match) => match.side1,
    sortable: true,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.side1} />,
  },
  {
    name: "Caps 1",
    selector: (match) => match.caps1,
    sortable: true,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.caps1} />,
  },
  {
    name: "Caps 2",
    selector: (match) => match.caps2,
    sortable: true,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.caps2} />,
  },
  {
    name: "Faction 2",
    selector: (match) => match.side1,
    sortable: true,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.side2} />,
  },
  {
    name: "Side 2",
    selector: (match) => match.clans2_ids[0],
    sortable: true,
    cell: (match) => (
      <MatchLinkCell
        tag={match.match_id}
        value={match.clans2_ids.map((clan) => getTag(clan, "-")).join(", ")}
      />
    ),
  },
  {
    name: "Map",
    selector: (match) => match.map,
    sortable: true,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.map} />,
  },
  {
    name: "Duration",
    selector: (match) => match.duration,
    sortable: true,
    cell: (match) => (
      <MatchLinkCell tag={match.match_id} value={match.duration} />
    ),
  },
];

const MatchesList: FC = () => {
  const { data: matches, isLoading } = useMatches();
  const { getTag } = useClanTags();

  const columns = getColumns(getTag);

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel title="Matches" className="p-4 mx-10 pb-8 mb-20">
        <DataTable
          columns={columns}
          data={matches?.matches || []}
          defaultSortFieldId="score"
          defaultSortAsc={false}
          theme="dark"
          progressPending={isLoading}
        />
      </GlassPanel>
    </div>
  );
};

export default MatchesList;
