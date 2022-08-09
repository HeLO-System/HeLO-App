import { Search24Filled } from "@fluentui/react-icons";
import classNames from "classnames";
import { FC } from "react";
import { ShortCutReminder } from "./ShortcutReminder";

interface SearchbarProps {
  className?: string;
  onClick?: () => void;
}

export const Searchbar: FC<SearchbarProps> = ({ className, onClick }) => (
  <button
    className={classNames(
      "flex rounded-md border-e-1 md:border whitespace-nowrap my-2 text-white items-center p-1 md:w-48 hover:bg-e-2",
      className
    )}
    onClick={onClick}
    type="button"
  >
    <Search24Filled />
    <span className="md:block hidden">Search...</span>
    <ShortCutReminder className="md:block hidden ml-auto" text="Ctrl+K" />
  </button>
);
