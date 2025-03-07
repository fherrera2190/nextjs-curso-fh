"use client";

import { SizeSelector, QuantitySelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store/";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log(size, quantity, product);
    //Add to cart
    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images[1],
      price: product.price,
      quantity,
      size,
    };
    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </span>
      )}

      {/* Selector de Talles */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Selector de cantidad */}

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      {/* Boton */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
