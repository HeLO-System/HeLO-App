import { z } from "zod";

export const AccessRoles = z.enum(["ADMIN", "USER", "TEAM_MANAGER"]);
