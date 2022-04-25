/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useWinrateByResult, useWinrate } from "@queries";
import { FC } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import { StyledTooltip } from "./StyledTooltip";

type WinrateDataEntry = { name: string; value: number }[];

type WinrateData = {
  data: WinrateDataEntry;
  winrate: number;
};

interface WinrateChartProps {
  className?: string;
  clanId: string | undefined;
}

export const WinrateChart: FC<WinrateChartProps> = ({ className, clanId }) => {
  const { data: winrateByResult } = useWinrateByResult<WinrateDataEntry>(
    clanId as string,
    {},
    {
      enabled: !!clanId,
      select: (data) => {
        return Object.entries(data).map(([name, { count: value }], index) => ({
          name,
          value,
        }));
      },
    }
  );

  const { data: winrate } = useWinrate<WinrateData>(
    clanId as string,
    {},
    {
      enabled: !!clanId,
      select: (data) => {
        return {
          data: [
            { name: "Wins", value: data.wins },
            { name: "Losses", value: data.total - data.wins },
          ],
          winrate: data.winrate * 100,
        };
      },
    }
  );

  return (
    <ChartWrapper
      className={className}
      title={`Winrate - ${winrate?.winrate || ""}%`}
    >
      <PieChart>
        <Pie
          data={winrate?.data}
          dataKey="value"
          outerRadius="80%"
          innerRadius="60%"
          fill="#ffffff"
        >
          {winrate?.data.map((entry, index) => (
            <Cell
              fill="#ff0000"
              key={`cell-${index}`}
              className={
                entry.name === "Wins" ? "fill-green-800" : "fill-red-800"
              }
            />
          ))}
        </Pie>
        <Pie
          data={winrateByResult}
          dataKey="value"
          outerRadius="40%"
          fill="#ffffff"
        >
          {winrateByResult?.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              className={index < 3 ? "fill-green-800" : "fill-red-800"}
            />
          ))}
        </Pie>
        <Tooltip content={<StyledTooltip />} />
      </PieChart>
    </ChartWrapper>
  );
};
