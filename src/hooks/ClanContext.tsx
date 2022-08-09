import { ClanTagStore } from "@api/clantags";
import { useQuery } from "@tanstack/react-query";
import { FCC } from "@types";
import axios from "axios";
import { createContext, useCallback, useContext, useMemo } from "react";

type ClanTagContextType = {
  clans: ClanTagStore | undefined;
  getTag: (id: string, fallback?: string) => string;
};

const ClanTagCtx = createContext<ClanTagContextType | null>(null);

export const ClanTagProvider: FCC = ({ children }) => {
  const { data: clans } = useQuery<ClanTagStore>(["clantags"], async () =>
    axios.get<ClanTagStore>("/api/clantags").then(({ data }) => data)
  );

  const getTag = useCallback(
    (id: string, fallback = ""): string => (clans && clans[id]) || fallback,
    [clans]
  );

  const value = useMemo(() => ({ clans, getTag }), [clans, getTag]);

  return <ClanTagCtx.Provider value={value}>{children}</ClanTagCtx.Provider>;
};

export const useClanTags = (): ClanTagContextType =>
  useContext(ClanTagCtx) as ClanTagContextType;
