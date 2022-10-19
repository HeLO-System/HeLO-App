/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { MatchLinkCell } from "@components/LinkCell";
import { FormattedMatch, MatchesTable } from "@components/MatchesTable";
import { useClanTags } from "@hooks";
import { FC } from "react";
import { TableColumn } from "react-data-table-component";

const getColumns = (
  getTag: (id: string, fallback?: string) => string
): TableColumn<FormattedMatch>[] => [
  {
    name: "Name",
    selector: (match) => match.match_id,
    sortable: true,
    cell: (match) => (
      <MatchLinkCell tag={match.match_id} value={match.match_id} />
    ),
    id: "match_id",
  },
  {
    name: "Date",
    selector: (match) => match.formattedDate,
    sortable: true,
    cell: (match) => (
      <MatchLinkCell tag={match.match_id} value={match.formattedDate} />
    ),
    id: "date",
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
    id: "clans1_ids",
  },
  {
    name: "Faction 1",
    selector: (match) => match.side1,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.side1} />,
  },
  {
    name: "Caps 1",
    selector: (match) => match.caps1,
    sortable: true,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.caps1} />,
    id: "caps1",
  },
  {
    name: "Caps 2",
    selector: (match) => match.caps2,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.caps2} />,
  },
  {
    name: "Faction 2",
    selector: (match) => match.side1,
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
    id: "clans2_ids",
  },
  {
    name: "Map",
    selector: (match) => match.map,
    cell: (match) => <MatchLinkCell tag={match.match_id} value={match.map} />,
  },
  {
    name: "Duration",
    selector: (match) => match.duration,
    cell: (match) => (
      <MatchLinkCell tag={match.match_id} value={match.duration} />
    ),
  },
];

const MatchesList: FC = () => {
  const { getTag } = useClanTags();

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel title="Matches" className="p-4 mx-10 pb-8 mb-20">
        <MatchesTable pagination columns={getColumns(getTag)} />
      </GlassPanel>
    </div>
  );
};

export default MatchesList;
