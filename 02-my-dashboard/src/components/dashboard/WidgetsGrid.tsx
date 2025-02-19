"use client";

import { useAppSelector } from "@/store";
import { SimpleWidget } from "./SimpleWidget";
import {  IoCartOutline } from "react-icons/io5";

export const WidgetsGrid = () => {
  const title = useAppSelector((state) => state.counter.count);
  return (
    <div className="flex flex-wrap p-2 items-center justify-center ">
      <SimpleWidget
        title={title + ""}
        subTitle={"Productos en el carrito"}
        label={"Contador"}
        href={"/dashboard/counter"}
        icon={<IoCartOutline size={70} className="text-blue-500" />}
      />
      {/* <SimpleWidget /> */}
    </div>
  );
};
