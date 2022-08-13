import classNames from "classnames";
import { FC, ReactNode } from "react";
import { PanelTitle } from "./PanelTitle";

interface GlassPanelProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  backTitle?: string;
}

export const GlassPanel: FC<GlassPanelProps> = ({
  title,
  className,
  children,
  titleClassName,
  backTitle,
}) => (
  <div className={classNames("rounded-lg", "glassmorphism", className)}>
    {title && (
      <PanelTitle
        title={title}
        backTitle={backTitle}
        className={classNames(titleClassName, "mb-5")}
      />
    )}
    {children}
  </div>
);
