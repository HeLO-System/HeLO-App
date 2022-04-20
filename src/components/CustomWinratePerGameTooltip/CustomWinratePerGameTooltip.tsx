/* eslint-disable @typescript-eslint/ban-ts-comment */
// recharts doesn't export the default tooltip,
// but it's located in the package lib so you can get to it anyways
import { FC } from "react";
// @ts-ignore
import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent.js";

interface CustomWinratePerGameTooltipProps {
  payload?: { name: string; value: string; payload: { total: number } }[];
}

export const CustomWinratePerGameTooltip: FC<
  CustomWinratePerGameTooltipProps
> = (props) => {
  // payload[0] doesn't exist when tooltip isn't visible
  if (props.payload && props.payload[0] != null) {
    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    const newPayload = [
      ...props.payload,
      { name: "Total", value: props.payload[0].payload.total },
    ];

    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }

  // we just render the default
  return <DefaultTooltipContent {...props} />;
};
