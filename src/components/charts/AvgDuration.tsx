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
