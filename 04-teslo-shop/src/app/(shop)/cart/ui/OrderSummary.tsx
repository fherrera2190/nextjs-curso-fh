"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const state = useCartStore((state) => state);

  const { itemsInCart, tax, total, subsTotal } = state.getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-2xl mb-2">Resume de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right ">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right ">{currencyFormat(subsTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right ">${currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-2xl mt-5 ">{currencyFormat(total)}</span>
      </div>
    </>
  );
};
