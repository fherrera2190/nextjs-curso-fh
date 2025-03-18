"use server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ?? "",
  api_key: process.env.API_KEY_CLOUDINARY ?? "",
  api_secret: process.env.API_SECRET_CLOUDINARY ?? "", // Click 'View API Keys' above to copy your API secret
});

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se pueden borrar las imagenes de FS",
    };
  }
  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  console.log(imageName);
  try {
    await cloudinary.uploader.destroy(imageName);
    const deleteImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deleteImage.product.slug}`);
    revalidatePath(`/product/${deleteImage.product.slug}`);
  } catch (error) {
    void error;
    return {
      ok: false,
      message: "Error al borrar la imagen",
    };
  }
};
