/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useStatistics } from "@queries";
import { Map } from "@types";
import { FC } from "react";
import { Cell, LabelList, Pie, PieChart, Tooltip } from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import { StyledTooltip } from "./StyledTooltip";

interface MapsChartProps {
  className?: string;
}

export const MapsChart: FC<MapsChartProps> = ({ className }) => {
  const { data } = useStatistics();
  const colors: Record<Map, string> = {
    Carentan: "#0fb5ae",
    Foy: "#4046ca",
    Hill: "#f68511",
    Hurtgen: "#de3d82",
    Kursk: "#7e84fa",
    PHL: "#72e06a",
    SMDM: "#147af3",
    SME: "#e8c600",
    Stalingrad: "#cb5d00",
    Utah: "#008f5d",
    Omaha: "#00a8ff",
    Remagen: "#ffc400",
    Kharkov: "#ff0000",
  };

  return (
    <ChartWrapper
      className={className}
      title={`Games per Map (${data?.total_matches || ""} total) `}
    >
      <PieChart>
        {data && (
          <>
            <Pie
              data={data?.map_statistics}
              dataKey="games"
              nameKey="map"
              outerRadius="80%"
              fill="#ffffff"
            >
              {data?.map_statistics?.map((entry) => (
                <Cell fill={colors[entry.map as Map]} key={entry.map} />
              ))}
              <LabelList
                dataKey="map"
                position="outside"
                className="fill-white"
              />
            </Pie>
            <Tooltip content={<StyledTooltip />} />
          </>
        )}
      </PieChart>
    </ChartWrapper>
  );
};
