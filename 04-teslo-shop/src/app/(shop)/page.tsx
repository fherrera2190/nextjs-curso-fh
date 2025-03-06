import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Pagination, ProductGrid, Title } from "@/components";
// import { Product } from "@/interfaces";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page: string; take: string }>;
}

export default async function Home({ searchParams }: Props) {
  let { page, take }: { page: string | number; take: string | number } =
    await searchParams;

  page = page ? parseInt(page) : 1;
  take = take ? parseInt(take) : 12;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      take,
    });

  if (products.length === 0) redirect("/");
  console.log(currentPage, totalPages);
  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
