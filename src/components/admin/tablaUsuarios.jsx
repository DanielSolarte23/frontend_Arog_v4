"use client"

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faArrowLeft, faArrowAltCircleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Usuario = ({modalOpen}) => {
  // const [modalOpen, setModalOpen] = useState(false);
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
    <div className=" border rounded-lg border-gray-200 h-full p-1">

      <table className="w-full h-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase  
        border-b border-gray-200">
          <tr>
            <th className="px-6 py-5">Usuario</th>
            <th className="px-6 py-5">Documento de identidad</th>
            <th className="px-6 py-5">Correo electrónico</th>
            <th className="px-6 py-5">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index,user) => (
            <tr
              key={index}
              onClick={() => handleRowClick(user)}
              className="bg-white border-b  border-gray-200 hover:bg-gray-50"
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
        <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 ">
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
