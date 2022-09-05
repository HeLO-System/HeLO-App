import { MapDirections, StrongpointImages, Strongpoints } from "@constants";
import { Map } from "@types";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FC, useCallback, useEffect, useState } from "react";

const zIndices = { image: 0, strongpoints: 1 };
const MAX_CAPS = 5;
const ORIGINAL_MAP_SIZE = 1920;
const ORIGINAL_STRONGPOINT_SIZE = 300;

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
};

export const TacmapFabric: FC<TacmapFabricProps> = ({
  map,
  strongpoints,
  switchStrongpoint,
}) => {
  const [img, setImg] = useState<fabric.Image>();

  const { editor, onReady } = useFabricJSEditor();

  const addStrongpoint = useCallback(
    (strongpoint: string) => {
      fabric.Image.fromURL(
        `./hll_maps/strongpoints/${map.toLowerCase()}/${strongpoint}.png`,
        (image) => {
          const scale = (editor?.canvas.height as number) / ORIGINAL_MAP_SIZE;
          image.scaleToHeight(
            ORIGINAL_STRONGPOINT_SIZE *
              ((editor?.canvas.height as number) / ORIGINAL_MAP_SIZE)
          );
          image.set(
            "top",
            Math.ceil(StrongpointImages[map][strongpoint].top * scale)
          );
          image.set("left", StrongpointImages[map][strongpoint].left * scale);

          editor?.canvas.add(image);
          image.on("mousedown", () => {
            editor?.canvas.remove(image);
            switchStrongpoint(strongpoint);
          });
        },
        {
          selectable: false,
          zIndex: zIndices.strongpoints,
          name: `sp-${strongpoint}`,
        } as fabric.IImageOptions
      );
    },
    [editor?.canvas, map, switchStrongpoint]
  );

  const onClick = useCallback(
    ({ pointer }: fabric.IEvent<Event>) => {
      if (!pointer || !editor?.canvas) return;
      const strongpoint = getStrongpoint(
        pointer,
        map,
        editor.canvas.height as number
      );
      if (!strongpoint) return;
      switchStrongpoint(strongpoint);
    },
    [editor?.canvas, map, switchStrongpoint]
  );

  useEffect(() => {
    if (editor && !img) {
      fabric.Image.fromURL(
        `./hll_maps/${map}.png`,
        (image) => {
          image.scaleToHeight(editor.canvas.height as number);
          editor.canvas.add(image);

          setImg(image);
        },
        { selectable: false, zIndex: zIndices.image } as fabric.IImageOptions
      );
    }
  }, [editor, img, map]);

  useEffect(() => {
    if (img) {
      img.on("mousedown", onClick);
    }
    return () => {
      img?.off("mousedown");
    };
  }, [img, onClick, strongpoints]);

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
    editor?.canvas
      .getObjects()
      .filter((strongpoint) => strongpoint.name?.startsWith("sp-"))
      .forEach((strongpoint) => {
        strongpoint.off("mousedown");
        strongpoint.on("mousedown", () => {
          editor.canvas.remove(strongpoint);
          switchStrongpoint((strongpoint.name as string).slice(3));
        });
      });
    return () => {
      editor?.canvas
        .getObjects()
        .filter((o) => o.name?.startsWith("sp-"))
        .forEach((strongpoint) => strongpoint.off("mousedown"));
    };
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
