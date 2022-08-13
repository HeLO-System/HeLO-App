import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import { MapDirections, Maps, Strongpoints } from "@constants";
import { Map } from "@types";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TacmapStrongpointStack } from "./TacMapStrongpointStack";

type TacmapFormProps = {
  setImageUrl: (url: string) => void;
};

export type TacmapUrlForm = {
  map: Map;
  caps: string[];
  hd: boolean;
};

export const TacmapForm: FC<TacmapFormProps> = ({ setImageUrl }) => {
  const {
    control,
    resetField,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TacmapUrlForm>({
    defaultValues: { map: Maps.enum.Carentan, caps: [], hd: false },
  });
  const [capDirections, setCapDirections] = useState<
    [
      "row" | "column" | "row-reverse" | "column-reverse",
      "row" | "column" | "row-reverse" | "column-reverse"
    ]
  >(["row", "row"]);

  const fields = watch();

  useEffect(() => {
    const strongpoints = fields.caps.filter((cap) => cap).join(",");
    setImageUrl(
      `/api/map?map=${fields.map}${
        strongpoints ? `&strongpoints=${strongpoints}` : ""
      }${fields.hd ? "" : "&width=960&height=960"}`
    );
  }, [fields.caps, fields.hd, fields.map, setImageUrl]);

  useEffect(() => {
    switch (MapDirections[fields.map]) {
      case "rtl":
        setCapDirections(["row-reverse", "column"]);
        break;
      case "ttb":
        setCapDirections(["column", "row"]);
        break;
      case "btt":
        setCapDirections(["column-reverse", "row"]);
        break;
      default:
        setCapDirections(["row", "column"]);
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
