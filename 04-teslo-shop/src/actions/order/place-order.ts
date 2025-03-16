"use server";

import { auth } from "@/auth";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay session de usuario",
    };
  }

  //   console.log({ productIds, address, userId });

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  });

  //   console.log(products)

  const itemsInOrder = productIds.reduce((count, p) => p.quantity + count, 0);

  //   console.log(itemsInOrder);

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product)
        throw new Error(`Product with id ${item.productId} not found`);

      const subsTotal = product.price * productQuantity;

      totals.subTotal += subsTotal;
      totals.tax += subsTotal * 0.15;
      totals.total += subsTotal * 1.15;

      return totals;
    },
    {
      subTotal: 0,
      tax: 0,
      total: 0,
    }
  );

  //   console.log({
  //     subTotal,
  //     tax,
  //     total,
  //   });



  

  //   return {
  //     ok: false,
  //     message: "",
  //   };
};
