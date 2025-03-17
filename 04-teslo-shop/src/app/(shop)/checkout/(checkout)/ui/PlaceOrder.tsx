"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const state = useCartStore((state) => state);
  const address = useAddressStore((state) => state.address);
  const { itemsInCart, tax, total, subsTotal } = state.getSummaryInformation();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = state.cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);

      setErrorMessage(resp.message!);
      return;
    }

    state.clearCart();
    console.log(resp.order);
    window.location.replace(`/orders/${resp.order}`);
    setIsPlacingOrder(false);
  };

  if (!loaded) return <h3>Loading...</h3>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ">
      <h2 className="text-2xl mb-2">Dirección dZe entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstname} {address.lastname}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>
      {/* Divider */}
      <div className="w-ful h-0.5 rounded bg-gray-200 mb-10"></div>
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

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer click en {'"Colocar orden"'}, aceptas nuestros
            <a href="#" className="underline">
              {" "}
              términos y condiciones
            </a>
            {" y "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-600">{errorMessage}</p>
        <button
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}

          // href="/orders/123"
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
