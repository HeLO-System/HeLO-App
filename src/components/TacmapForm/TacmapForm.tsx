import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Maps, Strongpoints } from "@constants";
import { Map } from "@types";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TacmapStrongpointStack } from "./TacMapStrongpointStack";

type TacmapFormProps = {
  setImageUrl: (url: string) => void;
};

export type TacmapUrlForm = {
  map: Map;
  caps: string[];
};

export const TacmapForm: FC<TacmapFormProps> = ({ setImageUrl }) => {
  const {
    control,
    resetField,
    formState: { errors },
    watch,
  } = useForm<TacmapUrlForm>({
    defaultValues: { map: Maps.enum.Carentan, caps: [] },
  });

  const fields = watch();

  useEffect(() => {
    const strongpoints = fields.caps.filter((cap) => cap).join(",");
    setImageUrl(
      `/api/map?map=${fields.map}${
        strongpoints ? `&strongpoints=${strongpoints}` : ""
      }`
    );
  }, [fields.caps, fields.map, setImageUrl]);

  return (
    <form>
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
      <Stack direction="row" mt={4}>
        {Strongpoints[fields.map].map((caps, i) => (
          <TacmapStrongpointStack
            caps={caps}
            control={control}
            index={i}
            key={caps.join()}
          />
        ))}
      </Stack>
    </form>
  );
};
