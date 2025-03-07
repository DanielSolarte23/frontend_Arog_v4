"use client"

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faArrowLeft, faArrowAltCircleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Usuario = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [personmodal, setpersonmodal] = useState (false)

  const users = [
    { nombre: "Ana Maria", documento: "24801203", email: "Anamaria@gmail.com", telefono: "3218597930" },
    { nombre: "Carlos López", documento: "12345678", email: "carlos@gmail.com", telefono: "3112345678" },
    { nombre: "María Pérez", documento: "98765432", email: "maria@gmail.com", telefono: "3209876543" },
  ];

  // Función para abrir el modal con los datos de la fila seleccionada
  const handleRowClick = (user) => {
    setSelectedRow(user);
    setpersonmodal(true);
  };

  return (
    <div className=" border w-11/12 m-8 ml-20 rounded-lg border-gray-400">
      <div className="flex  border-gray-400 p-4 border-b">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Buscar usuarios"
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="flex ml-auto">
          <button className="border border-gray-400 rounded px-4 py-2 flex items-center gap-2">
            Filtrar por <FontAwesomeIcon icon={faFilter} />
          </button>
          <button className="ml-4 border bg-green-600 text-white rounded-lg px-4 py-2" onClick={() => setModalOpen(true)}>
            Agregar usuario
          </button>
        </div>
      </div>
      <br />
      <table className="w-11/12 text-sm text-left text-gray-500 dark:text-gray-400 m-8 ml-20 border rounded-xl">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-400">
          <tr>
            <th className="px-6 py-3">Usuario</th>
            <th className="px-6 py-3">Documento de identidad</th>
            <th className="px-6 py-3">Correo electrónico</th>
            <th className="px-6 py-3">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index,user) => (
            <tr
              key={index}
              onClick={() => handleRowClick(user)}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Ana Maria
              </th>
              <td className="px-6 py-4">24801203</td>
              <td className="px-6 py-4">Anamaria@gmail.com</td>
              <td className="px-6 py-4">3218597930</td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
          <div className=" w-6/12  bg-white m-10 border-1 rounded-lg">
          <h1 className="m-4 text-2xl">Añadir un nuevo usuario</h1>
            <div className="flex">
            <div className="m-4 w-2/4">
            <label htmlFor="">Nombres</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Documento de identidad</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Telefono</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label  htmlFor="">Contraseña</label>
            <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="password" />
            </div>
            <div className=" m-4 w-2/4">
            <label htmlFor="">Apellidos</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Correo electronico</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Nombre de usuario</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" />
            <label htmlFor="">Confirmar contraseña</label>
            <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="password" />
            </div>
            </div>
            <div className="flex justify-end">
                <button className="m-4 border rounded-md bg-gray-100 hover:bg-gray-300 w-24 py-2"onClick={() => setModalOpen(false)}>Cancelar</button>
                <button className="text-white m-4 border rounded-md bg-lime-600  hover:bg-lime-700 w-24 py-2">Crear tarea</button>
            </div>
          </div>
          
        </div>
      )}
      {personmodal && selectedRow && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
           <h2 className="text-xl font-semibold mb-4">Detalles del Usuario</h2>
           <p><strong >Nombre:</strong> {selectedRow.nombre}</p>
           <p><strong>Documento:</strong> {selectedRow.documento}</p>
           <p><strong>Correo:</strong> {selectedRow.email}</p>
           <p><strong>Teléfono:</strong> {selectedRow.telefono}</p>
           <button
             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
             onClick={() => setpersonmodal(false)}
           >
             Cerrar
           </button>
         </div>
       </div>
      )}
    </div>
  );
};

export default Usuario;
