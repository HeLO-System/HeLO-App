import { FC } from "react";
import { StyledTooltip } from "./StyledTooltip";

export const WinrateByMapTooltip: FC<{
  label?: string;
  payload?: {
    name: string;
    value: number;
    color: string;
    payload: { total: number };
  }[];
  active?: boolean;
}> = ({ payload, ...props }) => {
  if (payload && payload[0]) {
    const newPayload: { name: string; value: number; color: string }[] = [
      ...payload,
      { name: "Total", value: payload[0].payload.total, color: "#fffff" },
    ];
    return <StyledTooltip payload={newPayload} {...props} />;
  }
  return <StyledTooltip payload={payload} {...props} />;
};
