/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import jwtDecode from "jwt-decode";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { HeLOUser } from "types/next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "HelO-System",
      credentials: {
        token: {
          label: "Token",
          type: "text",
          placeholder: "Enter your token",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.token) return null;

        const { exp, roles, clans } = jwtDecode<{
          exp: number;
          roles: string[];
          clans: string[];
        }>(credentials.token);

        if (!exp || exp > Date.now()) return null;
        const user: User = { roles, clans, exp, token: credentials.token };
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) return { ...token, user: user as HeLOUser };

      return token;
    },
    session({ session, token }) {
      return { ...session, user: token.user };
    },
  },
};

export default NextAuth(authOptions);
