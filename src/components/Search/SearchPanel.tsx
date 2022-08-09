/* eslint-disable jsx-a11y/no-autofocus */
import { Search24Filled } from "@fluentui/react-icons";
import { useSearch } from "@hooks";
import { Clan, Match } from "@types";
import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { SearchResult } from "./SearchResult";
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
            {matches.map(({ match_id: matchId }) => (
              <SearchResult
                title={matchId}
                key={matchId}
                href={`/matches/${matchId}`}
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
