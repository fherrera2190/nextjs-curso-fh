import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  addProductToCart: (cartProduct: CartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(
            (set, get) => ({
        cart: [],

        addProductToCart: (cartProduct: CartProduct) => {
            const { cart } = get();

            const productExists = cart.some(
            (item) => item.id === cartProduct.id && item.size === cartProduct.size
            );

            if (!productExists) {
            set({
                cart: [...cart, cartProduct],
            });
            return;
            }

            const updatedCart = cart.map((item) => {
            if (item.id === cartProduct.id && item.size === cartProduct.size) {
                return {
                ...item,
                quantity: item.quantity + cartProduct.quantity,
                };
            }

            return item;
            });


            set({cart:updatedCart});

        },
        }),
        {
        name: "shopping-cart",
        }
    )

);
