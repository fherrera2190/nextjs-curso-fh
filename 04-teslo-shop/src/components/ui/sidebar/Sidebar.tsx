"use client";
// import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { useEffect } from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const {
    data: session,
    // update
  } = useSession();
  const role = session?.user?.role;
  const isAuthenticated = !!session?.user;

  //Lo usaria si no, quisiera usar el window.location.replace() en el loginform
  // useEffect(() => {
  //   update();
  // }, []);

  return (
    <div className="">
      {/* Blackbackground */}

      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeSideMenu()}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm backdrop-filter"
        ></div>
      )}
      {/* Sidemenu */}
      <nav
        //efecto slide
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-700",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          className="absolute top-5 right-5 cursor-pointer"
          size={50}
          onClick={() => closeSideMenu()}
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

        {isAuthenticated && (
          <>
            {/* Menu */}
            <Link
              href={"/profile"}
              onClick={() => closeSideMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              href={"/orders"}
              onClick={() => closeSideMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <button
              onClick={async () => {
                closeSideMenu();
                signOut();
              }}
              className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          </>
        )}
        {!isAuthenticated && (
          <Link
            href={"/auth/login"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeSideMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {role === "admin" && (
          <>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 my-10"></div>{" "}
            <Link
              href={"/admin/products"}
              onClick={() => closeSideMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              onClick={() => closeSideMenu()}
              href={"/admin/orders"}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href={"/admin/users"}
              onClick={() => closeSideMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
