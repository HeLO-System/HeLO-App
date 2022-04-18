import classNames from "classnames";
import { FC, ReactNode } from "react";
import { PanelTitle } from "./PanelTitle";

interface GlassPanelProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

export const GlassPanel: FC<GlassPanelProps> = ({
  title,
  className,
  children,
}) => (
  <div className={classNames("rounded-lg p-5 ", "glassmorphism", className)}>
    {title && <PanelTitle title={title} className="mb-5" />}
    {children}
  </div>
);
