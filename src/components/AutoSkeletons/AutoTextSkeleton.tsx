import classNames from "classnames";
import { FC, ReactNode } from "react";

interface AutoTextSkeletonProps {
  className?: string;
  children?: ReactNode;
}

export const AutoTextSkeleton: FC<AutoTextSkeletonProps> = ({
  className,
  children,
}) => (
  <div
    className={classNames(className, {
      "animate-pulse bg-border rounded-md": !children,
    })}
  >
    {children || "\u200B"}
  </div>
);
