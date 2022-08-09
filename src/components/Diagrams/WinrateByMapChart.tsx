import { fetchWinrate, WinrateParams } from "@queries";
import { useQueries } from "@tanstack/react-query";
import { Map } from "@types";
import { enumKeys } from "@util";
import { FC } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import { WinrateByMapTooltip } from "./WinrateByMapTooltip";

type WinrateByMapData = {
  name: Map | undefined;
  Wins: number;
  Losses: number;
  Winrate: number;
  total: number;
};

const fetchWinRateByMap = (
  clanId: string,
  params: WinrateParams
): Promise<WinrateByMapData> =>
  fetchWinrate(clanId, params)
    .then((data) => ({
      name: params.map,
      Wins: data.wins,
      Losses: data.total - data.wins,
      total: data.total,
      Winrate: data.winrate,
    }))
    .catch(() => ({
      name: params.map,
      Wins: 0,
      Losses: 0,
      total: 0,
      Winrate: 0,
    }));

interface WinrateByMapChartProps {
  className?: string;
  clanId: string | undefined;
}

export const WinrateByMapChart: FC<WinrateByMapChartProps> = ({
  className,
  clanId,
}) => {
  const winRateByMap = useQueries({
    queries: enumKeys(Map).map((map) => ({
      queryKey: ["statistics", "winrate", clanId, { map }],
      queryFn: () => fetchWinRateByMap(clanId as string, { map: Map[map] }),
      enabled: !!clanId,
    })),
  }).map((result) => result.data);

  return (
    <ChartWrapper className={className} title="Winrate by map">
      <ComposedChart data={winRateByMap}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={90}
          textAnchor="start"
          interval={0}
          height={100}
        />
        <YAxis yAxisId="winrate" hide domain={[0, 1]} />
        <YAxis yAxisId="games" hide />
        <Tooltip
          content={<WinrateByMapTooltip />}
          formatter={(value: string, name: string): string =>
            name === "Winrate" ? `${parseFloat(value) * 100}%` : value
          }
        />
        <Bar dataKey="Wins" stackId="a" fill="#166534" yAxisId="games">
          <LabelList
            dataKey="Wins"
            position="middle"
            formatter={(value: string): string => value || ""}
            className="fill-white"
          />
        </Bar>
        <Bar dataKey="Losses" stackId="a" fill="#991b1b" yAxisId="games">
          <LabelList
            dataKey="Losses"
            position="middle"
            formatter={(value: string): string => value || ""}
            className="fill-white"
          />
        </Bar>
        <Line
          yAxisId="winrate"
          dataKey="Winrate"
          stroke="var(--color-accent)"
          fill="var(--color-accent)"
        />
      </ComposedChart>
    </ChartWrapper>
  );
};
