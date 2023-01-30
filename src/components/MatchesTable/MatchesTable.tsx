/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable camelcase */
import { GlassPanel } from "@components/GlassPanel";
import { MatchLinkCell } from "@components/LinkCell";
import { useClanTags } from "@hooks";
import { useMatches } from "@queries";
import { Factions, Match } from "@types";
import { DateTime } from "luxon";
import { FC, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const DEFAULT_PER_PAGE = 25;
const CAPS_TO_WIN = 3;

export type FormattedMatch = Match & {
  id: string;
  allies: string[];
  enemies: string[];
  side: Factions;
  enemy: Factions;
  caps: number;
  formattedDate: string;
  formattedDuration: string;
  offensive?: boolean;
  attacker?: boolean;
};

const matchFormatter = (match: Match, clanId: string): FormattedMatch => {
  const formattedMatch: Partial<FormattedMatch> = {
    id: match._id.$oid,
    formattedDate: DateTime.fromMillis(match.date.$date).toISODate(),
    formattedDuration: `${match.duration} min`,
    ...match,
  };
  formattedMatch.offensive = match.offensive !== undefined ? match.offensive : false;
  if (match.clans1_ids.includes(clanId)) {
    formattedMatch.allies = match.clans1_ids.filter((f) => f !== clanId);
    formattedMatch.enemies = match.clans2_ids;
    formattedMatch.side = match.side1;
    formattedMatch.enemy = match.side2;
    formattedMatch.caps = match.caps1;
    formattedMatch.attacker = formattedMatch.offensive ? true : false;
  } else {
    formattedMatch.allies = match.clans2_ids.filter((f) => f !== clanId);
    formattedMatch.enemies = match.clans1_ids;
    formattedMatch.side = match.side2;
    formattedMatch.enemy = match.side1;
    formattedMatch.caps = match.caps2;
    formattedMatch.attacker = false;
  }
  return formattedMatch as FormattedMatch;
};

export interface MatchesTableProps {
  clanId?: string;
  pagination?: boolean;
  enabled?: boolean;
  columns?: TableColumn<FormattedMatch>[];
}

export const MatchesTable: FC<MatchesTableProps> = ({
  clanId,
  pagination,
  enabled,
  columns,
}) => {
  const [tableMeta, setTableMeta] = useState<{
    sortBy: keyof Match;
    desc: boolean;
    page: number;
    perPage: number;
  }>({
    sortBy: "date",
    page: 1,
    perPage: DEFAULT_PER_PAGE,
    desc: true,
  });

  const { data: matchData, isLoading } = useMatches(
    {
      clan_ids: clanId,
      desc: tableMeta.desc,
      limit: tableMeta.perPage,
      offset: (tableMeta.page - 1) * tableMeta.perPage,
      sort_by: tableMeta.sortBy,
    },
    {
      enabled,
      select: (data) => ({
        matches: data.matches.map((match) =>
          matchFormatter(match, clanId as string)
        ),
        meta: data.meta,
      }),
    }
  );
  const { getTag } = useClanTags();
  const setResult = (match) => {
    let result = "Defeat";
    if (
      (match.offensive && (match.attacker ? match.caps == 5 : match.caps >= 0)) ||
       (!match.offensive && match.caps >= CAPS_TO_WIN)
    ) {
      result = "Victory"
    }
    return result;
  };

  const defaultColumns: TableColumn<FormattedMatch>[] = [
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
    (clanId ? {
      name: "Result",
      selector: (match) => setResult(match),
    } : null),
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
      cell: (match) => (
        <MatchLinkCell tag={match.match_id} value={match.side1} />
      ),
    },
    {
      name: "Caps 1",
      selector: (match) => match.caps1,
      sortable: true,
      cell: (match) => (
        <MatchLinkCell tag={match.match_id} value={match.caps1} />
      ),
      id: "caps1",
    },
    {
      name: "Caps 2",
      selector: (match) => match.caps2,
      cell: (match) => (
        <MatchLinkCell tag={match.match_id} value={match.caps2} />
      ),
    },
    {
      name: "Faction 2",
      selector: (match) => match.side1,
      cell: (match) => (
        <MatchLinkCell tag={match.match_id} value={match.side2} />
      ),
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
    {
      name: "Mode",
      selector: (match) => {
        let factionRe = /(Allie)s/;
        let mode = "Warfare";
        if (match.offensive) {
          mode = "Offensive";
          if (match.attacker && match?.side) {
	    mode = `${match.side.replace(factionRe, "$1d")} Offensive`;
          } else if (!match.attacker && match?.enemy) {
	    mode = `${match.enemy.replace(factionRe, "$1d")} Offensive`;
          }
        }
        return mode;
      },
      sortable: true,
    },
  ].filter(Boolean);

  const handlePageChange = (page: number) => {
    setTableMeta({ ...tableMeta, page });
  };

  const handlePerRowsChange = (perPage: number) => {
    setTableMeta({ ...tableMeta, perPage });
  };

  const handleSort = (
    selectedColumn: TableColumn<FormattedMatch>,
    sortDirection: "desc" | "asc"
  ) => {
    setTableMeta({
      ...tableMeta,
      sortBy: selectedColumn.id as keyof Match,
      desc: sortDirection === "desc",
    });
  };

  return (
    <GlassPanel title="Match Archive" className="p-4 mx-10">
      <DataTable
        columns={columns || defaultColumns}
        data={matchData?.matches || []}
        defaultSortFieldId="date"
        defaultSortAsc={false}
        theme="dark"
        pagination={pagination}
        paginationServer={pagination}
        paginationTotalRows={matchData?.meta.total_count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressPending={isLoading}
        paginationPerPage={DEFAULT_PER_PAGE}
        paginationRowsPerPageOptions={[25, 50, 100, 500, 1000]}
        onSort={handleSort}
      />
    </GlassPanel>
  );
};
