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
  <div className={classNames(className, "rounded-lg", "glassmorphism")}>
    {title && <PanelTitle title={title} className="mb-5" />}
    {children}
  </div>
);
