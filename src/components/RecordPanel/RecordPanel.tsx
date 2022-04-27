import { GlassPanel } from "@components/GlassPanel";
import classNames from "classnames";
import { FC } from "react";

export const DEFAULT_RECORD_COUNT = 5;

interface RecordPanelProps {
  title: string;
  className?: string;
}

export const RecordPanel: FC<RecordPanelProps> = ({
  title,
  className,
  children,
}) => (
  <GlassPanel
    title={title}
    className={classNames(className, "mx-10 lg:mx-auto p-4 lg:min-w-[1000px]")}
  >
    <div className="grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-10 gap-y-5">
      {children}
    </div>
  </GlassPanel>
);
