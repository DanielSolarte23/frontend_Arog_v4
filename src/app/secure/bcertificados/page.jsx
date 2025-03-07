"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Insidencias() {

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
          
        </div>
      </nav>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-400">
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
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500" />
                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Certificado001</th>
            <td className="px-6 py-4">24/07/2025</td>
            <td className="px-6 py-4">54mb</td>
            <td className="px-6 py-4">Maria Anaya</td>
            <td>
              <FontAwesomeIcon icon={faDownload} className="px-6 py-4 h-5 w-5" />
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500" />
                <label htmlFor="checkbox-table-search-2" className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Certificado 002</th>
            <td className="px-6 py-4">25/8/2025</td>
            <td className="px-6 py-4">100mb</td>
            <td className="px-6 py-4">Maria anaya</td>
            <td>
              <FontAwesomeIcon icon={faDownload} className="px-6 py-4 h-5 w-5" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}