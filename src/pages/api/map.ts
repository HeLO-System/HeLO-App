/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Maps, StrongpointImages } from "@constants";
import { Map } from "@types";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import path from "path";
import sharp from "sharp";

const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const map = req.query.map?.toString() as Map;
  const strongpoints = req.query.strongpoints?.toString().split(",");

  if (!map || !Maps.options.includes(map))
    return res.status(400).json({
      error: `Invalid map. Should be one of: ${Maps.options.join(", ")}`,
    });

  try {
    strongpoints?.forEach((strongpoint) => {
      if (!Object.keys(StrongpointImages[map]).includes(strongpoint))
        throw new Error(
          `${strongpoint} is not a valid strongpoint. Should be one of: ${Object.keys(
            StrongpointImages[map]
          ).join(", ")}`
        );
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: (error as Error).message });
  }

  const folderPath = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    `./public/hll_maps/${map.toLowerCase()}`
  );
  const getImgPath = (strongpoint: string): string =>
    path.join(folderPath, `${strongpoint}.png`);

  res.statusCode = 200;

  // setting our cache duration
  const cacheMaxAge = 30 * 60; // 30 minutes
  res.setHeader("cache-control", `public, max-age=${cacheMaxAge}`);

  // setting our "Content-Type" as an image file
  res.setHeader("Content-Type", "image/webp");

  // final res

  return sharp(getImgPath("map_blank"))
    .composite([
      ...(strongpoints || []).map((point) => ({
        input: getImgPath(point),
        left: StrongpointImages[map][point].left,
        top: StrongpointImages[map][point].top,
      })),
    ])
    .toBuffer()
    .then((data) => sharp(data).webp().pipe(res));
};
