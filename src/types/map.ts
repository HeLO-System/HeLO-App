import { Maps } from "@constants";
import { z } from "zod";

export type Map = z.infer<typeof Maps>;
