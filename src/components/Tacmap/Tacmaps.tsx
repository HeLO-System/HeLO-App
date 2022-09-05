/* eslint-disable @next/next/no-img-element */
import {
  Box,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
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
} from "@fluentui/react-icons";
import { Map } from "@types";
import { FC, useState } from "react";
import { TacmapFabric } from "./TacmapFabric";

const defaultMap = Maps.Values.Foy;

export type TacmapsProps = object;

export const Tacmaps: FC<TacmapsProps> = () => {
  const [map, setMap] = useState<Map>(defaultMap);
  const [strongpoints, setStrongpoints] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [placeElement, setPlaceElement] = useState<string>("");

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

  return (
    <Stack>
      <Tabs onChange={setActiveTab}>
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
            <img
              src="./hll_icons/HLLGarrison.png"
              className="w-6 h-6"
              alt="Garrison"
            />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>two</TabPanel>
          <TabPanel>three</TabPanel>
          <TabPanel>
            <ButtonGroup>
              <IconButton
                variant={placeElement === "Airdrop" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Airdrop")}
                aria-label="HLLAirdrop"
              >
                <img
                  src="./hll_icons/HLLAirdrop.png"
                  className="w-6 h-6"
                  alt="Airdrop"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Artillery" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Artillery")}
                aria-label="HLLArtillery"
              >
                <img
                  src="./hll_icons/HLLArtillery.png"
                  className="w-6 h-6"
                  alt="Artillery"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Bomber" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Bomber")}
                aria-label="HLLBomber"
              >
                <img
                  src="./hll_icons/HLLBomber.png"
                  className="w-6 h-6"
                  alt="Bomber"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Garrison" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Garrison")}
                aria-label="HLLGarrison"
              >
                <img
                  src="./hll_icons/HLLGarrison.png"
                  className="w-6 h-6"
                  alt="Garrison"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Infantry" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Infantry")}
                aria-label="HLLInfantry"
              >
                <img
                  src="./hll_icons/HLLInfantry.png"
                  className="w-6 h-6"
                  alt="Infantry"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Move" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Move")}
                aria-label="HLLMove"
              >
                <img
                  src="./hll_icons/HLLMove.png"
                  className="w-6 h-6"
                  alt="Move"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Observe" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Observe")}
                aria-label="HLLObserve"
              >
                <img
                  src="./hll_icons/HLLObserve.png"
                  className="w-6 h-6"
                  alt="Observe"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Smoke" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Smoke")}
                aria-label="HLLSmoke"
              >
                <img
                  src="./hll_icons/HLLSmoke.png"
                  className="w-6 h-6"
                  alt="Smoke"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Supplies" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Supplies")}
                aria-label="HLLSupplies"
              >
                <img
                  src="./hll_icons/HLLSupplies.png"
                  className="w-6 h-6"
                  alt="Supplies"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Armor" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Armor")}
                aria-label="HLLArmor"
              >
                <img
                  src="./hll_icons/HLLArmor.png"
                  className="w-6 h-6"
                  alt="Armor"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Attack" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Attack")}
                aria-label="HLLAttack"
              >
                <img
                  src="./hll_icons/HLLAttack.png"
                  className="w-6 h-6"
                  alt="Attack"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Defend" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Defend")}
                aria-label="HLLDefend"
              >
                <img
                  src="./hll_icons/HLLDefend.png"
                  className="w-6 h-6"
                  alt="Defend"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "HQ" ? "solid" : "outline"}
                onClick={() => changePlaceElement("HQ")}
                aria-label="HLLHQ"
              >
                <img src="./hll_icons/HLLHQ.png" className="w-6 h-6" alt="HQ" />
              </IconButton>
              <IconButton
                variant={placeElement === "LightArmor" ? "solid" : "outline"}
                onClick={() => changePlaceElement("LightArmor")}
                aria-label="HLLLightArmor"
              >
                <img
                  src="./hll_icons/HLLLightArmor.png"
                  className="w-6 h-6"
                  alt="LightArmor"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "Node" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Node")}
                aria-label="HLLNode"
              >
                <img
                  src="./hll_icons/HLLNode.png"
                  className="w-6 h-6"
                  alt="Node"
                />
              </IconButton>
              <IconButton
                variant={placeElement === "OP" ? "solid" : "outline"}
                onClick={() => changePlaceElement("OP")}
                aria-label="HLLOP"
              >
                <img src="./hll_icons/HLLOP.png" className="w-6 h-6" alt="OP" />
              </IconButton>
              <IconButton
                variant={placeElement === "Strafe" ? "solid" : "outline"}
                onClick={() => changePlaceElement("Strafe")}
                aria-label="HLLStrafe"
              >
                <img
                  src="./hll_icons/HLLStrafe.png"
                  className="w-6 h-6"
                  alt="Strafe"
                />
              </IconButton>
            </ButtonGroup>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box className="h-screen flex justify-center">
        <TacmapFabric
          map={map}
          strongpoints={strongpoints}
          switchStrongpoint={switchStrongPoints}
          activeTab={activeTab}
          placeElement={placeElement}
        />
      </Box>
    </Stack>
  );
};
