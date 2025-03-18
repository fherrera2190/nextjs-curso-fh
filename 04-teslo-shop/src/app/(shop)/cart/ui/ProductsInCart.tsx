"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updatedProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  if (productsInCart.length === 0) redirect("/empty");

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              ${product.size} - {product.title}
            </Link>
            <p>${product.price}</p>

            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updatedProductQuantity(product, quantity)
              }
            />
            <button
              onClick={() => removeProductFromCart(product)}
              className="underline mt-3"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
