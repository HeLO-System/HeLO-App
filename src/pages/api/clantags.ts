/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Clan } from "@types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export type ClanTagStore = Record<string, string>;

const handler = (_req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  axios
    .get<Clan[]>("http://api.helo-system.de/clans", {
      params: { select: "tag" },
    })
    .then(({ data: clans }) =>
      res.status(200).json(
        clans.reduce((acc: ClanTagStore, curr) => {
          acc[curr._id.$oid] = curr.tag;
          return acc;
        }, {})
      )
    )
    .catch(() => res.status(500).json({ error: "Internal Server Error" }));

export default handler;
