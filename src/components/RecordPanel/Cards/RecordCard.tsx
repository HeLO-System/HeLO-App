import classNames from "classnames";
import { FC } from "react";

interface RecordCardProps {
  className?: string;
}

export const RecordCard: FC<RecordCardProps> = ({ className, children }) => (
  <div
    className={classNames(
      "bg-e-2 rounded-lg hover:scale-105 shadow-elevation-1 text-font",
      className
    )}
  >
    {children}
  </div>
);
