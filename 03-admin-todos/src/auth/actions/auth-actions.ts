import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const getUserServerSession = async () => {
  const session = await auth();

  return session?.user;
};

export const sigInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) return null;

  return user;
};

const createUser = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
      name: email.split("@")[0],
    },
  });

  return user;
};
