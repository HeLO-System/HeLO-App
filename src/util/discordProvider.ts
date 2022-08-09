/* eslint-disable no-param-reassign */
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import { DiscordProfile } from "next-auth/providers/discord";

export function DiscordProvider<P extends DiscordProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "discord",
    name: "Discord",
    type: "oauth",
    authorization:
      "https://discord.com/api/oauth2/authorize?scope=guilds.members.read",
    token: "https://discord.com/api/oauth2/token",
    userinfo: "https://discord.com/api/users/@me",
    async profile(profile) {
      if (profile.avatar === null) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const defaultAvatarNumber = parseInt(profile.discriminator, 10) % 5;
        profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
      } else {
        const format = profile.avatar.startsWith("a_") ? "gif" : "png";
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
      }

      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.image_url,
      };
    },
    options,
  };
}
