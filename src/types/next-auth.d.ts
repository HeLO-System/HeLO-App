import "next-auth";

type HeLOUser = {
  roles: string[];
  clans: string[];
  // name: string;
  // image: string;
  token: string;
  exp: number;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: HeLOUser;
  }

  type User = HeLOUser;
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: HeLOUser;
  }
}
