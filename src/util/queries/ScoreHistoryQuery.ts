import { ScoreHistory } from "@types";
import axios from "axios";
import { DateTime } from "luxon";
import { useQuery, UseQueryResult } from "react-query";

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
    `/api/clan/${clanId}/score_history`,
    { params }
  );
  return data.map((dataPoint) => {
    dataPoint.date = DateTime.fromMillis(
      parseInt(dataPoint._created_at.$date, 10)
    ).toISODate();
    return dataPoint;
  });
};
export const useCoreHistory = (
  clanId: string,
  params?: ScoreHistoryParams
): UseQueryResult<ScoreHistory[]> =>
  useQuery(["clan", clanId, "score_history", params], () =>
    fetchScoreHistory(clanId, params)
  );
