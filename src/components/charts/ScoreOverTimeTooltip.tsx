/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScoreHistory } from "@types";
import { FC } from "react";
import { StyledTooltip } from "./StyledTooltip";

export const ScoreOverTimeTooltip: FC<{
  label?: string;
  payload?: {
    name: string;
    value: number;
    color: string;
    payload: ScoreHistory;
  }[];
  active?: boolean;
}> = ({ label, payload, ...props }) => {
  if (payload && payload[0]) {
    return (
      <StyledTooltip
        label={payload[0].payload.date}
        payload={payload}
        {...props}
      />
    );
  }
  return <StyledTooltip payload={payload} {...props} />;
};
