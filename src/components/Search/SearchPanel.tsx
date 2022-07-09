import { Search24Filled } from "@fluentui/react-icons";
import { Clan, Match } from "@types";
import { useSearch } from "hooks/queries/SearchQuery";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { ShortCutReminder } from "./ShortcutReminder";

const MATCH_LIMIT = 20;
const CLAN_LIMIT = 5;
interface SearchPanelProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const SearchPanel: FC<SearchPanelProps> = ({ ...props }) => {
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (props.isOpen) {
      setSearchString("");
    }
  }, [props.isOpen]);

  const { data: clans } = useSearch<Clan>(
    {
      limit: CLAN_LIMIT,
      q: searchString,
      type: "clan",
    },
    { enabled: !!searchString }
  );

  const { data: matches } = useSearch<Match>(
    {
      limit: MATCH_LIMIT,
      q: searchString,
      type: "match",
      desc: true,
    },
    { enabled: !!searchString }
  );

  return (
    <Modal
      {...props}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 backdrop-blur-sm"
      className="w-full md:w-1/4 h-full md:h-fit m-auto absolute inset-0 bg-e-1 md:border-2 border-border md:rounded-xl text-white p-2 "
    >
      <div className="flex m-2 items-center">
        <Search24Filled />
        <input
          placeholder="Search..."
          className="bg-transparent mx-2 rounded-md border-2 border-transparent focus:border-accent focus:!outline-none flex-1 p-1.5"
          onChange={({ target: { value } }): void => {
            setSearchString(value);
          }}
          autoFocus
        />
        <ShortCutReminder
          text="esc"
          onClick={props.onRequestClose}
          tabIndex={0}
        />
      </div>
      <hr className="border-border -mx-2" />
      <div className="overflow-auto md:h-60 pb-20 md:p-0 h-full" tabIndex={-1}>
        {!!clans?.length && (
          <>
            <span>Clans</span>
            {clans.map(({ name, tag }) => (
              <SearchResult
                title={name}
                key={name}
                href={`/clans/${tag}`}
                onClick={props.onRequestClose}
              />
            ))}
          </>
        )}
        {!!matches?.length && (
          <>
            <span>Matches</span>
            {matches.map(({ match_id }) => (
              <SearchResult
                title={match_id}
                key={match_id}
                href={`/matches/${match_id}`}
                onClick={props.onRequestClose}
              />
            ))}
          </>
        )}
        {!matches?.length && !clans?.length && (
          <div className="text-center mt-20">No results found</div>
        )}
      </div>
    </Modal>
  );
};

const SearchResult: FC<{
  title: string;
  href: string;
  onClick: () => void;
}> = ({ title, href, onClick }) => (
  <Link href={href}>
    <a
      onClick={onClick}
      className="block p-2 border rounded-md border-transparent focus:border-accent hover:border-accent focus:bg-e-1-dark    hover:bg-e-1-dark focus:!outline-none"
    >
      {title}
    </a>
  </Link>
);
