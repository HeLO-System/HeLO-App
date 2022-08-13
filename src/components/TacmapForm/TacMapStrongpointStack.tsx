import { Checkbox, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { TacmapUrlForm } from "./TacmapForm";

type TacmapStrongpointStackProps = {
  caps: [string, string, string];
  control: Control<TacmapUrlForm>;
  index: number;
};

export const TacmapStrongpointStack: FC<TacmapStrongpointStackProps> = ({
  caps,
  control,
  index,
}) => (
  <Stack flex={1}>
    {caps.map((strongpoint, i) => (
      <Controller
        key={strongpoint}
        name="caps"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            onChange={(e) => {
              const capsCopy = [...value];
              capsCopy[index * 3 + i] = e.target.checked ? strongpoint : "";
              onChange(capsCopy);
            }}
            checked={value.includes(strongpoint)}
            id="matchType"
          >
            {strongpoint}
          </Checkbox>
        )}
      />
    ))}
  </Stack>
);
