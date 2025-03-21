"use client";
import { useUsuario } from "@/context/UsuarioContext";
import { useState, useEffect } from "react";

export default function UsuariosTabla() {
  const { usuarios, getUsuarios, updateUsuario, deleteUsuario, getUsuario } =
    useUsuario();

  useEffect(() => {
    getUsuarios();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative overflow-x-auto bg-white  h-full border-gray-200 rounded-lg">
      <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-2 px-4 gap-4 h-1/10">
        <div className="relative w-full md:w-auto">
          <input
            type="search"
            className="block w-full placeholder:font-extralight text-lg text-gray-900 border border-gray-200 rounded-lg bg-white px-4 py-2"
            placeholder="Buscar..."
            required
          />
        </div>
        <div className="flex items-center gap-2 md:w-auto">
          {/* <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition w-full md:w-auto justify-center">
            <span className="text-gray-700 font-medium">Filtrar Por</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-gray-400"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          </button> */}
          <button
            className="bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition w-full md:w-auto justify-center"
            onClick={() => setModalOpen(true)}
          >
            <span className="font-medium">Registrar Usuario</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-5 h-5 fill-white"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="overflow-x-auto h-8/10 w-full p-10">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="text-sm text-left text-gray-500 w-full">
            {/* Encabezado */}
            <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4">Nombres</th>
                <th className="px-4 py-3 md:px-6 md:py-4">
                  Correo electronico
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4">Telefono</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Direccion</th>
                <th className="px-4 py-3 md:px-6 md:py-4">rol</th>
              </tr>
            </thead>

            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr
                  className="bg-white border-b border-gray-200"
                  key={usuario.id}
                >
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {usuario.nombres} {usuario.apellidos}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {usuario.correoElectronico}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {usuario.telefono}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {`${usuario.direccion || "sin asignar"}`}{" "}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">{usuario.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="overflow-x-auto h-8/10 w-full p-10 rounded-lg">
        <table className="text-sm text-left text-gray-500 border-gray-200  w-full border ">
          <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-200 ">
            <tr>
              <th className="px-4 py-3 md:px-6 md:py-4">Nombres</th>
              <th className="px-4 py-3 md:px-6 md:py-4">Correo electronico</th>
              <th className="px-4 py-3 md:px-6 md:py-4">Telefono</th>
              <th className="px-4 py-3 md:px-6 md:py-4">Direccion</th>
              <th className="px-4 py-3 md:px-6 md:py-4">rol</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr
                className="bg-white border-b border-gray-200"
                key={usuario.id}
              >
                <td className="px-4 py-2 md:px-6 md:py-4">
                  {usuario.nombres} {usuario.apellidos}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  {usuario.correoElectronico}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  {usuario.telefono}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  {`${usuario.direccion || "sin asignar"}`}{" "}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4">{usuario.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <nav className="bg-white border-t rounded-b-md h-1/10 flex flex-col md:flex-row items-center justify-between p-2 gap-4">
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition order-1 md:order-none w-full md:w-auto justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-gray-400"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          <span className="text-gray-700 font-medium">Anterior</span>
        </button>

        <ul className="flex items-center -space-x-px h-8 text-sm flex-wrap justify-center order-3 md:order-none">
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

        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition order-2 md:order-none w-full md:w-auto justify-center">
          <span className="text-gray-700 font-medium">Siguiente</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-gray-400"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </nav>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px]">
            <h2 className="text-lg md:text-xl font-normal mb-4 md:mb-6">
              Agregar nueva incidencia
            </h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <select className="border border-gray-300 rounded-lg p-2">
                  <option>Remitente</option>
                </select>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <select className="border border-gray-300 rounded-lg p-2">
                  <option>Cedula</option>
                </select>
                <select className="border border-gray-300 rounded-lg p-2">
                  <option>Telefono</option>
                </select>
                <input
                  type="text"
                  placeholder="Tipo de incidente"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Correo"
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
              <textarea
                placeholder="Descripción"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              ></textarea>

              <div className="flex items-center gap-2 mb-4 bg-lime-600 hover:bg-lime-700 p-2 w-20 rounded-md">
                <input
                  type="checkbox"
                  id="visto"
                  className="w-5 h-5 cursor-pointer"
                />
                <label htmlFor="visto" className="text-white cursor-pointer">
                  Visto
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="font-medium">Cancelar</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base w-full md:w-auto"
                >
                  <span className="font-medium">Crear Incidencia</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
