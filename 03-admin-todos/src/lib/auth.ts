import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { sigInEmailPassword } from "@/auth/actions/auth-actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "***************",
        },
      },
      authorize: async (credentials) => {


        const user = await sigInEmailPassword(
          credentials!.email as string,
          credentials!.password as string
        );

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      void credentials;
      void profile;
      void account;
      void email;

      console.log(user);
      return true;
    },
    async jwt({ token, user, account, profile }) {
      void user;
      void profile;
      void account;
      // console.log({ token });

      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? "",
        },
      });

      // if (dbUser?.isActive === false) {
      //   //throw new Error("User is not active");
      //   return null;
      // }

      token.roles = dbUser?.roles ?? ["no-roles"];

      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },
    async session({ session, user, token }) {
      void user;

      console.log(token);
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
