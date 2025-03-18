"use server";
import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ?? "",
  api_key: process.env.API_KEY_CLOUDINARY ?? "",
  api_secret: process.env.API_SECRET_CLOUDINARY ?? "", // Click 'View API Keys' above to copy your API secret
});

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value)),
  categoryId: z.string().uuid(),
  sizes: z.coerce
    .string()
    .transform((value) => value.split(","))
    .refine((arr) => arr.length > 0 && arr[0] !== "", {
      message: "Debes proporcionar al menos un talle",
    }),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});
export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);
  if (!productParsed.success)
    return { ok: false, message: productParsed.error.message };

  const product = productParsed.data;
  const { id, ...rest } = product;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      void tx;
      let product: Product;

      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      if (formData.getAll("images")) {
        const images = await upladImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("Error al subir las imagenes");
        }

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image,
            productId: product.id,
          })),
        });

      }

      return { product };
    });

    //Revalidate paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return { ok: true, product: prismaTx.product };
  } catch (error) {
    void error;
    return { ok: false, message: "Error al crear el producto" };
  }
};

const upladImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      return cloudinary.uploader
        .upload(`data:image/png;base64,${base64Image}`, {
          folder: "teslo-shop",
        })
        .then((result) => result.secure_url);
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    void error;
    return null;
  }
};
