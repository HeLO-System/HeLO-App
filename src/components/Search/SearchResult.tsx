/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import { FC } from "react";

type SearchResultProps = { title: string; href: string; onClick: () => void };

export const SearchResult: FC<SearchResultProps> = ({
  title,
  href,
  onClick,
}) => (
  <Link href={href}>
    <a
      onClick={onClick}
      className="block p-2 border rounded-md border-transparent focus:border-accent hover:border-accent focus:bg-e-1-dark    hover:bg-e-1-dark focus:!outline-none"
    >
      {title}
    </a>
  </Link>
);
