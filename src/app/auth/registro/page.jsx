"use client";
import { useState } from "react";
import Link from "next/link";

function page() {
  const [showRequirements, setShowRequirements] = useState(false);
  return (
    <div className="h-full ">
      <main className="h-full flex fondo-logo pr-14">
        <div className="w-1/2 hidden md:block"></div>
        <div className="md:w-1/2 h-full  md:mt-0 w-full flex  justify-start items-center">
          <div className="w-full md:h-[90%] h-full filter px-14 rounded-lg md:py-16 py-2  flex flex-col justify-center shadow-xl">
            <h2 className="text-3xl font-bold  md:mt-0">Registro</h2>
            <form className="grid grid-cols-1 md:gap-6 gap-2 md:mt-3 md:grid-cols-2">
              <div className="w-full h-14 relative">
                <input
                  type="text"
                  placeholder="Ingresa tus nombres"
                  className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                />
                <i className="fa-solid fa-user absolute text-verde top-6 left-3 text-xl"></i>
              </div>

              <div className="w-full h-14 relative">
                <input
                  type="text"
                  placeholder="Ingresa tus apellidos"
                  className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                />
                <i className="fa-solid fa-signature absolute text-verde top-6 left-3 text-xl"></i>
              </div>

              <div className="w-full h-14 relative">
                <input
                  type="text"
                  placeholder="Ingresa tu telefono"
                  className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                />
                <i className="fa-solid fa-phone absolute text-verde top-6 left-3 text-xl"></i>
              </div>

              <div className="w-full h-14 relative">
                <input
                  type="text"
                  placeholder="Ingresa tu correo"
                  className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                />
                <i className="fa-solid fa-envelope absolute text-verde top-6 left-3 text-xl"></i>
              </div>

              <div className="w-full h-14 relative">
                <input
                  type="text"
                  placeholder="Ingresa una contraseña"
                  className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                  onFocus={() => setShowRequirements(true)}
                  onBlur={() => setShowRequirements(false)}
                />
                <i className="fa-solid fa-lock absolute text-verde top-6 left-3 text-xl"></i>
              </div>
              <div className="w-full h-14 relative">
                <input
                  type="text"
                  placeholder="Confirma tu contraseña"
                  className="block h-full w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-300 placeholder:font-thin bg-white border-b-4 border-verde  rounded-lg  focus:outline-none text-xl pl-10"
                  onFocus={() => setShowRequirements(true)}
                  onBlur={() => setShowRequirements(false)}
                />
                <i className="fa-solid fa-lock absolute text-verde top-6 left-3 text-xl"></i>
              </div>
            </form>
            {showRequirements && (
              <div className="w-full mt-5 px-4 py-2 bg-yellow-100 border border-yellow-300 flex items-center gap-2 rounded-md">
                <i className="fa-solid fa-triangle-exclamation text-yellow-500 text-lg"></i>
                <p className="text-yellow-700 text-xs">
                  La contraseña debe tener más de 8 caracteres, al menos una
                  letra mayúscula, una letra minúscula, un número y un carácter
                  especial (<strong>@#$%^&+=!</strong>).
                </p>
              </div>
            )}
            <button className={`w-full px-6 py-2.5 h-14 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-verde-principal rounded-lg hover:bg-lime-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 lg:text-lg ${showRequirements ? "mt-3" : "mt-10"}`}>
              Registrarse
            </button>

            <div className="flex items-center mt-3 -mx-2">
              <Link
                href="#"
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 h-14 text-sm font-medium transition-colors duration-300 transform rounded-lg bg-verde-dos text-white"
              >
                <img
                  className="h-8 w-8"
                  src="https://img.icons8.com/?size=512&id=17949&format=png"
                  alt=""
                />

                <span className="hidden mx-2 sm:inline md:text-lg">
                  Continua con Google
                </span>
              </Link>
            </div>

            <p className="mt-3 text-xs font-light text-center text-gray-400 lg:text-lg">
              {" "}
              Ya tienes una cuenta?{" "}
              <Link
                href="login"
                className="font-medium text-verde-principal hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
