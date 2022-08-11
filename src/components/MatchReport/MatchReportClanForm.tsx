/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  Box,
  Button,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Add24Regular, Delete24Regular } from "@fluentui/react-icons";
import { useClanTags } from "@hooks";
import { Factions } from "@types";
import { numberTransformer } from "@util";
import { FC } from "react";
import {
  Control,
  Controller,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { ReportMatchForm } from "./MatchReportForm";

type MatchReportClanFormProps = {
  side: Factions;
  control: Control<ReportMatchForm>;
  register: UseFormRegister<ReportMatchForm>;
};

export const MatchReportClanForm: FC<MatchReportClanFormProps> = ({
  side,
  control,
  register,
}) => {
  const { clans } = useClanTags();

  const name = side === Factions.Allies ? "alliesClans" : "axisClans";
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Stack flex={1}>
      <h1 className="w-full text-center">{side}</h1>
      <Grid templateColumns="1fr 1fr auto" gap={2}>
        <GridItem>Clan</GridItem>
        <GridItem>Players</GridItem>
        <p />
        {fields.map((field, index) => (
          <Stack key={field.id} direction="row">
            <Select
              key={`${name}.${field.id}.tag`}
              {...register(`${name}.${index}.tag` as const, {
                required: true,
              })}
            >
              {clans &&
                Object.values(clans).map((clan) => (
                  <option value={clan} key={clan}>
                    {clan}
                  </option>
                ))}
            </Select>
            <Controller
              name={`${name}.${index}.players` as const}
              control={control}
              render={({ field: { ref, value, onChange, ...renderField } }) => (
                <NumberInput
                  value={numberTransformer.input(value)}
                  onChange={(e) => onChange(numberTransformer.output(e))}
                  {...renderField}
                  min={1}
                  max={50}
                >
                  <NumberInputField ref={ref} />
                </NumberInput>
              )}
            />
            <Button
              leftIcon={<Delete24Regular />}
              variant="ghost"
              color="red.800"
              disabled={fields.length < 2}
              onClick={() => {
                remove(index);
              }}
              title="Remove clan"
            />
          </Stack>
        ))}
      </Grid>
      <Box className="w-full flex justify-center">
        <Button
          leftIcon={<Add24Regular />}
          variant="ghost"
          color="white"
          onClick={() => append({ players: 0, tag: "" })}
        >
          Add Clan
        </Button>
      </Box>
    </Stack>
  );
};
