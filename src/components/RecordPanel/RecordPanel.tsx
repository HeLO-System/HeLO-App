import { ClanCard } from "@components/ClanCard";
import { GlassPanel } from "@components/GlassPanel";
import { Clan } from "@types";
import classNames from "classnames";
import { FC } from "react";

interface RecordPanelProps {
  title: string;
  clans?: Clan[];
  className?: string;
}

export const RecordPanel: FC<RecordPanelProps> = ({
  title,
  clans,
  className,
}) => (
  <GlassPanel title={title} className={classNames(className, "p-5")}>
    <div className="grid gap-x-10 gap-y-5 h-max md:grid-cols-5 grid-cols-1 ">
      {!clans?.length ? (
        <>
          <ClanCard />
          <ClanCard />
          <ClanCard />
          <ClanCard />
          <ClanCard />
        </>
      ) : (
        clans.map((clan) => <ClanCard clan={clan} key={clan.tag} />)
      )}
    </div>
  </GlassPanel>
);
