import * as React from "react";
import { FC, useContext } from "react";
import { useClans } from "./queries/ClansQuery";

type ClanTagStore = Record<string, string>;
type ClanTagContextType = {
  clans: ClanTagStore | undefined;
  getTag: (id: string) => string;
};

const ClanTagCtx = React.createContext<ClanTagContextType | null>(null);

export const ClanTagProvider: FC = ({ children }) => {
  const { data: clans } = useClans<ClanTagStore>(
    { select: "tag" },
    {
      select: (clansData) =>
        clansData.reduce((acc: ClanTagStore, curr) => {
          acc[curr._id.$oid] = curr.tag;
          return acc;
        }, {}),
    }
  );

  const getTag = (id: string): string => (clans && clans[id]) || "";

  return (
    <ClanTagCtx.Provider value={{ clans, getTag }}>
      {children}
    </ClanTagCtx.Provider>
  );
};

export const useClanTags = (): ClanTagContextType =>
  useContext(ClanTagCtx) as ClanTagContextType;
