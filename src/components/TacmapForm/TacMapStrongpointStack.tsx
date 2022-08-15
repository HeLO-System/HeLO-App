import { Checkbox, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { Directions, TacmapUrlForm } from "./TacmapForm";

type TacmapStrongpointStackProps = {
  caps: [string, string, string];
  control: Control<TacmapUrlForm>;
  index: number;
  direction: Directions;
};

export const TacmapStrongpointStack: FC<TacmapStrongpointStackProps> = ({
  caps,
  control,
  index,
  direction,
}) => (
  <Stack flex={1} direction={{ base: "column", md: direction }}>
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
            flex={1}
          >
            {strongpoint}
          </Checkbox>
        )}
      />
    ))}
  </Stack>
);
