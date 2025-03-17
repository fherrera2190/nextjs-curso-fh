"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe estar logueado para ver la orden",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${orderId} no existe`;
    if (session.user.role === "user") {
      if (order.userId !== session.user.id) {
        throw `${orderId} no pertenece a ${session.user.name}`;
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    void error;
    return {
      ok: false,
      message: "Orden no encontrada",
    };
  }
};
