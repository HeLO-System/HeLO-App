import { MiscRecords } from "@pages/api/misc-records";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CustomUseQueryOptions } from "@types";
import axios from "axios";

export const fetchMiscRecords = async (): Promise<MiscRecords> =>
  axios.get<MiscRecords>("/api/misc-records").then(({ data }) => data);

export const useMiscRecords = <T = MiscRecords>(
  options?: CustomUseQueryOptions<MiscRecords, T>
): UseQueryResult<T> =>
  useQuery<MiscRecords, unknown, T>(
    ["miscRecords"],
    () => fetchMiscRecords(),
    options
  );
