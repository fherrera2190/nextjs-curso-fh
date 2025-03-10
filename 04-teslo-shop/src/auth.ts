// import { type DefaultJWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    // Google,

    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          // console.log(">>>>>>>>>>>>>>>>>", email, password);

          if (!email || !password) return null;

          const user = await prisma.user.findUnique({
            where: {
              email: email.toLowerCase(),
            },
          });

          if (!user) return null;

          if (!bcrypt.compareSync(password, user.password)) return null;

          const { password: _, ...rest } = user;
          void _;

          // console.log(rest);
          return rest;
        } catch (error) {
          console.log(error);
          return null;
          // if (error instanceof ZodError) {
          // Return `null` to indicate that the credentials are invalid
          // }
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // console.log({ token, user });
      if (user) {
        token.data = user;
      }
      console.log(">>>>>>>>>>>>>>>", { token });
      return token;
    },
    session: ({ session, token, user }) => {
      console.log({ session, token, user });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
  },
});

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  // interface AdapterUser {
  //   role: string;
  //   emailVerified?: boolean;
  // }

  interface Session {
    user: {
      /** The user's postal address. */
      // address: string;
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string;
      image?: string;

      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//   interface JWT extends DefaultJWT {
//     data: {
//       id: string;
//       name: string;
//       email: string;
//       emailVerified?: boolean;
//       role: string;
//       image?: string;
//     }
//   }
// }
