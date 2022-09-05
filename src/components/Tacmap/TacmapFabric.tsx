/* eslint-disable react-hooks/exhaustive-deps */
import { MapDirections, StrongpointImages, Strongpoints } from "@constants";
import { Map } from "@types";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FC, useEffect, useState } from "react";

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
};

export const TacmapFabric: FC<TacmapFabricProps> = ({ map }) => {
  const [img, setImg] = useState<fabric.Image>();
  const [strongpoints, setStrongpoints] = useState<
    Record<string, fabric.Image>
  >({});

  const { editor, onReady } = useFabricJSEditor();

  const switchStrongPoints = (strongpoint: string) => {
    if (strongpoints[strongpoint]) {
      editor?.canvas.remove(strongpoints[strongpoint]);
      const newStrongpoints = { ...strongpoints };
      delete newStrongpoints[strongpoint];
      setStrongpoints({ ...newStrongpoints });
    } else {
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
          setStrongpoints({
            ...strongpoints,
            [strongpoint]: image,
          });
        },
        {
          selectable: false,
          zIndex: zIndices.strongpoints,
        } as fabric.IImageOptions
      );
    }
  };

  const onClick = ({ pointer }: fabric.IEvent<Event>) => {
    if (!pointer || !editor?.canvas) return;
    const strongpoint = getStrongpoint(
      pointer,
      map,
      editor.canvas.height as number
    );
    if (!strongpoint) return;
    switchStrongPoints(strongpoint);
  };

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
  }, [editor, img, strongpoints, onClick]);

  useEffect(() => {
    if (img) {
      img.on("mousedown", onClick);
    }
    return () => {
      img?.off("mousedown");
    };
  }, [img, onClick, strongpoints]);

  useEffect(() => {
    Object.entries(strongpoints).forEach(([strongpoint, image]) => {
      image.on("mousedown", () => switchStrongPoints(strongpoint));
    });
    return () => {
      Object.values(strongpoints).forEach((image) => image.off("mousedown"));
    };
  }, [strongpoints, switchStrongPoints]);

  useEffect(() => {
    img?.setSrc(`./hll_maps/${map}.png`, () => {
      editor?.canvas.remove(...Object.values(strongpoints));
      setStrongpoints({});
      editor?.canvas.renderAll();
    });
  }, [map]);

  return (
    <FabricJSCanvas
      className="aspect-square h-full max-w-full"
      onReady={onReady}
    />
  );
};
