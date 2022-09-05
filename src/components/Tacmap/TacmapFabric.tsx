import { MapDirections, StrongpointImages, Strongpoints } from "@constants";
import { Map } from "@types";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useKeyListener } from "hooks/KeyListener";
import { FC, useCallback, useEffect, useState } from "react";

const zIndices = { image: 0, hq: 1, strongpoints: 2, overlay: 3, markers: 4 };
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

type TacmapFabricProps = {
  map: Map;
  strongpoints: string[];
  switchStrongpoint: (strongpoint: string) => void;
  activeTab: number;
  placeElement: string;
};

export const TacmapFabric: FC<TacmapFabricProps> = ({
  map,
  strongpoints,
  switchStrongpoint,
  activeTab,
  placeElement,
}) => {
  const [img, setImg] = useState<fabric.Image>();
  const [overlay, setOverlay] = useState<fabric.Rect>(new fabric.Rect());

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
      fabric.Image.fromURL(
        `./hll_icons/HLL${marker}.png`,
        (image) => {
          const height =
            (64 * (editor?.canvas.height as number)) / ORIGINAL_MAP_SIZE;
          image.scaleToHeight(height);
          image.set("top", position.y - height / 2);
          image.set("left", position.x - height / 2);

          editor?.canvas.add(image);
          sortObjects();
        },
        {
          hasControls: false,
          zIndex: zIndices.markers,
          name: `m-${marker}`,
        } as fabric.IImageOptions
      );
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
      } else if (activeTab === 3 && placeElement) {
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
          const rect = new fabric.Rect({
            top: 0,
            left: 0,
            width: image.width,
            height: image.height,
            selectable: false,
            fill: "rgba(0,0,0,0)",
            zIndex: zIndices.overlay,
          } as fabric.IRectOptions);
          editor.canvas.add(rect);
          setOverlay(rect);
        },
        { selectable: false, zIndex: zIndices.image } as fabric.IImageOptions
      );
    }
  }, [editor, img, map]);

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

  return (
    <FabricJSCanvas
      className="aspect-square h-full max-w-full"
      onReady={onReady}
    />
  );
};
