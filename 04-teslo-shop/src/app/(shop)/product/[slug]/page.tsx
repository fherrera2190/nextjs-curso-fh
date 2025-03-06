export const revalidate = 604800; //7dias

import { getProductBySlug } from "@/actions/product";
import {
  MobileSlideShow,
  QuantitySelector,
  SizeSelector,
  SlideShow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Product } from "@/interfaces";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

// export const metadata: Metadata = {
//   title: "Teslo | Shop",
//   description: "Tienda de ropa virtual",
// };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  console.log(slug);
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  const product = await getProductBySlug(slug);


  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];
  void parent;

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? "",
    openGraph: {
      // images: [], todo el url completo

      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product: Product | null = await getProductBySlug(slug);

  if (!product) notFound();

  console.log(product.slug);

  return (
    <div className="mt-5 mb-20 grid-cols-1 grid md:grid-cols-3 gap-3">
      {/* Slideshow deskto */}
      <div className="col-span-1 md:col-span-2 ">
        <MobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        <SlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Slideshow deskto */}
      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product.slug} />
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* Selector de Talles */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        {/* Selector de cantidad */}

        <QuantitySelector quantity={2} />
        {/* Boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>
        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
