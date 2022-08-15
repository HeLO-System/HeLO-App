/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useClans, useScoreHistory } from "@queries";
import { FC } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import { ScoreOverTimeTooltip } from "./ScoreOverTimeTooltip";

const scorePadding = 50;
const scoreRoundTo = 50;

interface ScoreOverTimeChartProps {
  className?: string;
  clanId: string | undefined;
}

export const ScoreOverTimeChart: FC<ScoreOverTimeChartProps> = ({
  className,
  clanId,
}) => {
  const { data: scoreHistory } = useScoreHistory(
    clanId as string,
    {},
    { enabled: !!clanId }
  );

  const { data: minScore } = useClans<number>(
    {
      limit: 1,
      sort_by: "score",
      select: "score",
    },
    {
      select: (data) =>
        data[0].score - scorePadding - (data[0].score % scoreRoundTo),
    }
  );

  const { data: maxScore } = useClans<number>(
    {
      limit: 1,
      sort_by: "score",
      select: "score",
      desc: true,
    },
    {
      select: (data) =>
        data[0].score +
        scorePadding +
        scoreRoundTo -
        (data[0].score % scoreRoundTo),
    }
  );

  return (
    (scoreHistory && (
      <ChartWrapper className={className} title="Score over time">
        {(scoreHistory && (
          <LineChart data={scoreHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis domain={[minScore || 0, maxScore || 1000]} />
            <XAxis
              dataKey="_created_at.$date"
              angle={90}
              type="number"
              textAnchor="start"
              height={100}
              domain={["dataMin", "dataMax"]}
              tickFormatter={(_value, index): string =>
                (scoreHistory &&
                  scoreHistory[index] &&
                  scoreHistory[index].date) ||
                ""
              }
            />
            <Tooltip content={<ScoreOverTimeTooltip />} />
            <Line
              dataKey="score"
              stroke="var(--color-accent)"
              fill="var(--color-accent)"
            />
          </LineChart>
        )) ||
          undefined}
      </ChartWrapper>
    )) || <div />
  );
};
