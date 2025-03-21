"use client";
import { useState } from "react";
export default function Tareas() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="mx-2 md:m-4 lg:m-8 border-2 border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <nav className="bg-white border-b-2 border-gray-200 flex flex-col md:flex-row items-center justify-between p-4 gap-4">
          <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg">
            <div className="bg-white px-4 py-2 rounded-md font-medium shadow">
              Todas las tareas
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              Por hacer
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              En progreso
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              Completado
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
              <span className="text-gray-700 font-medium">Archivo</span>
            </button>

            <button className="bg-lime-600 px-4 py-2 rounded-xl text-white flex items-center gap-2 hover:bg-lime-700 transition" onClick={()=> setModalOpen(true)}>
              <span className="font-medium">Agregar tarea</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5 fill-white"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V256h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 min-h-[200px]">
            <h3 className="text-black text-xl font-semibold mb-2 ml-1">
              Por hacer
            </h3>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 min-h-[200px]">
            <h3 className="text-black text-xl font-semibold mb-2 ml-1">
              En progreso
            </h3>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 min-h-[200px]">
            <h3 className="text-black text-xl font-semibold mb-2 ml-1">
              Completado
            </h3>
            <a
              href="#"
              className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <h5 className="mb-2 text-lg font-semibold text-black">
                Realizar la ruta Aida Lucia
              </h5>
              <p className="text-gray-700">
                Realizar la ruta establecida desde AROG hasta Aida Lucia
                recojiendo los residuos producidos por los ciudadanos
              </p>
              <div className="flex justify-between mt-4">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="fill-gray-400 w-4 h-4"
                  >
                    <path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" />
                  </svg>
                  <h5 className="text-sm ml-2 text-gray-400">Martes</h5>
                </div>

                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="fill-gray-400 w-4 h-4"
                  >
                    <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
                  </svg>
                  <h5 className="text-sm ml-2 mb-2 text-gray-400">1</h5>
                </div>

                <div className="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="fill-gray-400 w-5 h-5 "
                  >
                    <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-normal mb-4 md:mb-6">
              Añadir una nueva tarea
            </h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Titulo de la tarea"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Fecha de vencimiento"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Etiquetas"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />

                <input
                  type="text"
                  placeholder="Asignado"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
              </div>
              <textarea
                placeholder="Descripcion"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-sm md:text-base"
                rows="3"
              ></textarea>
              <div className="flex flex-col md:flex-row justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition text-sm md:text-base w-full md:w-auto"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="font-medium">Cancelar</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition  text-sm md:text-base w-full md:w-auto"
                >
                  <span className="font-medium">Crear tarea</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
