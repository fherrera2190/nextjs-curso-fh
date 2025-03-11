import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstname: string;
    lastname: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  //methods

  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstname: "",
        lastname: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },

      setAddress: (address: State["address"]) => set({ address }),
    }),

    {
      name: "address-storage",
    }
  )
);
