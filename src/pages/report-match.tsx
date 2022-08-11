/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @next/next/no-img-element */
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { Maps, Strongpoints } from "@constants";
import { Add24Regular, Delete24Regular } from "@fluentui/react-icons";
import { useClanTags } from "@hooks";
import { MatchResults, MatchTypes } from "@schemas";
import {
  Map,
  MatchReport,
  MatchReportClan,
  MatchResult,
  MatchType,
} from "@types";
import { numberTransformer } from "@util";
import axios from "axios";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type CapType = {
  name: string;
};

type ReportMatchForm = {
  matchType: MatchType;
  map: Map;
  result: MatchResult;
  date: Date;
  time: number;
  caps: CapType[];
  axisClans: MatchReportClan[];
  alliesClans: MatchReportClan[];
};

const ReportMatch: FC = () => {
  const { status } = useSession();
  const router = useRouter();
  const { clans } = useClanTags();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    resetField,
  } = useForm<ReportMatchForm>({
    defaultValues: {
      matchType: MatchTypes.Values.Friendly,
      map: Maps.Values.SMDM,
      result: MatchResults.Values["5:0"],
      date: new Date(),
      caps: [
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" },
        { name: "" },
      ],
      axisClans: [{ tag: "", players: 50 }],
      alliesClans: [{ tag: "", players: 50 }],
    },
  });

  const { fields: capFields } = useFieldArray({ control, name: "caps" });
  const {
    fields: axisClanFields,
    append: axisAppend,
    remove: axisRemove,
  } = useFieldArray({
    control,
    name: "axisClans",
  });
  const {
    fields: alliesClanFields,
    append: alliesAppend,
    remove: alliesRemove,
  } = useFieldArray({
    control,
    name: "alliesClans",
  });

  const selectedMap = watch("map");

  if (status === "unauthenticated") {
    router.push("/");
  }

  const onSubmit = ({
    alliesClans,
    axisClans,
    caps,
    date,
    map,
    matchType,
    result,
    time,
  }: ReportMatchForm) => {
    const transformedDate: MatchReport = {
      alliesClans: alliesClans as MatchReport["alliesClans"],
      axisClans: axisClans as MatchReport["axisClans"],
      map,
      matchType,
      result,
      date: date.toISOString().split("T")[0],
      time,
      caps: caps.map((cap) => cap.name) as MatchReport["caps"],
    };
    axios.post("/api/reportMatch", transformedDate);
  };

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <BackButton className="mt-10 ml-10" />
      <GlassPanel className="p-4 mx-10 pb-8 mb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="matchType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.matchType}>
                <FormLabel htmlFor="matchType">Match type</FormLabel>
                <RadioGroup onChange={onChange} value={value} id="matchType">
                  <Stack direction="row">
                    {MatchTypes.options.map((option) => (
                      <Radio value={option} key={option}>
                        {option}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>
                  {errors.matchType && errors.matchType.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="map"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.map}>
                <FormLabel htmlFor="map">Map</FormLabel>
                <Select
                  id="map"
                  value={value}
                  onChange={(event) => {
                    resetField("caps");
                    onChange(event);
                  }}
                >
                  {Maps.options.map((mapOption) => (
                    <option value={mapOption} key={mapOption}>
                      {mapOption}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.map && errors.map.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="result"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.result}>
                <FormLabel htmlFor="result">Match result</FormLabel>
                <RadioGroup onChange={onChange} value={value} id="result">
                  <Stack direction="row">
                    {MatchResults.options.map((result) => (
                      <Radio value={result} key={result}>
                        {result}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>
                  {errors.result && errors.result.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.date}>
                <FormLabel htmlFor="date">Match date</FormLabel>
                <SingleDatepicker
                  name="date-input"
                  date={value}
                  onDateChange={onChange}
                />
                <FormErrorMessage>
                  {errors.date && errors.date.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="time"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Time is required",
              },
            }}
            render={({ field: { ref, value, onChange, ...field } }) => (
              <FormControl isInvalid={!!errors.time}>
                <FormLabel htmlFor="time">Match duration</FormLabel>
                <NumberInput
                  value={numberTransformer.input(value)}
                  onChange={(e) => onChange(numberTransformer.output(e))}
                  {...field}
                  min={10}
                  max={90}
                  id="time"
                >
                  <NumberInputField name="time" ref={ref} />
                </NumberInput>
                <FormErrorMessage>
                  {errors.date && errors.date.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Stack direction="row">
            {capFields.map((field, index) => {
              const formkey = `cap${index + 1}` as keyof ReportMatchForm;

              return (
                <FormControl isInvalid={!!errors.caps} key={field.id}>
                  <FormLabel htmlFor={formkey}>{`Cap ${index + 1}`}</FormLabel>
                  <Select
                    id={formkey}
                    {...register(`caps.${index}.name` as const, {
                      required: "This is required",
                    })}
                  >
                    {Strongpoints[selectedMap][index].map((strongpoint) => (
                      <option value={strongpoint} key={strongpoint}>
                        {strongpoint}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.caps && errors.caps.message}
                  </FormErrorMessage>
                </FormControl>
              );
            })}
          </Stack>
          <Stack direction="row">
            <Stack flex={1}>
              <h1 className="w-full text-center">Axis</h1>
              <Grid templateColumns="1fr 1fr auto" gap={2}>
                <GridItem>Clan</GridItem>
                <GridItem>Players</GridItem>
                <p />
                {axisClanFields.map((field, index) => (
                  <>
                    <Select
                      key={`axisClans.${field.id}.tag`}
                      {...register(`axisClans.${index}.tag` as const, {
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
                      name={`axisClans.${index}.players` as const}
                      control={control}
                      render={({
                        field: { ref, value, onChange, ...renderField },
                      }) => (
                        <NumberInput
                          value={numberTransformer.input(value)}
                          onChange={(e) =>
                            onChange(numberTransformer.output(e))
                          }
                          {...renderField}
                          min={1}
                          max={50}
                        >
                          <NumberInputField ref={ref} />
                        </NumberInput>
                      )}
                    />
                    <button
                      type="button"
                      disabled={axisClanFields.length < 2}
                      onClick={() => {
                        axisRemove(index);
                      }}
                    >
                      <Delete24Regular />
                    </button>
                  </>
                ))}
              </Grid>
              <button
                type="button"
                onClick={() => {
                  axisAppend({ players: 0, tag: "" });
                }}
                className="flex justify-center"
              >
                <Add24Regular />
                Add Clan
              </button>
            </Stack>
            <Stack flex={1}>
              <h1 className="w-full text-center">Allies</h1>
              <Grid templateColumns="1fr 1fr auto" gap={2}>
                <GridItem>Clan</GridItem>
                <GridItem>Players</GridItem>
                <p />
                {alliesClanFields.map((field, index) => (
                  <>
                    <Select
                      key={`alliesClans.${field.id}.tag`}
                      {...register(`alliesClans.${index}.tag` as const, {
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
                      name={`alliesClans.${index}.players` as const}
                      control={control}
                      render={({
                        field: { ref, value, onChange, ...renderField },
                      }) => (
                        <NumberInput
                          {...renderField}
                          min={1}
                          max={50}
                          value={numberTransformer.input(value)}
                          onChange={(e) =>
                            onChange(numberTransformer.output(e))
                          }
                        >
                          <NumberInputField ref={ref} />
                        </NumberInput>
                      )}
                    />
                    <button
                      type="button"
                      disabled={alliesClanFields.length < 2}
                      onClick={() => {
                        alliesRemove(index);
                      }}
                    >
                      <Delete24Regular />
                    </button>
                  </>
                ))}
              </Grid>
              <button
                type="button"
                onClick={() => {
                  alliesAppend({ players: 0, tag: "" });
                }}
                className="flex justify-center"
              >
                <Add24Regular />
                Add Clan
              </button>
            </Stack>
          </Stack>
          <button type="submit" className="text-center w-full">
            Submit
          </button>
        </form>
      </GlassPanel>
    </div>
  );
};

export default ReportMatch;
