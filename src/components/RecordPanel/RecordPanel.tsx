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
      "grid grid-cols-5 w-1/2 rounded-lg bg-e-1 gap-x-10 gap-y-5 p-5 h-max ",
      className
    )}
    style={{
      gridTemplateColumns: `repeat(${clans?.length}, minmax(0, 1fr))`,
    }}
  >
    <RecordPanelTitle title={title} className="col-span-full" />
    {clans.map((clan) => (
      <ClanCard clan={clan} key={clan.tag} />
    ))}
  </div>
);
