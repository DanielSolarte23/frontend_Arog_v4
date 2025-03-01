"use client";
import { useState } from "react";

export default function Formulario() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative overflow-x-auto border-2 border-gray-300 shadow-lg m-12 rounded-lg">
      <nav className="bg-white border-2 border-b-gray-300 flex items-center justify-between p-2 gap-4">
        <div className="relative">
          <input
            type="search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
            placeholder="Buscar registros..."
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
            <span className="text-gray-700 font-medium">Filtrar Por</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-gray-600"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          </button>
          <button
            className="bg-lime-600 p-2 mr-7 rounded-xl text-white flex items-center gap-2 hover:bg-lime-700 transition"
            onClick={() => setModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-5 h-5 fill-white"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            <span className="font-medium">Nuevo registro</span>
          </button>
        </div>
      </nav>

      <table className="text-sm text-left ml-20 text-gray-500 border-2 border-gray-200 rounded-xl m-7 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-white border-2 border-gray-300">
          <tr>
            <th className="px-6 py-3">Item</th>
            <th className="px-6 py-3">Fecha</th>
            <th className="px-6 py-3">Barrio o Vereda</th>
            <th className="px-6 py-3">Operario</th>
            <th className="px-6 py-3">N. ruta</th>
            <th className="px-6 py-3">Inicio recorrido</th>
            <th className="px-6 py-3">Fin recorrido</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b border-gray-200">
            <th className="px-6 py-4">1</th>
            <td className="px-6 py-4">01/01/2024</td>
            <td className="px-6 py-4">Centro</td>
            <td className="px-6 py-4">Pedro</td>
            <td className="px-6 py-4">101</td>
            <td className="px-6 py-4">08:00 AM</td>
            <td className="px-6 py-4">10:30 AM</td>
            <td className="px-6 py-4">15</td>
            <td className="px-6 py-4">Sin observaciones</td>
          </tr>
        </tbody>
      </table>
      <nav className="bg-white border-2 ml-32 mr-32 mb-12 rounded-md border-b-gray-300 flex items-center justify-between p-2  gap-4">
        <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-gray-600"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          <span className="text-gray-700 font-medium">Anterior</span>
        </button>

        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white     dark:text-gray-400  dark:hover:text-gray-600"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white   dark:text-gray-400  dark:hover:text-gray-600"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white   dark:text-gray-400  dark:hover:text-gray-600"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white   dark:text-gray-400  dark:hover:text-gray-600"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white   dark:text-gray-400  dark:hover:text-gray-600"
            >
              5
            </a>
          </li>
        </ul>
        <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
          <span className="text-gray-700 font-medium">Siguiente</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-gray-600"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </nav>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-normal mb-6">Agregar nuevo registro</h2>
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <select className="border border-gray-300 rounded-lg p-2">
                  <option>Item</option>
                </select>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <select className="border border-gray-300 rounded-lg p-2">
                  <option>Operario</option>
                </select>
                <select className="border border-gray-300 rounded-lg p-2">
                  <option>N. ruta</option>
                </select>
                <input
                  type="text"
                  placeholder="Barrio o vereda"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Inicio de recorrido"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Fin de recorrido"
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
              <textarea
                placeholder="Observación"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition"
                >
                  Crear Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
