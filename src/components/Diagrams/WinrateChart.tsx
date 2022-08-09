/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useWinrate, useWinrateByResult } from "@queries";
import { FC } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ChartWrapper } from "./ChartWrapper";

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
      select: (data) =>
        Object.entries(data).map(([name, { count: value }]) => ({
          name,
          value,
        })),
    }
  );

  const { data: winrate } = useWinrate<WinrateData>(
    clanId as string,
    {},
    {
      enabled: !!clanId,
      select: (data) => ({
        data: [
          { name: "Wins", value: data.wins },
          { name: "Losses", value: data.total - data.wins },
        ],
        winrate: data.winrate * 100,
      }),
    }
  );

  return (
    <ChartWrapper
      className={className}
      title={`Winrate - ${winrate?.winrate.toFixed(1) || ""}%`}
    >
      <PieChart>
        <Pie
          data={winrate?.data}
          dataKey="value"
          outerRadius="80%"
          innerRadius="60%"
          fill="#ffffff"
        >
          {winrate?.data.map((entry) => (
            <Cell
              fill="#ff0000"
              key={entry.name}
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
          {winrateByResult?.map((entry, index) => (
            <Cell
              key={entry.name}
              className={index < 3 ? "fill-green-800" : "fill-red-800"}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ChartWrapper>
  );
};
