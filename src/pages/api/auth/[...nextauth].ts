import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { DiscordProvider } from "util/discordProvider";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const isInGuild = !!(await axios
          .get<{ id: string }[]>(
            `https://discord.com/api/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`,
            {
              headers: { Authorization: `Bearer ${account.access_token}` },
            }
          )
          .then(({ data }) => data)
          .catch(() => false));
        Object.assign(token, { isInGuild });
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        Object.assign(session.user, { isInGuild: token.isInGuild });
      } else {
        Object.assign(session, { user: { isInGuild: token.isInGuild } });
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
