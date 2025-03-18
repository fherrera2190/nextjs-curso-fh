"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function getPaginatedUsers() {
  const session = await auth();
  if (session?.user.role !== "admin")
    return {
      ok: false,
      message: "Debe estar logueado como admin para ver los usuarios",
    };

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
    });
    return {
      ok: true,
      users,
    };
  } catch (error) {
    void error;
    return {
      ok: false,
      message: "Error al obtener los usuarios",
    };
  }
}
