import { Statistics } from "@pages/api/statistics";
import { CustomUseQueryOptions } from "@types";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

export const fetchStatistics = async (): Promise<Statistics> =>
  axios.get<Statistics>("/api/statistics").then(({ data }) => data);

export const useStatistics = <T = Statistics>(
  options?: CustomUseQueryOptions<Statistics, T>
): UseQueryResult<T> =>
  useQuery<Statistics, unknown, T>(
    ["statistics"],
    () => fetchStatistics(),
    options
  );
