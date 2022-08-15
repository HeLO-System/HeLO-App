/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
} from "@chakra-ui/react";
import { MapDirections, Maps, Strongpoints } from "@constants";
import { Map } from "@types";
import { numberTransformer } from "@util";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TacmapStrongpointStack } from "./TacMapStrongpointStack";

type TacmapFormProps = {
  setImageUrl: (url: string) => void;
};

export type Directions = "row" | "column" | "row-reverse" | "column-reverse";

const Colors = z.enum(["red", "blue", ""]);
type Color = z.infer<typeof Colors>;

export type TacmapUrlForm = {
  map: Map;
  caps: string[];
  hd: boolean;
  axisColor?: Color;
  alliesColor?: Color;
  axisCaps?: number;
  alliesCaps?: number;
};

export const TacmapForm: FC<TacmapFormProps> = ({ setImageUrl }) => {
  const {
    control,
    resetField,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TacmapUrlForm>({
    defaultValues: {
      map: Maps.enum.Carentan,
      caps: [],
      hd: false,
      axisColor: "red",
      alliesColor: "blue",
      axisCaps: 2,
      alliesCaps: 2,
    },
  });
  const [capDirections, setCapDirections] = useState<
    [Directions, Directions, Directions]
  >(["row", "row", "row-reverse"]);

  const fields = watch();

  useEffect(() => {
    const strongpoints = fields.caps.filter((cap) => cap).join(",");
    console.log(fields.axisColor, fields.axisCaps);
    setImageUrl(
      `https://tacmaps.helo-system.de/tacmap?map=${fields.map}${
        strongpoints ? `&strongpoints=${strongpoints}` : ""
      }${fields.hd ? "&width=960&height=960" : ""}${
        fields.axisCaps && fields.axisColor
          ? `&axisCaps=${fields.axisCaps}&axisColor=${fields.axisColor}`
          : ""
      }${
        fields.alliesCaps && fields.alliesColor
          ? `&alliesCaps=${fields.alliesCaps}&alliesColor=${fields.alliesColor}`
          : ""
      }`
    );
  }, [fields, setImageUrl]);

  useEffect(() => {
    switch (MapDirections[fields.map]) {
      case "rtl":
        setCapDirections(["row-reverse", "column", "row-reverse"]);
        break;
      case "ttb":
        setCapDirections(["column", "row", "row"]);
        break;
      case "btt":
        setCapDirections(["column-reverse", "row", "row-reverse"]);
        break;
      default:
        setCapDirections(["row", "column", "row"]);
        break;
    }
  }, [fields.map]);

  return (
    <form>
      <Stack gap={4} alignItems="end">
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
        <Stack direction={{ base: "column", md: capDirections[0] }} w="100%">
          {Strongpoints[fields.map].map((caps, i) => (
            <TacmapStrongpointStack
              direction={capDirections[1]}
              caps={caps}
              control={control}
              index={i}
              key={caps.join()}
            />
          ))}
        </Stack>
        <Stack
          direction={{
            base: capDirections[2].replace("row", "column") as Directions,
            md: capDirections[2],
          }}
          w="100%"
        >
          <Controller
            name="axisColor"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.axisColor}>
                <FormLabel htmlFor="axisColor">Axis Color</FormLabel>
                <Select
                  id="axisColor"
                  value={value}
                  onChange={(event) => {
                    resetField("caps");
                    onChange(event);
                  }}
                >
                  {Colors.options.map((color) => (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.axisColor && errors.axisColor.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="axisCaps"
            control={control}
            render={({ field: { ref, value, onChange, ...field } }) => (
              <FormControl isInvalid={!!errors.axisCaps}>
                <FormLabel htmlFor="axisCaps">Axis Caps</FormLabel>
                <NumberInput
                  value={numberTransformer.input(value)}
                  onChange={(e) => onChange(numberTransformer.output(e))}
                  {...field}
                  min={0}
                  max={5}
                  id="axisCaps"
                >
                  <NumberInputField name="axisCaps" ref={ref} />
                </NumberInput>
                <FormErrorMessage>
                  {errors.axisCaps && errors.axisCaps.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="alliesCaps"
            control={control}
            render={({ field: { ref, value, onChange, ...field } }) => (
              <FormControl isInvalid={!!errors.alliesCaps}>
                <FormLabel htmlFor="alliesCaps">Allies Caps</FormLabel>
                <NumberInput
                  value={numberTransformer.input(value)}
                  onChange={(e) => onChange(numberTransformer.output(e))}
                  {...field}
                  min={0}
                  max={5}
                  id="alliesCaps"
                >
                  <NumberInputField name="alliesCaps" ref={ref} />
                </NumberInput>
                <FormErrorMessage>
                  {errors.alliesCaps && errors.alliesCaps.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="alliesColor"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl isInvalid={!!errors.alliesColor}>
                <FormLabel htmlFor="alliesColor">Allies Color</FormLabel>
                <Select
                  id="alliesColor"
                  value={value}
                  onChange={(event) => {
                    resetField("caps");
                    onChange(event);
                  }}
                >
                  {Colors.options.map((color) => (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.alliesColor && errors.alliesColor.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        </Stack>
        <ButtonGroup isAttached pr={{ base: 0, md: 8 }}>
          <Button
            variant={fields.hd ? "outline" : "solid"}
            onClick={() => setValue("hd", false)}
          >
            720p
          </Button>
          <Button
            variant={fields.hd ? "solid" : "outline"}
            onClick={() => setValue("hd", true)}
          >
            HD
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  );
};
