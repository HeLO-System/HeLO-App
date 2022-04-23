import { CustomLink } from "@components/CustomLink";
import { ArrowLeft24Regular } from "@fluentui/react-icons";
import classNames from "classnames";
import { FC } from "react";

interface BackButtonProps {
  className?: string;
}

export const BackButton: FC<BackButtonProps> = ({ className }) => (
  <CustomLink
    className={classNames(
      "w-min text-xl font-gotham-book whitespace-nowrap",
      className
    )}
    icon={<ArrowLeft24Regular />}
    text="Helo-System"
    href="/"
  ></CustomLink>
);
