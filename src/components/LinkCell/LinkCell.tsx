import Link from "next/link";
import { FC } from "react";

export interface LinkCellProps {
  tag: string;
  value: string | number;
  hrefPrefix: string;
}

export const LinkCell: FC<LinkCellProps> = ({ hrefPrefix, tag, value }) => (
  <Link href={`/${hrefPrefix}/${tag}`}>
    <a className="h-full w-full flex items-center">
      <span>{value}</span>
    </a>
  </Link>
);
