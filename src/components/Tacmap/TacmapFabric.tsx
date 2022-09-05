import { MapDirections, StrongpointImages, Strongpoints } from "@constants";
import { Map } from "@types";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useKeyListener } from "hooks/KeyListener";
import { FC, useCallback, useEffect, useState } from "react";

const zIndices = {
  image: 0,
  hq: 1,
  strongpoints: 2,
  factionOverlay: 3,
  clickOverlay: 4,
  markers: 5,
};
const MAX_CAPS = 5;
const ORIGINAL_MAP_SIZE = 1920;
const ORIGINAL_STRONGPOINT_SIZE = 300;

type zIndexed = { zIndex: number };

const getStrongpoint = (
  pointer: fabric.Point,
  map: Map,
  canvasHeight: number
): string | undefined => {
  let yIndex = Math.floor(pointer.y / (canvasHeight / MAX_CAPS));
  let xIndex = Math.floor(pointer.x / (canvasHeight / MAX_CAPS));
  if (MapDirections[map] === "btt" || MapDirections[map] === "ttb") {
    xIndex -= 1;
    if (MapDirections[map] === "btt") {
      yIndex = MAX_CAPS - 1 - yIndex;
    }
  } else if (MapDirections[map] === "rtl") {
    const tmp = yIndex;
    yIndex = MAX_CAPS - 1 - xIndex;
    xIndex = tmp - 1;
  } else {
    const tmp = yIndex;
    yIndex = xIndex;
    xIndex = tmp - 1;
  }
  return Strongpoints[map][yIndex][xIndex];
};

const getColor = (color: string) => {
  switch (color) {
    case "red":
      return "rgba(255,0,48,0.25)";
    case "blue":
      return "rgba(0,130,255,0.25)";
    default:
      return "rgba(0,0,0,0)";
  }
};

type TacmapFabricProps = {
  map: Map;
  strongpoints: string[];
  switchStrongpoint: (strongpoint: string) => void;
  activeTab: number;
  placeElement: string;
  axisColor: string;
  alliesColor: string;
  axisCaps: number;
  alliesCaps: number;
};

