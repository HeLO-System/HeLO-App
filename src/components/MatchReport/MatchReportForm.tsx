/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Maps, Strongpoints } from "@constants";
import { MatchResults, MatchTypes } from "@schemas";
import {
  Factions,
  Map,
  MatchReport,
  MatchReportClan,
  MatchResult,
  MatchType,
} from "@types";
import { enumKeys, isoDateString, numberTransformer } from "@util";
import axios, { AxiosError } from "axios";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { appConfig } from "util/appConfig";
import { MatchReportClanForm } from "./MatchReportClanForm";

type CapType = {
  name: string;
};

export type ReportMatchForm = {
  matchType: MatchType;
  map: Map;
  result: MatchResult;
  date: Date;
  time: number;
  caps: CapType[];
  axisClans: MatchReportClan[];
  alliesClans: MatchReportClan[];
  axisOther: MatchReportClan[];
  alliesOther: MatchReportClan[];
  streamUrl: string;
  event?: string;
  comment?: string;
  attacker: Factions;
};

export const MatchReportForm: FC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    resetField,
  } = useForm<ReportMatchForm & { offensive?: boolean }>({
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

  const selectedMap = watch("map");
  const selectedMatchType = watch("matchType");
  const offensive = watch("offensive");

  const [error, setError] = useState<
    AxiosError<{ message: string }> | undefined
  >();
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | undefined
  >();

  const onSubmit = async ({
    alliesClans,
    axisClans,
    caps,
    date,
    map,
    matchType,
    result,
    time,
    streamUrl,
    event,
    comment,
    attacker,
    axisOther,
    alliesOther,
  }: ReportMatchForm) => {
    const transformedDate: MatchReport = {
      alliesClans: alliesClans as MatchReport["alliesClans"],
      axisClans: axisClans as MatchReport["axisClans"],
      map,
      matchType,
      result,
      date: isoDateString(date),
      time,
      caps: caps.map((cap) => cap.name) as MatchReport["caps"],
      streamUrl,
      event,
      comment,
    };
    if (
      matchType === MatchTypes.Values.Placement ||
      appConfig.reportMatchAlwaysAllowOther
    ) {
      transformedDate.axisOther = axisOther;
      transformedDate.alliesOther = alliesOther;
    }
    if (offensive) transformedDate.attacker = attacker;

    setStatus("loading");
    await axios
      .post("/api/reportMatch", transformedDate)
      .then(() => {
        setStatus("success");
      })
      .catch((e: AxiosError<{ message: string }>) => {
        setError(e);
        setStatus("error");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Stack direction={{ base: "column", md: "row" }}>
          <Controller
            name="matchType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.matchType}>
                <FormLabel htmlFor="matchType">Match type</FormLabel>
                <RadioGroup
                  onChange={(e) => {
                    resetField("comment");
                    resetField("event");
                    onChange(e);
                  }}
                  value={value}
                  id="matchType"
                >
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
          {(selectedMatchType === MatchTypes.Values.Competitive && (
            <Controller
              name="event"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.event}>
                  <FormLabel htmlFor="event">Eventname</FormLabel>
                  <Input
                    id="event"
                    value={value}
                    onChange={(event) => {
                      onChange(event);
                    }}
                  />
                  <FormErrorMessage>
                    {errors.event && errors.event.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
          )) || (
            <Controller
              name="comment"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.comment}>
                  <FormLabel htmlFor="comment">Comment (optional)</FormLabel>
                  <Input
                    id="comment"
                    value={value}
                    onChange={(comment) => {
                      onChange(comment);
                    }}
                  />
                  <FormErrorMessage>
                    {errors.comment && errors.comment.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
          )}
        </Stack>
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: appConfig.reportMatchAllowOffensive ? "2fr 1fr 2fr" : "1fr",
          }}
          gap={4}
        >
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
          {appConfig.reportMatchAllowOffensive && (
            <Controller
              name="offensive"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                  checked={value}
                  flex={1}
                >
                  Offensive?
                </Checkbox>
              )}
            />
          )}

          {offensive && (
            <Controller
              name="attacker"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.attacker}>
                  <FormLabel htmlFor="attacker">Attacker</FormLabel>
                  <Select
                    id="attacker"
                    value={value}
                    onChange={(event) => {
                      resetField("caps");
                      onChange(event);
                    }}
                  >
                    {enumKeys(Factions).map((faction) => (
                      <option value={faction} key={faction}>
                        {faction}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.attacker && errors.attacker.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
          )}
        </Grid>
        <Controller
          name="result"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.result}>
              <FormLabel htmlFor="result">Match result</FormLabel>
              <RadioGroup onChange={onChange} value={value} id="result">
                <Stack direction={{ base: "column", md: "row" }}>
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
                {errors.time && errors.time.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
        <Stack direction={{ base: "column", md: "row" }}>
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

        <Stack direction={{ base: "column", md: "row" }} gap={8}>
          {enumKeys(Factions)
            .reverse()
            .map((faction) => (
              <Stack className="flex-1">
                <h2 className="w-full text-center text-2xl flex justify-center items-center gap-2">
                  <img
                    src={`/ico_HLL${faction}.png`}
                    alt={`${faction}-Logo`}
                    className="h-8 w-8"
                  />
                  {faction}
                </h2>
                <h3 className="w-full text-center text-xl flex justify-center items-center">
                  HeLO Clans:
                </h3>
                <MatchReportClanForm
                  side={faction as Factions}
                  control={control}
                  register={register}
                />
                {(selectedMatchType === MatchTypes.Values.Placement ||
                  appConfig.reportMatchAlwaysAllowOther) && (
                  <>
                    <h3 className="w-full text-center text-xl flex justify-center items-center">
                      Other:
                    </h3>
                    <MatchReportClanForm
                      side={faction as Factions}
                      control={control}
                      register={register}
                      other
                    />
                  </>
                )}
              </Stack>
            ))}
        </Stack>
        <Controller
          name="streamUrl"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.streamUrl}>
              <FormLabel htmlFor="streamUrl">
                Link to stream (optional)
              </FormLabel>
              <Input
                id="streamUrl"
                value={value}
                onChange={(event) => {
                  onChange(event);
                }}
              />
              <FormErrorMessage>
                {errors.streamUrl && errors.streamUrl.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
        <Box className="w-full flex justify-center !mt-8">
          <Button
            type="submit"
            variant="solid"
            backgroundColor="orange.500"
            isLoading={status === "loading"}
          >
            Submit
          </Button>
        </Box>
        <Alert status="success" hidden={status !== "success"}>
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            You successfully reported the match
          </AlertDescription>
        </Alert>
        <Alert status="error" hidden={status !== "error"}>
          <AlertIcon />
          <AlertTitle>{error?.response?.statusText}</AlertTitle>
          <AlertDescription>{error?.response?.data.message}</AlertDescription>
        </Alert>
      </Stack>
    </form>
  );
};
