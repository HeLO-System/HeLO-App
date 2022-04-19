import classNames from "classnames";
import { FC } from "react";

interface PanelTitleProps {
  title: string;
  className?: string;
}

export const PanelTitle: FC<PanelTitleProps> = ({ title, className }) => (
  <div className={classNames("text-font flex items-center ", className)}>
    <hr className="w-10 flex-1 md:flex-none" />
    <span className="mx-5 text-xl">{title}</span>
    <hr className="flex-1" />
  </div>
);
