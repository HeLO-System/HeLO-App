import Link from "next/link";
import { FC } from "react";

interface LinkCellProps {
  tag: string;
  value: string | number;
}

export const LinkCell: FC<LinkCellProps> = ({ tag, value }) => (
  <Link href={`/clans/${tag}`}>
    <a className="h-full w-full flex items-center">
      <span>{value}</span>
    </a>
  </Link>
);
