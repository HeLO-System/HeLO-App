/* eslint-disable no-underscore-dangle */
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CustomUseQueryOptions, ScoreHistory } from "@types";
import axios from "axios";
import { DateTime } from "luxon";

export type ScoreHistoryParams = {
  start?: string;
  end?: string;
  select?: string;
  desc?: boolean;
};

export const fetchScoreHistory = async (
  clanId: string,
  params?: ScoreHistoryParams
): Promise<ScoreHistory[]> => {
  const { data } = await axios.get<ScoreHistory[]>(
    `/helo-api/clan/${clanId}/score_history`,
    { params }
  );
  return data.map((dataPoint) => {
    // eslint-disable-next-line no-param-reassign
    dataPoint.date = DateTime.fromMillis(
      parseInt(dataPoint._created_at.$date, 10)
    ).toISODate();
    return dataPoint;
  });
};

export const useScoreHistory = <T = ScoreHistory[]>(
  clanId: string,
  params?: ScoreHistoryParams,
  options?: CustomUseQueryOptions<ScoreHistory[], T>
): UseQueryResult<T> =>
  useQuery(
    ["clan", clanId, "score_history", params],
    () => fetchScoreHistory(clanId, params),
    options
  );
