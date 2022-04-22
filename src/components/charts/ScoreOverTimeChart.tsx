/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useClans, useScoreHistory } from "@queries";
import { DateTime } from "luxon";
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
import { StyledTooltip } from "./StyledTooltip";

const scorePadding = 50;
const scoreRoundTo = 50;
const scoreOverTimeMonths = 3;

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
    {
      start: DateTime.now().minus({ months: scoreOverTimeMonths }).toISODate(),
    },
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
    <ChartWrapper className={className} title="Score over time">
      <LineChart data={scoreHistory}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis domain={[minScore || 0, maxScore || 1000]} />
        <XAxis dataKey="date" angle={90} textAnchor="start" height={100} />
        <Tooltip content={<StyledTooltip />} />
        <Line
          dataKey="score"
          stroke="var(--color-accent)"
          fill="var(--color-accent)"
        />
      </LineChart>
    </ChartWrapper>
  );
};
