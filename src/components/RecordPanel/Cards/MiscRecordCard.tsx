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
  <RecordCard className="flex flex-col justify-between py-4 gap-4 min-h-[12rem]">
    <div className="text-xl text-center">{title}</div>
    <div className="text-2xl text-center text-accent">{record}</div>
    <div className="text-center text-lg">{footer}</div>
  </RecordCard>
);
