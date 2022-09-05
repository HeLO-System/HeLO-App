/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Maps } from "@constants";
import {
  Flag24Filled,
  Map24Filled,
  Star24Regular,
  Toolbox24Filled,
} from "@fluentui/react-icons";
import { Map } from "@types";
import { FC, useState } from "react";
import { TacmapFabric } from "./TacmapFabric";

const defaultMap = Maps.Values.Foy;

export type TacmapsProps = object;

export const Tacmaps: FC<TacmapsProps> = () => {
  const [map, setMap] = useState<Map>(defaultMap);

  return (
    <Stack>
      <Tabs>
        <TabList>
          <Tab>
            <Map24Filled />
          </Tab>
          <Tab>
            <Star24Regular />
          </Tab>
          <Tab>
            <Flag24Filled />
          </Tab>
          <Tab>
            <Toolbox24Filled />
          </Tab>
        </TabList>
        <TabPanels className="h-28">
          <TabPanel>
            <FormControl>
              <FormLabel htmlFor="map">Map</FormLabel>
              <Select
                id="map"
                value={map}
                onChange={(event) => {
                  setMap(event.target.value as Map);
                }}
              >
                {Maps.options.map((mapOption) => (
                  <option value={mapOption} key={mapOption}>
                    {mapOption}
                  </option>
                ))}
              </Select>
            </FormControl>
          </TabPanel>
          <TabPanel>two</TabPanel>
          <TabPanel>three</TabPanel>
          <TabPanel>four</TabPanel>
        </TabPanels>
      </Tabs>
      <Box className="h-screen flex justify-center">
        <TacmapFabric map={map} />
      </Box>
    </Stack>
  );
};
