import { Clan } from "@types";
import { range } from "@util";
import { FC } from "react";
import { ClanCard } from "./Cards";
import { DEFAULT_RECORD_COUNT, RecordPanel } from "./RecordPanel";

interface RecordClanPanelProps {
  title: string;
  clans?: Clan[];
  className?: string;
  records?: number;
}

export const RecordClanPanel: FC<RecordClanPanelProps> = ({
  title,
  clans,
  className,
  records,
}) => (
  <RecordPanel title={title} className={className}>
    {range(records || DEFAULT_RECORD_COUNT).map((index) => (
      <ClanCard key={index} clan={clans && clans[index]} />
    ))}
  </RecordPanel>
);
