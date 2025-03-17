import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (cartProduct: CartProduct) => void;

  updateProductQuantity: (product: CartProduct, quantity: number) => void;

  removeProductFromCart: (product: CartProduct) => void;

  getSummaryInformation: () => {
    subsTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  clearCart: () => void;
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

        set({ cart: updatedCart });
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCart = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: quantity }
            : item
        );

        set({ cart: updatedCart });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        const newCart = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: newCart });
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const subsTotal = cart.reduce((subTotal, product) => {
          return subTotal + product.price * product.quantity;
        }, 0);

        const tax = subsTotal * 0.15;
        const total = subsTotal + tax;
        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

        return { subsTotal, tax, total, itemsInCart };
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopping-cart",
    }
  )
);
