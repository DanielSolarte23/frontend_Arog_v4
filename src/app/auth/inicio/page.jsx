import React from "react";
import LogoArog from "@/components/publicas/LogoArog";
import "@fortawesome/fontawesome-free";
import Link from "next/link";

function page() {
  return (
    <div className="h-full">
      <main className="h-full flex fondo-logo bg-white">
        <div className="w-1/2"></div>
        <div className="w-1/2 h-full flex justify-start items-center pr-14">
          <div className="w-full h-[90%]  filter px-14 rounded-lg py-16 flex flex-col justify-center shadow-xl border-t">
            <h2 className="text-3xl font-bold">Inicia sesión</h2>

            <form className="mt-2">
              <div className="">
                <div className="w-full h-14 relative">
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-gris hover:border-verde focus:border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                  />
                  <i className="fa-solid fa-envelope absolute text-verde top-4 left-3 text-xl"></i>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full h-14 relative">
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-gris hover:border-verde focus:border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                  />
                  <i className="fa-solid fa-lock absolute text-verde top-4 left-3 text-xl"></i>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gris-oscuro text-lg">
                  ¿Olvidaste tu contraseña?{" "}
                  <Link
                    className="text-verde font-semibold"
                    href="/auth/registro"
                  >
                    Recuperar
                  </Link>
                </p>
              </div>
              <div className="mt-6">
                <Link href="/administrador">
                  <button className="w-full px-6 py-2.5 h-14 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-verde-principal rounded-lg hover:bg-lime-600 lg:text-xl">
                    Iniciar sesión
                  </button>
                </Link>
              </div>
            </form>

            <div className="flex items-center mt-6 -mx-2">
              <Link
                href="#"
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 h-14 text-sm font-medium transition-colors duration-300 transform rounded-lg bg-verde-dos text-white"
              >
                <img className="h-8 w-8" src="https://img.icons8.com/?size=512&id=17949&format=png" alt="" />

                <span className="hidden mx-2 sm:inline md:text-lg">
                  Continua con Google
                </span>
              </Link>
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-400 lg:text-lg">
              {" "}
              No tienes una cuenta?{" "}
              <Link
                href="registro"
                className="text-verde-principal font-semibold"
              >
                Crear una
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
