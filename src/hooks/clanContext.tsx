import { ClanTagStore } from "@api/clantags";
import { FCC } from "@types";
import axios from "axios";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

type ClanTagContextType = {
  clans: ClanTagStore | undefined;
  getTag: (id: string, fallback?: string) => string;
};

const ClanTagCtx = createContext<ClanTagContextType | null>(null);

export const ClanTagProvider: FCC = ({ children }) => {
  const { data: clans } = useQuery<ClanTagStore>("clantags", async () =>
    axios.get<ClanTagStore>("/api/clantags").then(({ data }) => data)
  );

  const getTag = (id: string, fallback = ""): string =>
    (clans && clans[id]) || fallback;

  return (
    <ClanTagCtx.Provider value={{ clans, getTag }}>
      {children}
    </ClanTagCtx.Provider>
  );
};

export const useClanTags = (): ClanTagContextType =>
  useContext(ClanTagCtx) as ClanTagContextType;
