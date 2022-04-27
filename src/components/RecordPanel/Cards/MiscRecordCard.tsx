import { FC, ReactNode } from "react";
import { RecordCard } from "./RecordCard";

interface MiscRecordCardProps {
  title: string | ReactNode;
  record: string | ReactNode;
  footer: string | ReactNode;
}

export const MiscRecordCard: FC<MiscRecordCardProps> = ({
  title,
  record,
  footer,
}) => (
  <RecordCard className="flex flex-col">
    <div className="text-lg text-center">{title}</div>
    <div className="text-2xl text-accent">{record}</div>
    <div>{footer}</div>
  </RecordCard>
);
