import { FCC } from "@types";
import classNames from "classnames";

interface RecordCardProps {
  className?: string;
}

export const RecordCard: FCC<RecordCardProps> = ({ className, children }) => (
  <div
    className={classNames(
      "bg-e-2 rounded-lg hover:scale-105 shadow-elevation-1 text-font",
      className
    )}
  >
    {children}
  </div>
);
