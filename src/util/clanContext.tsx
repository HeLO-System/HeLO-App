import { ClanTagStore } from "@api/clantags";
import axios from "axios";
import { createContext, FC, useContext } from "react";
import { useQuery } from "react-query";

type ClanTagContextType = {
  clans: ClanTagStore | undefined;
  getTag: (id: string, fallback?: string) => string;
};

const ClanTagCtx = createContext<ClanTagContextType | null>(null);

export const ClanTagProvider: FC = ({ children }) => {
  const { data: clans } = useQuery<ClanTagStore>("clantags", async () => {
    const { data } = await axios.get<ClanTagStore>("/api/clantags");
    return data;
  });

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
