"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  if (isNaN(Number(take))) take = 12;

  if (take < 1) take = 12;

  try {
    //Obtener productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: { url: true },
        },
        category: {
          select: { name: true },
        },
      },
      where: {
        gender,
      },
    });

    //2. Obtener el total
    // pag = 40/10 = 4
    // pag = 41/10 = 4 Math.ceil(41/10) = 5
    const totalCount = await prisma.product.count({ where: { gender } });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo cargar los productos");
  }
};
