import React from "react";

export default function PageAdministrador() {
  return (
    <>
      {/* Primer Header */}
      <header className="bg-white flex flex-col md:flex-row justify-between items-start md:items-center drop-shadow-md border-2 border-gray-200 p-4 md:p-8 rounded-2xl m-4 md:m-6">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-lime-500 text-white flex items-center justify-center rounded-full">
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A11.955 11.955 0 0112 15c2.27 0 4.384.635 6.121 1.804M12 12a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>

          <div className="text-gray-700">
            <p className="font-medium text-base md:text-lg">Nombre usuario</p>
            <a
              href="mailto:usuario@ejemplo.com"
              className="text-blue-500 text-sm md:text-base hover:underline"
            >
              usuario@ejemplo.com
            </a>
          </div>
        </div>

        <button className="mt-4 md:mt-0 border-2 border-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100 w-full md:w-auto justify-center">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-gray-600 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2-2L7.5 15.5a1.5 1.5 0 00-.4.8l-.9 3.6a.5.5 0 00.6.6l3.6-.9a1.5 1.5 0 00.8-.4l8.268-8.268a2.5 2.5 0 000-3.536l-3.536-3.536a2.5 2.5 0 00-3.536 0z"
            />
          </svg>
          <span className="font-medium text-sm md:text-base">Editar</span>
        </button>
      </header>

      {/* Segundo Header - Formulario */}
      <header className="bg-white drop-shadow-md mt-6 md:mt-12 p-4 md:p-8 lg:p-14 m-4 md:m-6 border-2 border-gray-200 rounded-2xl">
        <form className="p-2 md:p-6 lg:p-10">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Datos personales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <div className="relative z-0 w-full group">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm md:text-base"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="mt-1 border-0 border-b-2 border-green-600 w-full focus:outline-none focus:ring-0 py-1 md:py-2"
              />
            </div>

            <div className="relative z-0 w-full group">
              <label
                htmlFor="apellido"
                className="block text-gray-700 text-sm md:text-base"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                className="mt-1 border-0 border-b-2 border-green-600 w-full focus:outline-none focus:ring-0 py-1 md:py-2"
              />
            </div>

            <div className="relative z-0 w-full group">
              <label
                htmlFor="telefono"
                className="block text-gray-700 text-sm md:text-base"
              >
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                className="mt-1 border-0 border-b-2 border-green-600 w-full focus:outline-none focus:ring-0 py-1 md:py-2"
              />
            </div>

            <div className="relative z-0 w-full group">
              <label
                htmlFor="direccion"
                className="block text-gray-700 text-sm md:text-base"
              >
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                className="mt-1 border-0 border-b-2 border-green-600 w-full focus:outline-none focus:ring-0 py-1 md:py-2"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 md:mt-6">
            <button className="border-2 border-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center">
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2-2L7.5 15.5a1.5 1.5 0 00-.4.8l-.9 3.6a.5.5 0 00.6.6l3.6-.9a1.5 1.5 0 00.8-.4l8.268-8.268a2.5 2.5 0 000-3.536l-3.536-3.536a2.5 2.5 0 00-3.536 0z"
                />
              </svg>
              <span className="font-medium text-sm md:text-base">Editar</span>
            </button>
          </div>
        </form>
      </header>
    </>
  );
}
