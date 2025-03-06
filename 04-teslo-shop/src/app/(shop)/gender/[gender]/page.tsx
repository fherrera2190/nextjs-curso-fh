export const revalidate = 60;


import { getPaginatedProductsWithImages } from "@/actions/product/";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ gender: Gender }>;
  searchParams: Promise<{ page: string; take: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  let { page, take }: { page: string | number; take: string | number } =
    await searchParams;

  page = page ? parseInt(page) : 1;
  take = take ? parseInt(take) : 12;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
    gender,
  });
  if (products.length < 1) redirect(`/gender/${gender}`);

  const labels: Record<string, string> = {
    men: "para Hombres",
    women: "para Mujeres",
    kid: "para Niños",
    unisex: "para Todos",
  };


  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
