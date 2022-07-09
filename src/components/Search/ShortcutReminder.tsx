import classNames from "classnames";
import { FC } from "react";

type ShortCutReminderProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
};

export const ShortCutReminder: FC<ShortCutReminderProps> = ({
  text,
  className,
  ...props
}) => (
  <div
    className={classNames(
      "border border-e-1 bg-e-2 rounded-md p-1.5 text-xs font-bold cursor-pointer focus:!outline-none focus:border-accent",
      className
    )}
    {...props}
  >
    {text}
  </div>
);
