import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid, Title } from "@/components";
import { Product } from "@/interfaces";

interface Props {
  searchParams: Promise<{ page: string; take: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { page, take } = await searchParams;
  const { products } = (await getPaginatedProductsWithImages({
    page: +page,
    take: +take,
  })) as {
    products: Product[];
  };

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
