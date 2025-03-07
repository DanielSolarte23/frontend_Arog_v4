"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Insidencias() {

  const datosIniciales = [
    { id: 1, nombre: "Certificados001", fecha: "24/07/2025", tamaño: "54mb", dirigidoA: "Maria Anaya" },
    { id: 2, nombre: "Informes2024", fecha: "12/05/2024", tamaño: "32mb", dirigidoA: "Juan Pérez" },
    { id: 3, nombre: "Resumen Mensual", fecha: "01/03/2024", tamaño: "10mb", dirigidoA: "Carlos Gómez" },
  ];

  const [searchus, setsearchus] = useState("");

  return (
    <div className="border-2 border-gray-300 shadow-lg m-4 md:m-12 rounded-lg overflow-hidden">
      <nav className="bg-white border-2 border-b-gray-300 flex flex-col md:flex-row items-center justify-between p-4 gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
            placeholder="Buscar registros..."
            required
            value={searchus}
            onChange={(e) => setsearchus(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
            <span className="text-gray-700 font-medium">Filtrar Por</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-gray-600">
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          </button>
        </div>
      </nav>
      <div className="overflow-x-auto">
        <table className="w-11/12 text-sm text-left text-gray-500  rounded-lg m-8 mb-0 ml-20 border ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-400">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">Nombre de archivo</th>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3">Tamaño</th>
              <th scope="col" className="px-6 py-3">Dirigido a</th>
              <th scope="col" className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {datosIniciales
              .filter((dato) => {
                const isHighlighted =
                  dato.nombre.toLowerCase().includes(searchus.toLowerCase()) ||
                  dato.fecha.includes(searchus) ||
                  dato.tamaño.includes(searchus) ||
                  dato.dirigidoA.toLowerCase().includes(searchus.toLowerCase());
                return isHighlighted;
              })
              .map((dato) => (
                <tr key={dato.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id={`checkbox-table-search-${dato.id}`} type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500" />
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{dato.nombre}</th>
                  <td className="px-6 py-4">{dato.fecha}</td>
                  <td className="px-6 py-4">{dato.tamaño}</td>
                  <td className="px-6 py-4">{dato.dirigidoA}</td>
                  <td>
                    <FontAwesomeIcon icon={faDownload} className="h-5 w-5 px-6 py-3" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <nav className="bg-white border rounded-md border-b-gray-300 flex flex-col md:flex-row items-center justify-between p-2 gap-4">
        <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition order-1 md:order-none w-full md:w-auto justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-gray-600"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          <span className="text-gray-700 font-medium">Anterior</span>
        </button>

        <ul className="flex items-center -space-x-px h-8 text-sm flex-wrap justify-center order-3 md:order-none">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white"
            >
              5
            </a>
          </li>
        </ul>

        <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition order-2 md:order-none w-full md:w-auto justify-center">
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
    </div>
  );
}
