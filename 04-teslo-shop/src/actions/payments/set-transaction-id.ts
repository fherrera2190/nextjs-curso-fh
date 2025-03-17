"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
): Promise<{ ok: boolean; message?: string }> => {
  try {
    // console.log({ orderId, transactionId });
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId },
    });
    console.log(order);
    if (!order)
      return {
        ok: false,
        message: `No se encontró la orden con el id ${orderId}`,
      };

    return {
      ok: true,
    };
  } catch (error) {
    void error;
    return { ok: false, message: "Error al actualizar la orden" };
  }
};
