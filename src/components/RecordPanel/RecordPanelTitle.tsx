import classNames from "classnames";
import { FC } from "react";

interface RecordPanelTitleProps {
  title: string;
  className?: string;
}

export const RecordPanelTitle: FC<RecordPanelTitleProps> = ({
  title,
  className,
}) => (
  <div className={classNames("text-font flex items-center ", className)}>
    <hr className="w-10" />
    <span className="mx-5 text-xl">{title}</span>
    <hr className="flex-1" />
  </div>
);
