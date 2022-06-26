import classNames from "classnames";
import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface CustomLinkProps {
  icon?: JSX.Element;
  text?: string;
  className?: string;
  href: string;
}

export const CustomLink: FC<
  CustomLinkProps &
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
> = ({ text, icon, className, href, children, ...props }) => (
  <Link href={href}>
    <a
      className={classNames(
        "bg-e-2 p-2 rounded-lg shadow-elevation-1 text-font flex justify-center items-center gap-2 hover:scale-105 ",
        className
      )}
      {...props}
      draggable={false}
    >
      {icon}
      {text}
    </a>
  </Link>
);
