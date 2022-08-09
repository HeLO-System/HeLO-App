/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@components/BackButton";
import { ClanIcon } from "@components/ClanIcon";
import { GlassPanel } from "@components/GlassPanel";
import { ClanLinkCell } from "@components/LinkCell";
import { useClans } from "@queries";
import { Clan } from "@types";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Discord from "../../../public/Discord-Logo-White.svg";

const columns: TableColumn<Clan>[] = [
  {
    cell: (clan): ReactNode => (
      <div className="relative h-8 w-8">
        <ClanIcon
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          imageProps={{ height: 128, width: 128, quality: 1 }}
          logoClassName="fill-black"
          icon={clan?.icon}
        />
      </div>
    ),
    width: "64px",
  },
  {
    name: "Tag",
    selector: (clan) => clan.tag,
    sortable: true,
    cell: (clan) => <ClanLinkCell tag={clan.tag} value={clan.tag} />,
  },
  {
    name: "Name",
    selector: (clan) => clan.name,
    sortable: true,
    cell: (clan) => <ClanLinkCell tag={clan.tag} value={clan.name} />,
  },
  {
    name: "Score",
    selector: (clan) => clan.score,
    sortable: true,
    id: "score",
    cell: (clan) => <ClanLinkCell tag={clan.tag} value={clan.score} />,
  },
  {
    name: "Matches",
    selector: (clan) => clan.num_matches,
    sortable: true,
    cell: (clan) => <ClanLinkCell tag={clan.tag} value={clan.num_matches} />,
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
  const router = useRouter();
  const { data: clans, isLoading } = useClans();

  useEffect(() => {
    router.prefetch("/clan/[pid]");
  }, [router]);

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel title="Clans" className="p-4 mx-10 pb-8 mb-20">
        <DataTable
          columns={columns}
          data={clans || []}
          defaultSortFieldId="score"
          defaultSortAsc={false}
          theme="dark"
          progressPending={isLoading}
        />
      </GlassPanel>
    </div>
  );
};

export default ClanList;
