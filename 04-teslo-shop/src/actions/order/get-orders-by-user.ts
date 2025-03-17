"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return { ok: false, message: "Debe estar logueado para ver las ordenes" };
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return { ok: true, orders };
  } catch (error) {
    void error;
    return { ok: false, message: "Error al obtener las ordenes" };
  }
};
