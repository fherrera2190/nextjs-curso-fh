"use client";

import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
// import { sleep } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}




export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);

    // await sleep(3);

    setStock(inStock);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  // if (stock < 1)
  //   return (
  //     <h1 className={` ${titleFont.className} antialiased font-bold text-lg  line-through`}>
  //       Sin Stock
  //     </h1>
  //   );

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} text-lg animate-pulse bg-gray-200 w-[14ch]`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
