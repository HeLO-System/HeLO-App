import { AccessRoles } from "@schemas";
import { Session } from "next-auth";

export const isTeamManager = (session: Session) =>
  session?.user.roles.includes(AccessRoles.Values.ADMIN) ||
  session?.user.roles.includes(AccessRoles.Values.TEAM_MANAGER);

export const isAdmin = (session: Session) =>
  session?.user.roles.includes(AccessRoles.Values.ADMIN);
