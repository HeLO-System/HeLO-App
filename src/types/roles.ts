import { AccessRoles } from "@schemas";
import { z } from "zod";

export type AccessRole = z.infer<typeof AccessRoles>;
