"use client";

import { actionLogin } from "@/actions";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, action, pending] = useActionState(actionLogin, "");
  // const router = useRouter();

  // console.log(state);
  // console.log("El state>>>>>>>>>>>>>>>>>>", pending);

  useEffect(() => {
    if (state === "Success") {
      // router.replace("/");

      //Con esto me ahorro el router y el update()en el sidebar
      window.location.replace("/");
    }
  }, [state]);

  return (
    <form action={action} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="mb-2 flex">
            <IoInformationOutline className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-600">
              Correo o contraseña incorrectos
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`${pending ? "btn-disabled" : "btn-primary"}`}
      >
        Ingresar
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
