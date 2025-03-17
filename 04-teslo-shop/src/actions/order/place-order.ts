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

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1 actualizar el stock de productos

      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0)
          throw new Error(`${product.id} no tiene cantidad definida  `);

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity no hacer
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      //Verificar stock negativos

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene stock suficiente `);
        }
      });

      //2. Crear encabezado -Detalles

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      //3. Crear la direccion de la orden

      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      ok: true,
      order: prismaTx.order.id,
      prismaTx,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
};
