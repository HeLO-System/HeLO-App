/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { LinkCell } from "@components/LinkCell";
import { useClans } from "@queries";
import { Clan } from "@types";
import React, { FC, ReactNode } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Discord from "../../../public/Discord-Logo-White.svg";
import Logo from "../../../public/helo.svg";

const columns: TableColumn<Clan>[] = [
  {
    cell: (clan): ReactNode =>
      clan.icon ? (
        <img
          src={clan?.icon}
          className="h-8 w-8 object-contain"
          alt="Clan Logo"
        />
      ) : (
        <Logo className="h-8 w-8 fill-black" />
      ),
    width: "64px",
  },
  {
    name: "Tag",
    selector: (clan) => clan.tag,
    sortable: true,
    cell: (clan) => <LinkCell tag={clan.tag} value={clan.tag} />,
  },
  {
    name: "Name",
    selector: (clan) => clan.name,
    sortable: true,
    cell: (clan) => <LinkCell tag={clan.tag} value={clan.name} />,
  },
  {
    name: "Score",
    selector: (clan) => clan.score,
    sortable: true,
    id: "score",
    cell: (clan) => <LinkCell tag={clan.tag} value={clan.score} />,
  },
  {
    name: "Matches",
    selector: (clan) => clan.num_matches,
    sortable: true,
    cell: (clan) => <LinkCell tag={clan.tag} value={clan.num_matches} />,
  },
  {
    cell: (clan): ReactNode =>
      clan.invite && (
        <a href={clan.invite} target="_blank" rel="noreferrer">
          <Discord className="h-8 w-8 object-contain" alt="Discord" />
        </a>
      ),
    width: "64px",
  },
];

const ClanList: FC = () => {
  const { data: clans } = useClans();

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel title="Clans" className="p-4 mx-10 pb-8">
        <DataTable
          columns={columns}
          data={clans || []}
          defaultSortFieldId="score"
          defaultSortAsc={false}
          theme="dark"
        />
      </GlassPanel>
    </div>
  );
};

export default ClanList;
