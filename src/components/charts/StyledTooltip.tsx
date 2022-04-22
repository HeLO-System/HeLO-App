import { FC } from "react";

export const StyledTooltip: FC<{
  label?: string;
  payload?: { name: string; value: number; color: string }[];
  active?: boolean;
}> = ({ label, payload }) => (
  <div className="rounded-lg !border-0 !bg-border shadow-elevation-2 p-4">
    <h1>{label}</h1>
    {payload?.map(({ name, value, color }) => (
      <div key="name" style={{ color }}>
        {`${name} : ${value}`}
      </div>
    ))}
  </div>
);
