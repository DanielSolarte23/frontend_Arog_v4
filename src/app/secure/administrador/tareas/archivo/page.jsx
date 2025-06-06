"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTarea } from "@/context/TareasContext";

export default function Insidencias() {
  const { getTareasArchivo, tareasArchivo } = useTarea();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    getTareasArchivo();
  }, []);

  // Función para truncar la descripción a 3 palabras
  const truncateDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length <= 3) return description;
    return words.slice(0, 3).join(" ") + "...";
  };

  // Abrir modal con los detalles de la tarea
  const openModal = (tarea) => {
    setSelectedTarea(tarea);
    setModalVisible(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedTarea(null);
  };

  // Filtrar tareas por término de búsqueda
  const filteredTasks = tareasArchivo.filter(
    (tarea) =>
      tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tarea.descripcion && tarea.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tarea.asignado && tarea.asignado.nombres && tarea.asignado.nombres.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tarea.creador && tarea.creador.nombres && tarea.creador.nombres.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Formatear fecha para mostrar mejor
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="relative overflow-x-auto h-full border-gray-200 rounded-lg bg-white border">
      {/* Barra de navegación superior con búsqueda */}
      <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-2 px-4 gap-4 h-auto md:h-1/10">
        <div className="relative w-full md:w-auto">
          <input
            type="search"
            className="block w-full placeholder:font-extralight text-lg text-gray-900 border border-gray-200 rounded-lg bg-white px-4 py-2"
            placeholder="Buscar registros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2 md:w-auto w-full">
          <button className="bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition w-full md:w-auto justify-center">
            <Link href="/secure/administrador/tareas">
              <span className="font-medium">Tablero</span>
            </Link>
          </button>
        </div>
      </nav>

      {/* Contenido principal responsivo */}
      <div className="overflow-x-auto h-[80%] md:h-8/10 w-full p-4 md:p-10">
        {/* Vista de tabla para pantallas medianas y grandes */}
        <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
          <table className="text-sm text-left text-gray-500 w-full">
            {/* Encabezado */}
            <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4">Titulo</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Descripcion</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Prioridad</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Asignado</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Creador</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Fecha</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Fecha límite</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Acción</th>
              </tr>
            </thead>

            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((tarea) => (
                <tr key={tarea.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => openModal(tarea)}>
                  <td className="px-4 py-2 md:px-6 md:py-4">{tarea.titulo}</td>
                  <td className="px-4 py-2 md:px-6 md:py-4">{truncateDescription(tarea.descripcion)}</td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      tarea.prioridad === "alta" ? "bg-red-100 text-red-800" :
                      tarea.prioridad === "media" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {tarea.prioridad}
                    </span>
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {tarea.asignado ? `${tarea.asignado.nombres} ${tarea.asignado.apellidos}` : ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {tarea.creador ? `${tarea.creador.nombres} ${tarea.creador.apellidos}` : ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">{formatDate(tarea.fechaCreacion)}</td>
                  <td className="px-4 py-2 md:px-6 md:py-4">{formatDate(tarea.fechaLimite)}</td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    <div className="flex gap-2">
                      <button 
                        className="bg-verde-dos p-2 rounded-lg text-white flex items-center gap-2 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(tarea);
                        }}
                      >
                        <span className="font-medium">Detalles</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista de tarjetas para móviles */}
        <div className="md:hidden space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No se encontraron tareas archivadas
            </div>
          ) : (
            filteredTasks.map((tarea) => (
              <div
                key={tarea.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                onClick={() => openModal(tarea)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">{tarea.titulo}</h3>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    tarea.prioridad === "alta" ? "bg-red-100 text-red-800" :
                    tarea.prioridad === "media" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {tarea.prioridad}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  {tarea.descripcion && (
                    <div className="text-gray-600 mb-2">
                      {truncateDescription(tarea.descripcion)}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-1">
                    <span className="font-medium">Asignado:</span>
                    <span className="col-span-2 text-gray-600 truncate">
                      {tarea.asignado ? `${tarea.asignado.nombres} ${tarea.asignado.apellidos}` : "-"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <span className="font-medium">Creado:</span>
                    <span className="col-span-2 text-gray-600">
                      {formatDate(tarea.fechaCreacion)}
                    </span>
                  </div>

                  {tarea.fechaLimite && (
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-medium">Límite:</span>
                      <span className="col-span-2 text-gray-600">
                        {formatDate(tarea.fechaLimite)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
                  <button 
                    className="bg-verde-dos px-3 py-1 rounded text-white text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(tarea);
                    }}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Paginación responsive */}
      <nav className="bg-white border-t rounded-b-md h-auto py-4 md:h-1/10 flex flex-col md:flex-row items-center justify-between p-2 gap-4">
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

        {/* Paginación para escritorio */}
        <ul className="hidden md:flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:text-gray-400 dark:hover:text-gray-600"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:text-gray-400 dark:hover:text-gray-600"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:text-gray-400 dark:hover:text-gray-600"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:text-gray-400 dark:hover:text-gray-600"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:text-gray-400 dark:hover:text-gray-600"
            >
              5
            </a>
          </li>
        </ul>
        
        {/* Paginación simplificada para móviles */}
        <div className="md:hidden flex items-center">
          <span className="px-3 py-1 text-gray-700">
            Página 1 de 5
          </span>
        </div>

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

      {/* Modal de detalles (mantener igual) */}
      {modalVisible && selectedTarea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Encabezado del modal */}
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-800">Detalles de la tarea</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cuerpo del modal */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Título</h3>
                    <p className="text-base font-medium text-gray-900">{selectedTarea.titulo}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                    <p className="text-base text-gray-900">{selectedTarea.descripcion}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      selectedTarea.estado === "completada" ? "bg-green-100 text-green-800" :
                      selectedTarea.estado === "en_proceso" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {selectedTarea.estado === "por_hacer" ? "Por hacer" : 
                       selectedTarea.estado === "en_proceso" ? "En proceso" : 
                       "Completada"}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Prioridad</h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      selectedTarea.prioridad === "alta" ? "bg-red-100 text-red-800" :
                      selectedTarea.prioridad === "media" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {selectedTarea.prioridad}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Asignado a</h3>
                    <p className="text-base text-gray-900">
                      {selectedTarea.asignado ? `${selectedTarea.asignado.nombres} ${selectedTarea.asignado.apellidos}` : "-"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Creado por</h3>
                    <p className="text-base text-gray-900">
                      {selectedTarea.creador ? `${selectedTarea.creador.nombres} ${selectedTarea.creador.apellidos}` : "-"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fecha de creación</h3>
                    <p className="text-base text-gray-900">{formatDate(selectedTarea.fechaCreacion)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fecha límite</h3>
                    <p className="text-base text-gray-900">{formatDate(selectedTarea.fechaLimite)}</p>
                  </div>
                  
                  {selectedTarea.fechaCompletada && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Fecha de completado</h3>
                      <p className="text-base text-gray-900">{formatDate(selectedTarea.fechaCompletada)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sección de ruta (si existe) */}
              {selectedTarea.ruta && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Ruta</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{selectedTarea.ruta.nombre}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pie del modal */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}