"use client";
import { useState } from "react";

export default function GaleriaC() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <>
      <header className="border bg-white border-gray-200 rounded-lg h-full">
        <div className="h-full">
          <nav className="p-2 md:p-4 rounded-t-lg border-b border-gray-200 flex items-center w-full flex-wrap gap-2 h-1/10">
            <h3 className="text-lg md:text-xl font-medium text-black">
              Galeria
            </h3>
            <button
              className="ml-auto bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition flex-shrink-0"
              onClick={() => setModalOpen(true)}
            >
              <span className="font-medium text-sm md:text-base">
                Agregar imagen
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 md:w-5 md:h-5 fill-white"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
            </button>
          </nav>
          <div className="h-8/10 w-full flex justify-center items-center px-5 ">
            <div className="grid grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 p-4 border rounded-md">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => setModalCard(true)}
                  className="cursor-pointer"
                >
                  <img
                    src="https://i.pinimg.com/736x/9b/a7/86/9ba78601689a1d13d292eb4d961dda89.jpg"
                    alt=""
                    className="rounded-lg object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full gap-4 col-span-2 sm:col-span-3 border-t h-1/10 py-3 px-4">
            <button className="flex items-center justify-center gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-white hover:bg-gray-100 transition w-full md:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 md:w-5 md:h-5 fill-gray-600"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Anterior
              </span>
            </button>

            <button className="flex items-center justify-center gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-white hover:bg-gray-100 transition w-full md:w-auto">
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Siguiente
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 md:w-5 md:h-5 fill-gray-600"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-black"
              >
                <path d="M6.225 4.811a1.5 1.5 0 0 0-2.121 2.122L9.878 12l-5.774 5.067a1.5 1.5 0 1 0 2.122 2.122L12 14.122l5.067 5.067a1.5 1.5 0 1 0 2.122-2.122L14.122 12l5.067-5.067a1.5 1.5 0 1 0-2.122-2.122L12 9.878 6.225 4.811z" />
              </svg>
            </button>

            <h1 className="text-lg font-semibold text-black mb-4">
              Subir imagen
            </h1>

            <div>
              <input type="file" name="imagen" id="imagen" className="mb-4" />
              <br />
              <button className="flex items-center px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">
                <span className="font-medium">Cargar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-5 h-5 fill-black ml-2"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {modalCard && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] relative">
            <div className="max-h-[80vh] overflow-auto">
              <img
                src="https://i.pinimg.com/736x/9b/a7/86/9ba78601689a1d13d292eb4d961dda89.jpg"
                alt=""
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => setModalCard(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-black"
                >
                  <path d="M6.225 4.811a1.5 1.5 0 0 0-2.121 2.122L9.878 12l-5.774 5.067a1.5 1.5 0 1 0 2.122 2.122L12 14.122l5.067 5.067a1.5 1.5 0 1 0 2.122-2.122L14.122 12l5.067-5.067a1.5 1.5 0 1 0-2.122-2.122L12 9.878 6.225 4.811z" />
                </svg>
              </button>
              <div className="flex gap-4 mt-6">
                <button className="flex items-center px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">
                  <span className="font-medium text-black">Descargar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className=" w-5 h-5 fill-black ml-2"
                  >
                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                  </svg>
                </button>

                <button
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => setModalDelete(true)}
                >
                  <span className="font-medium">Eliminar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-5 h-5 fill-white ml-2"
                  >
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] relative">
            <button
              onClick={() => setModalDelete(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-black"
              >
                <path d="M6.225 4.811a1.5 1.5 0 0 0-2.121 2.122L9.878 12l-5.774 5.067a1.5 1.5 0 1 0 2.122 2.122L12 14.122l5.067 5.067a1.5 1.5 0 1 0 2.122-2.122L14.122 12l5.067-5.067a1.5 1.5 0 1 0-2.122-2.122L12 9.878 6.225 4.811z" />
              </svg>
            </button>

            <h1 className="font-semibold text-center mb-2">Eliminar archivo</h1>
            <h5 className="font-medium text-center mb-6">
              ¿Estás seguro de eliminar este archivo?
            </h5>

            <div className="flex justify-center">
              <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                <span className="font-medium">Eliminar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-5 h-5 fill-white ml-2"
                >
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
