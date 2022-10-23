/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
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
  other?: boolean;
};

export const MatchReportClanForm: FC<MatchReportClanFormProps> = ({
  side,
  control,
  register,
  other,
}) => {
  const { clans } = useClanTags();

  const name = ((side === Factions.Allies ? "allies" : "axis") +
    (other ? "Other" : "Clans")) as
    | "alliesClans"
    | "axisClans"
    | "alliesOther"
    | "axisOther";
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Stack flex={1}>
      <Grid templateColumns="1fr 1fr auto" gap={2}>
        {fields.length > 0 && (
          <>
            <GridItem>{other ? "Name" : "Clan"}</GridItem>
            <GridItem>Players</GridItem>
            <p />
          </>
        )}
        {fields.map((field, index) => (
          <>
            {other ? (
              <Controller
                name={`${name}.${index}.tag` as const}
                key={`${name}.${field.id}.tag`}
                control={control}
                render={({ field: input }) => <Input {...input} />}
              />
            ) : (
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
            )}
            <Controller
              name={`${name}.${index}.players` as const}
              key={`${name}.${field.id}.players`}
              control={control}
              render={({ field: { ref, value, onChange, ...renderField } }) => (
                <NumberInput
                  key={`${name}.${field.id}.players`}
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
              key={`${name}.${field.id}.delete`}
              leftIcon={<Delete24Regular />}
              variant="ghost"
              color="red.800"
              onClick={() => {
                remove(index);
              }}
              title="Remove clan"
            />
          </>
        ))}
      </Grid>
      <Box className="w-full flex justify-center">
        <Button
          leftIcon={<Add24Regular />}
          variant="ghost"
          color="white"
          onClick={() => append({ players: 0, tag: "" })}
        >
          Add {other ? "Other" : "Clan"}
        </Button>
      </Box>
    </Stack>
  );
};
