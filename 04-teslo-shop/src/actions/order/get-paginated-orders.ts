"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe estar logueado para ver las ordenes" };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
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
