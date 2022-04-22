/* eslint-disable @typescript-eslint/no-magic-numbers */
import clan from "@pages/clans";
import { useWinrateByResult } from "@queries";
import { FC } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import { StyledTooltip } from "./StyledTooltip";

type WinrateDataEntry = { name: string; value: number }[];
type WinrateData = {
  total: WinrateDataEntry;
  byResult: WinrateDataEntry;
};

interface WinrateChartProps {
  className?: string;
  clanId: string | undefined;
}

export const WinrateChart: FC<WinrateChartProps> = ({ className, clanId }) => {
  const { data: winrate } = useWinrateByResult<WinrateData>(
    clanId as string,
    {},
    {
      enabled: !!clan,
      select: (data) => {
        const result: WinrateData = {
          byResult: [],
          total: [
            { name: "Wins", value: 0 },
            { name: "Losses", value: 0 },
          ],
        };
        Object.entries(data).forEach(([name, { count: value }], index) => {
          result.byResult.push({ name, value });
          result.total[Math.floor(index / 3)].value += value;
        });
        return result;
      },
    }
  );
  return (
    <ChartWrapper className={className} title="Winrate">
      <PieChart>
        <Pie
          data={winrate?.total}
          dataKey="value"
          outerRadius="80%"
          innerRadius="60%"
          fill="#ffffff"
        >
          {winrate?.total.map((entry, index) => (
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
          data={winrate?.byResult}
          dataKey="value"
          outerRadius="40%"
          fill="#ffffff"
        >
          {winrate?.byResult.map((_entry, index) => (
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
