import classNames from "classnames";
import { FC, ReactNode } from "react";
import { PanelTitle } from "./PanelTitle";

interface GlassPanelProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export const GlassPanel: FC<GlassPanelProps> = ({
  title,
  className,
  children,
  titleClassName,
}) => (
  <div className={classNames("rounded-lg", "glassmorphism", className)}>
    {title && (
      <PanelTitle
        title={title}
        className={classNames(titleClassName, "mb-5")}
      />
    )}
    {children}
  </div>
);
