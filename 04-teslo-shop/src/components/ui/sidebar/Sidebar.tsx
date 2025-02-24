"use client";
import Link from "next/link";
import {
  IoCloseOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  return (
    <div className="">
      {/* Blackbackground */}
      <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>

      {/* Blur */}
      <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-smbackdrop-filter">
        {/* Sidemenu */}
        <nav
          //efecto slide
          className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300"
        >
          <IoCloseOutline
            className="absolute top-5 right-5 cursor-pointer"
            size={50}
            onClick={() => console.log("cerrar")}
          />
          {/* Input */}
          <div className="relative mt-14">
            <IoSearchOutline className="absolute top-2 left-2" size={20} />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Menu */}
          <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoPersonOutline size={30} />
            <span className="ml-3 text-xl">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};
