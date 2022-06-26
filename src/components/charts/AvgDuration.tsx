import { fetchWinrate, useStatistics, WinrateParams } from "@queries";
import { Map } from "@types";
import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import { StyledTooltip } from "./StyledTooltip";

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

interface AvgDurationChartProps {
  className?: string;
}

export const AvgDurationChart: FC<AvgDurationChartProps> = ({ className }) => {
  const { data } = useStatistics();

  return (
    <ChartWrapper className={className} title="Avg. game duration">
      <BarChart data={data?.avg_length_per_map}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="map"
          angle={90}
          textAnchor="start"
          interval={0}
          height={100}
        />
        <Tooltip content={<StyledTooltip />} />
        <Bar dataKey="duration" fill="#166534">
          <LabelList
            dataKey="duration"
            position="middle"
            className="fill-white"
          />
        </Bar>
      </BarChart>
    </ChartWrapper>
  );
};
