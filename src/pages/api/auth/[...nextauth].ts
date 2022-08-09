import axios from "axios";
import NextAuth from "next-auth";
import { DiscordProvider } from "util/discordProvider";

export default NextAuth({
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
            `https://discord.com/api/users/@me/guilds/884131322318029332/member`,
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
  },
});
