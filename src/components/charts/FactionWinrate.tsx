import { useStatistics } from "@queries";
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

interface FactionWinrateChartProps {
  className?: string;
}

export const FactionWinrateChart: FC<FactionWinrateChartProps> = ({
  className,
}) => {
  const { data } = useStatistics();

  return (
    <ChartWrapper className={className} title="Winrate per faction">
      <BarChart data={data?.faction_winrate_by_map}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="map"
          angle={90}
          textAnchor="start"
          interval={0}
          height={100}
        />
        <Tooltip content={<StyledTooltip />} />
        <Bar dataKey="Axis" stackId="a" fill="#166534" yAxisId="games">
          <LabelList dataKey="Axis" position="middle" className="fill-white" />
        </Bar>
        <Bar dataKey="Allies" stackId="a" fill="#991b1b" yAxisId="games">
          <LabelList
            dataKey="Allies"
            position="middle"
            className="fill-white"
          />
        </Bar>
      </BarChart>
    </ChartWrapper>
  );
};
