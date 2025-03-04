import { ProductGrid, Title } from "@/components";
import { Category, Product } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: Category }>;
}
const products: Product[] = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const genders = new Set(products.map((product) => product.gender));
  const { id } = await params;

  if (!genders.has(id)) return notFound();

  const labels: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  return (
    <>
      <Title
        title={`Artículos ${labels[id]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid
        products={products.filter((product) => product.gender === id)}
      />
    </>
  );
}
