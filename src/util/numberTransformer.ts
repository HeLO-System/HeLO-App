import { ChangeEvent } from "react";

export const numberTransformer = {
  input: (value?: string | number) =>
    Number.isNaN(value) || value === 0 ? "" : value?.toString(),
  output: (e: ChangeEvent<HTMLSelectElement> | string) => {
    const output = parseInt(typeof e === "string" ? e : e.target?.value, 10);
    return Number.isNaN(output) ? 0 : output;
  },
};
