import { ClanCard } from "@components/ClanCard";
import { Clan } from "@types";
import classNames from "classnames";
import { FC } from "react";
import { RecordPanelTitle } from "./RecordPanelTitle";

interface RecordPanelProps {
  title: string;
  clans: Clan[];
  className?: string;
}

export const RecordPanel: FC<RecordPanelProps> = ({
  title,
  clans,
  className,
}) => (
  <div
    className={classNames(
      "grid mx-8 rounded-lg gap-x-10 gap-y-5 p-5 h-max md:grid-cols-5 grid-cols-1 ",
      "glassmorphism",
      className
    )}
  >
    <RecordPanelTitle title={title} className="col-span-full" />
    {!clans.length ? (
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
);
