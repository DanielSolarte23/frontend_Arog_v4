"use client"

import React, { useState } from "react"


const Pagos =() =>{


    const [modalOpen,setModalOpen]  = useState (false);


    return(
        <div className="relative overflow-x-auto border-2 border-gray-300 shadow-lg m-12 rounded-lg">
      <nav className="bg-white border-2 border-b-gray-300 flex items-center justify-between p-2  gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
            placeholder="Buscar registros..."
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border-2 p-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
            <span className="text-gray-700 font-medium">Filtrar Por</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-gray-600"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          </button>
          <button onClick={()=> setModalOpen(true)}  className="bg-lime-700 px-4 py-2 p-2 rounded-md text-white hover:bg-lime-600 transition">
            Registrar pago +
          </button>
        </div>
      </nav>
      <table className="w-11/12 ml-24 text-sm text-left text-gray-500 border-2 border-gray-200 rounded-xl m-7 shadow-md mb-0">
        <thead className="text-xs text-gray-700 uppercase bg-white border-2 border-gray-300">
          <tr>
            <th className="px-6 py-3">Item</th>
            <th className="px-6 py-3">Bahia</th>
            <th className="px-6 py-3">Nro.Vivienda</th>
            <th className="px-6 py-3">Usuario</th>
            <th className="px-6 py-3">Total pagado</th>
            <th className="px-6 py-3">Mes</th>
            <th className="px-6 py-3">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b border-gray-200">
            <th className="px-6 py-4">1</th>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">25</td>
            <td className="px-6 py-4">Katherine Vazques</td>
            <td className="px-6 py-4">56.000</td>
            <td className="px-6 py-4">Enero</td>
            <td className="px-6 py-4">Ninguna</td>
          </tr>
          <tr className="bg-white border-b border-gray-200">
            <th className="px-6 py-4">1</th>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">25</td>
            <td className="px-6 py-4">Katherine Vazques</td>
            <td className="px-6 py-4">56.000</td>
            <td className="px-6 py-4">Enero</td>
            <td className="px-6 py-4">Ninguna</td>
          </tr>
        </tbody>
      </table>
      <nav className="bg-white border-2 w-11/12  rounded-md border-b-gray-300 flex items-center justify-between p-2  ml-24">
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
        <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
          <div className=" w-6/12  bg-white m-10 border-1 rounded-lg">
          <h1 className="m-4 text-2xl">Registrar pago</h1>
            <div className="flex">
            <div className="m-4 w-2/4">
            <label htmlFor="">Item</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Nro.VIVIENDA</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Total pagado</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label  htmlFor="">Observaciones</label>
            <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            </div>
            <div className=" m-4 w-2/4">
            <label htmlFor="">Bahia</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Usuario</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Mes</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            
            </div>
            </div>
            <div className="flex justify-end">
                <button className="m-4 border rounded-md bg-gray-100 hover:bg-gray-300 w-24 py-2"onClick={() => setModalOpen(false)}>Cancelar</button>
                <button className="text-white m-4 border rounded-md bg-lime-600  hover:bg-lime-700 w-24 py-2">Crear tarea</button>
            </div>
          </div>
          
        </div>
      )}
    
    </div>

    )
}

export default Pagos