/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Maps, Strongpoints } from "@constants";
import { Map24Filled } from "@fluentui/react-icons";
import { Map } from "@types";
import { range } from "@util";
import { FC, useState } from "react";
import { TacmapFabric } from "./TacmapFabric";

const defaultMap = Maps.Values.Foy;
const markers = [
  "Airdrop",
  "Armor",
  "Artillery",
  "Attack",
  "Bomber",
  "Defend",
  "Garrison",
  "Infantry",
  "LightArmor",
  "Move",
  "Node",
  "Observe",
  "OP",
  "Smoke",
  "Strafe",
  "Supplies",
];
const colors = ["red", "blue", ""];

export type TacmapsProps = object;

export const Tacmaps: FC<TacmapsProps> = () => {
  const [map, setMap] = useState<Map>(defaultMap);
  const [strongpoints, setStrongpoints] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [placeElement, setPlaceElement] = useState<string>("");
  const [axisColor, setAxisColor] = useState<string>("blue");
  const [alliesColor, setAlliesColor] = useState<string>("red");
  const [axisCaps, setAxisCaps] = useState<number>(2);
  const [alliesCaps, setAlliesCaps] = useState<number>(2);
  const [enemyElement, setEnemyElement] = useState<boolean>(false);

  const switchStrongPoints = (strongpoint: string) => {
    if (strongpoints.includes(strongpoint)) {
      setStrongpoints(strongpoints.filter((sp) => sp !== strongpoint));
    } else {
      setStrongpoints([...strongpoints, strongpoint]);
    }
  };

  const changePlaceElement = (element: string) => {
    if (element === placeElement) {
      setPlaceElement("");
    } else {
      setPlaceElement(element);
    }
  };

  const randomCaps = () =>
    setStrongpoints(
      Strongpoints[map].map(
        (row) => row[Math.floor(Math.random() * row.length)]
      )
    );

  return (
    <Stack>
      <Tabs onChange={setActiveTab}>
        <TabList>
          <Tab>
            <Map24Filled />
          </Tab>
          <Tab>
            <img
              src="./hll_icons/HLLGarrison.png"
              className="w-6 h-6"
              alt="Garrison"
            />
          </Tab>
          <Tab>
            <img
              src="./hll_icons/HLLAxisAllies.png"
              className="w-6 h-6"
              alt="Garrison"
            />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack className="w-full">
              <FormControl>
                <FormLabel htmlFor="map">Map</FormLabel>
                <Select
                  id="map"
                  value={map}
                  onChange={(event) => {
                    setMap(event.target.value as Map);
                    setStrongpoints([]);
                  }}
                >
                  {Maps.options.map((mapOption) => (
                    <option value={mapOption} key={mapOption}>
                      {mapOption}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
            <ButtonGroup className="w-full mt-4" variant="outline">
              <Button
                onClick={() => {
                  setStrongpoints([]);
                }}
              >
                Reset Caps
              </Button>
              <Button onClick={randomCaps}>Random Caps</Button>
            </ButtonGroup>
          </TabPanel>
          <TabPanel className="flex items-center">
            <ButtonGroup>
              {markers.map((marker) => (
                <IconButton
                  variant={placeElement === marker ? "solid" : "outline"}
                  onClick={() => changePlaceElement(marker)}
                  aria-label={marker}
                  key={marker}
                >
                  <img
                    src={`./hll_icons/HLL${marker}.png`}
                    className="w-6 h-6"
                    alt={marker}
                  />
                </IconButton>
              ))}
            </ButtonGroup>
            <Checkbox
              className="ml-auto"
              size="lg"
              checked={enemyElement}
              onChange={(e) => setEnemyElement(e.target.checked)}
            >
              Enemy Markers
            </Checkbox>
          </TabPanel>
          <TabPanel>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="axisColor">Axis color</FormLabel>
                <Select
                  id="axisColor"
                  value={axisColor}
                  onChange={(event) => {
                    setAxisColor(event.target.value);
                  }}
                >
                  {colors.map((color) => (
                    <option value={color} key={`axis-${color}`}>
                      {color}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="axisCaps">Axis caps</FormLabel>
                <Select
                  id="axisCaps"
                  value={axisCaps}
                  onChange={(event) => {
                    setAxisCaps(Number.parseInt(event.target.value, 10));
                  }}
                >
                  {range(6).map((caps) => (
                    <option value={caps} key={`axis-${caps}`}>
                      {caps}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="alliesCaps">Allies caps</FormLabel>
                <Select
                  id="alliesCaps"
                  value={alliesCaps}
                  onChange={(event) => {
                    setAlliesCaps(Number.parseInt(event.target.value, 10));
                  }}
                >
                  {range(6).map((caps) => (
                    <option value={caps} key={`allies-${caps}`}>
                      {caps}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="alliesColor">Allies color</FormLabel>
                <Select
                  id="alliesColor"
                  value={alliesColor}
                  onChange={(event) => {
                    setAlliesColor(event.target.value);
                  }}
                >
                  {colors.map((color) => (
                    <option value={color} key={`allies-${color}`}>
                      {color}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box className="h-screen flex items-center flex-col gap-4">
        <TacmapFabric
          map={map}
          strongpoints={strongpoints}
          switchStrongpoint={switchStrongPoints}
          activeTab={activeTab}
          placeElement={placeElement}
          axisColor={axisColor}
          alliesColor={alliesColor}
          axisCaps={axisCaps}
          alliesCaps={alliesCaps}
          enemyElement={enemyElement}
        />
      </Box>
    </Stack>
  );
};