export const TacmapFabric: FC<TacmapFabricProps> = ({
  map,
  strongpoints,
  switchStrongpoint,
  activeTab,
  placeElement,
  axisColor,
  alliesColor,
  axisCaps,
  alliesCaps,
}) => {
  const [img, setImg] = useState<fabric.Image>();
  const [overlay] = useState<fabric.Rect>(
    new fabric.Rect({
      top: 0,
      left: 0,
      selectable: false,
      fill: "rgba(0,0,0,0)",
      zIndex: zIndices.clickOverlay,
    } as fabric.IRectOptions)
  );
  const [axisOverlay] = useState<fabric.Rect>(
    new fabric.Rect({
      fill: getColor(axisColor),
      selectable: false,
      zIndex: zIndices.factionOverlay,
    } as fabric.IRectOptions)
  );
  const [alliesOverlay] = useState<fabric.Rect>(
    new fabric.Rect({
      fill: getColor(alliesColor),
      selectable: false,
      zIndex: zIndices.factionOverlay,
    } as fabric.IRectOptions)
  );

  const { editor, onReady } = useFabricJSEditor();

  useKeyListener(["Backspace", "Delete"], () => {
    editor?.canvas.remove(...editor.canvas.getActiveObjects());
  });

  const sortObjects = useCallback(() => {
    // eslint-disable-next-line no-underscore-dangle
    editor?.canvas._objects.sort((a, b) =>
      (a as unknown as zIndexed).zIndex > (b as unknown as zIndexed).zIndex
        ? 1
        : -1
    );
    editor?.canvas.renderAll();
  }, [editor?.canvas]);

  const addStrongpoint = useCallback(
    (strongpoint: string) => {
      fabric.Image.fromURL(
        `./hll_maps/strongpoints/${map.toLowerCase()}/${strongpoint}.png`,
        (image) => {
          const scale = (editor?.canvas.height as number) / ORIGINAL_MAP_SIZE;
          image.scaleToHeight(ORIGINAL_STRONGPOINT_SIZE * scale);
          image.set(
            "top",
            Math.floor(StrongpointImages[map][strongpoint].top * scale)
          );
          image.set("left", StrongpointImages[map][strongpoint].left * scale);

          editor?.canvas.add(image);
          sortObjects();
        },
        {
          selectable: false,
          zIndex: zIndices.strongpoints,
          name: `sp-${strongpoint}`,
        } as fabric.IImageOptions
      );
    },
    [editor?.canvas, map, sortObjects]
  );

  const addMarker = useCallback(
    (marker: string, position: fabric.Point) => {
      fabric.Image.fromURL(`./hll_icons/HLL${marker}.png`, (image) => {
        const height =
          (32 * (editor?.canvas.height as number)) / ORIGINAL_MAP_SIZE;
        image.scaleToHeight(height);

        const polygon = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: height, y: 0 },
            { x: height, y: height },
            { x: height / 2, y: height * 1.5 },
            { x: 0, y: height },
          ],
          {
            fill: "#b4a66b",
          }
        );

        const group = new fabric.Group([polygon, image], {
          top: position.y - height / 2,
          left: position.x - height / 2,
          zIndex: zIndices.markers,
          name: `m-${marker}`,
          hasControls: false,
        } as fabric.IGroupOptions);

        editor?.canvas.add(group);
        sortObjects();
      });
    },
    [editor?.canvas, sortObjects]
  );

  const onClick = useCallback(
    ({ pointer }: fabric.IEvent<Event>) => {
      if (!pointer || !editor?.canvas) return;
      if (activeTab === 0) {
        const strongpoint = getStrongpoint(
          pointer,
          map,
          editor.canvas.height as number
        );
        if (!strongpoint) return;
        switchStrongpoint(strongpoint);
      } else if (activeTab === 1 && placeElement) {
        addMarker(placeElement, pointer);
      }
    },
    [activeTab, addMarker, editor?.canvas, map, placeElement, switchStrongpoint]
  );

  useEffect(() => {
    if (editor && !img) {
      fabric.Image.fromURL(
        `./hll_maps/${map}.png`,
        (image) => {
          image.scaleToHeight(editor.canvas.height as number);
          editor.canvas.add(image);

          setImg(image);
          overlay.set("width", image.width);
          overlay.set("height", image.height);
          editor.canvas.add(overlay);
          editor.canvas.add(axisOverlay);
          editor.canvas.add(alliesOverlay);
        },
        { selectable: false, zIndex: zIndices.image } as fabric.IImageOptions
      );
    }
  }, [alliesOverlay, axisOverlay, editor, img, map, overlay]);

  useEffect(() => {
    overlay.on("mousedown", onClick);

    return () => {
      overlay.off("mousedown");
    };
  }, [onClick, overlay, strongpoints, activeTab, placeElement]);

  useEffect(() => {
    editor?.canvas
      .getObjects()
      .filter(
        (strongpoint) =>
          strongpoint.name?.startsWith("sp-") &&
          !strongpoints.includes(strongpoint.name.slice(3))
      )
      .forEach((strongpoint) => {
        editor.canvas.remove(strongpoint);
      });
    strongpoints
      .filter(
        (strongpoint) =>
          !editor?.canvas
            .getObjects()
            .map((o) => o.name as string)
            .includes(`sp-${strongpoint}`)
      )
      .forEach((strongpoint) => addStrongpoint(strongpoint));
  }, [addStrongpoint, editor?.canvas, strongpoints, switchStrongpoint]);

  useEffect(() => {
    img?.setSrc(`./hll_maps/${map}.png`, () => {
      editor?.canvas.renderAll();
    });
  }, [editor?.canvas, img, map]);

  useEffect(() => {
    if (editor?.canvas.height) {
      const gridSize = editor.canvas.height / MAX_CAPS;
      switch (MapDirections[map]) {
        case "ltr":
          axisOverlay.set("top", 0);
          axisOverlay.set("left", 0);
          axisOverlay.set("width", gridSize * axisCaps);
          axisOverlay.set("height", editor.canvas.height);
          axisOverlay.set("fill", getColor(axisColor));

          alliesOverlay.set("top", 0);
          alliesOverlay.set(
            "left",
            editor.canvas.height - gridSize * alliesCaps
          );
          alliesOverlay.set("width", gridSize * alliesCaps);
          alliesOverlay.set("height", editor.canvas.height);
          alliesOverlay.set("fill", getColor(alliesColor));
          break;
        case "rtl":
          alliesOverlay.set("top", 0);
          alliesOverlay.set("left", 0);
          alliesOverlay.set("width", gridSize * alliesCaps);
          alliesOverlay.set("height", editor.canvas.height);
          alliesOverlay.set("fill", getColor(alliesColor));

          axisOverlay.set("top", 0);
          axisOverlay.set("left", editor.canvas.height - gridSize * axisCaps);
          axisOverlay.set("width", gridSize * axisCaps);
          axisOverlay.set("height", editor.canvas.height);
          axisOverlay.set("fill", getColor(axisColor));
          break;
        case "btt":
          alliesOverlay.set("top", 0);
          alliesOverlay.set("left", 0);
          alliesOverlay.set("width", editor.canvas.height);
          alliesOverlay.set("height", gridSize * alliesCaps);
          alliesOverlay.set("fill", getColor(alliesColor));

          axisOverlay.set("top", editor.canvas.height - gridSize * axisCaps);
          axisOverlay.set("left", 0);
          axisOverlay.set("width", editor.canvas.height);
          axisOverlay.set("height", gridSize * axisCaps);
          axisOverlay.set("fill", getColor(axisColor));
          break;

        default:
          axisOverlay.set("top", 0);
          axisOverlay.set("left", 0);
          axisOverlay.set("width", editor.canvas.height);
          axisOverlay.set("height", gridSize * axisCaps);
          axisOverlay.set("fill", getColor(axisColor));

          alliesOverlay.set(
            "top",
            editor.canvas.height - gridSize * alliesCaps
          );
          alliesOverlay.set("left", 0);
          alliesOverlay.set("width", editor.canvas.height);
          alliesOverlay.set("height", gridSize * alliesCaps);
          alliesOverlay.set("fill", getColor(alliesColor));
          break;
      }
      sortObjects();
    }
  }, [
    alliesCaps,
    alliesColor,
    alliesOverlay,
    axisCaps,
    axisColor,
    axisOverlay,
    editor?.canvas.height,
    map,
    sortObjects,
  ]);

  return (
    <FabricJSCanvas
      className="aspect-square h-full max-w-full"
      onReady={onReady}
    />
  );
};
