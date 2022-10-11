/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import { Clan } from "@types";
import axios from "axios";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const DISCORD_TEAMMANAGER_ID = process.env.DISCORD_TEAMMANAGER_ID;
const DISCORD_IGNORE_ROLES = process.env.DISCORD_IGNORE_ROLES?.split(",");

const getGuildData = async (accessToken?: string) =>
  accessToken &&
  axios
    .get<{
      roles: string[];
      user: { username: string };
    }>(
      `https://discord.com/api/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then(({ data }) => data)
    .catch(console.error);

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+guilds.members.read",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const clanData = await getGuildData(account.access_token);

        if (clanData) {
          const additionalData: Partial<Session["user"]> = { isInGuild: true };
          if (DISCORD_TEAMMANAGER_ID) {
            additionalData.isTeamManager = clanData.roles.includes(
              DISCORD_TEAMMANAGER_ID
            );
          }
          if (DISCORD_TEAMMANAGER_ID && DISCORD_IGNORE_ROLES) {
            const clanRole = clanData.roles.filter(
              (role) =>
                !DISCORD_IGNORE_ROLES.includes(role) &&
                role !== DISCORD_TEAMMANAGER_ID
            )[0];
            if (clanRole)
              await axios
                .get<Clan>(`http://api.helo-system.de/role_id/${clanRole}`)
                .then(({ data }) => {
                  additionalData.clan = data.tag;
                })
                .catch(console.error);
          }
          Object.assign(token, additionalData);
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        Object.assign(session.user, {
          isInGuild: token.isInGuild,
          clan: token.clan,
          isTeamManager: token.isTeamManager,
        });
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
