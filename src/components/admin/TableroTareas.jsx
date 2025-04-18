"use client";
import { useTarea } from "@/context/TareasContext";
import { useState, useEffect } from "react";
import Cardtarea from "./CardTarea";
import Link from "next/link";
import { useUsuario } from "@/context/UsuarioContext";

export default function TableroTareas() {
  const {
    tareas,
    createTarea,
    getTarea,
    deleteTarea,
    getTareas,
    updateTarea,
    updateEstado,
  } = useTarea();

  const { usuarios, getUsuarios } = useUsuario();

  const [modalOpen, setModalOpen] = useState(false);
  const [detalleModalOpen, setDetalleModalOpen] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  // Nueva variable de estado para las pestañas móviles
  const [columnaActivaMobil, setColumnaActivaMobil] = useState("por_hacer");

  useEffect(() => {
    getTareas();
    getUsuarios();
  }, []);

  const initialTareaState = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    prioridad: "media",
    asignadoId: "",
    creadorId: 1,
    estado: "por_hacer",
    archivada: false,
  };

  const [nuevaTarea, setNuevaTarea] = useState(initialTareaState);

  const [draggedTask, setDraggedTask] = useState(null);

  // Agrupar tareas por estado
  const tareasPorEstado = {
    por_hacer: tareas.filter(
      (tarea) => tarea.estado === "por_hacer" && !tarea.archivada
    ),
    en_progreso: tareas.filter(
      (tarea) => tarea.estado === "en_progreso" && !tarea.archivada
    ),
    completada: tareas.filter(
      (tarea) => tarea.estado === "completada" && !tarea.archivada
    ),
  };

  // Manejar cambios en el formulario de nueva tarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea({ ...nuevaTarea, [name]: value });
  };

  // Crear nueva tarea o actualizar existente
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicion) {
        await updateTarea(nuevaTarea.id, nuevaTarea);
      } else {
        await createTarea(nuevaTarea);
      }

      // Reiniciar el formulario
      setNuevaTarea(initialTareaState);

      // Cerrar el modal y refrescar las tareas
      setModalOpen(false);
      setModoEdicion(false);
      getTareas();
    } catch (error) {
      console.error("Error al crear/actualizar tarea:", error);
    }
  };

  // Abrir modal de detalles de tarea
  const abrirDetalles = (tarea) => {
    setTareaSeleccionada(tarea);
    setDetalleModalOpen(true);
  };

  // Abrir modal de edición de tarea
  const abrirEdicion = (tarea) => {
    setTareaSeleccionada(tarea);
    setNuevaTarea({ ...tarea });
    setModoEdicion(true);
    setDetalleModalOpen(false);
    setModalOpen(true);
  };

  // Archivar tarea
  const archivarTarea = async (id) => {
    try {
      const tarea = tareas.find((t) => t.id === id);
      await updateTarea(id, { ...tarea, archivada: true });
      setDetalleModalOpen(false);
      getTareas();
    } catch (error) {
      console.error("Error al archivar tarea:", error);
    }
  };

  // Manejar cambio de estado en móvil
  const handleCambioEstadoMobil = async (tareaId, nuevoEstado) => {
    try {
      await updateEstado(tareaId, nuevoEstado);
      getTareas();
    } catch (error) {
      console.error(`Error al actualizar estado de tarea ${tareaId}:`, error);
    }
  };

  // Funciones para drag and drop
  const handleDragStart = (tarea) => {
    setDraggedTask(tarea);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (columnaDestino) => {
    if (!draggedTask) return;

    // Si la tarea ya está en esta columna, no hacer nada
    if (draggedTask.estado === columnaDestino) return;

    try {
      // Usar updateEstado en lugar de updateTarea
      // Pasamos el ID de la tarea y el nuevo estado (columnaDestino)
      await updateEstado(draggedTask.id, columnaDestino);

      // Refrescar las tareas después de la actualización
      getTareas();

      // Limpiar el estado de arrastre
      setDraggedTask(null);
    } catch (error) {
      console.error(
        `Error al actualizar estado de tarea ${draggedTask.id}:`,
        error
      );
    }
  };

  // Renderizar una tarjeta de tarea (versión móvil con selector de estado)
  const renderTareaMobil = (tarea) => (
    <div key={tarea.id} className="mb-4">
      <div
        onClick={() => abrirDetalles(tarea)}
        className="relative bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <Cardtarea key={tarea.id} tarea={tarea} handleDragStart={handleDragStart} />
        
        {/* Selector de estado para móviles */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <select
            className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
            value={tarea.estado}
            onClick={(e) => e.stopPropagation()} // Evitar que se abra el modal al hacer clic
            onChange={(e) => {
              e.stopPropagation();
              handleCambioEstadoMobil(tarea.id, e.target.value);
            }}
          >
            <option value="por_hacer">Por hacer</option>
            <option value="en_progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Renderizar una tarjeta de tarea (versión escritorio)
  const renderTarea = (tarea) => (
    <div onClick={() => abrirDetalles(tarea)} key={tarea.id}>
      <Cardtarea
        key={tarea.id}
        tarea={tarea}
        handleDragStart={handleDragStart}
      />
    </div>
  );

  return (
    <div className="h-full">
      <div className="border h-full border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Barra de navegación - Versión optimizada */}
        <nav className="bg-white border-b h-auto md:h-[15%] xl-plus:h-1/10 border-gray-200 flex flex-col md:flex-row items-center justify-between p-3 md:p-4 gap-3">
          {/* Pestañas - Versión escritorio (oculta en móvil) */}
          <div className="hidden md:flex space-x-2 bg-gray-100 p-2 rounded-lg overflow-x-auto">
            <div className="bg-white px-4 py-2 rounded-md font-medium shadow flex items-center gap-1 whitespace-nowrap">
              Todas las tareas
              <span className="text-gray-500 text-sm">
                ({tareas.filter((t) => !t.archivada).length})
              </span>
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium whitespace-nowrap">
              Por hacer
              <span className="text-gray-500 text-sm">
                ({tareasPorEstado.por_hacer.length})
              </span>
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium whitespace-nowrap">
              En progreso
              <span className="text-gray-500 text-sm">
                ({tareasPorEstado.en_progreso.length})
              </span>
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium whitespace-nowrap">
              Completado
              <span className="text-gray-500 text-sm">
                ({tareasPorEstado.completada.length})
              </span>
            </div>
          </div>

          {/* Versión móvil - Contador total */}
          <div className="flex md:hidden w-full justify-between items-center">
            <div className="font-medium text-gray-800">
              Tareas: {tareas.filter((t) => !t.archivada).length}
            </div>
            <div className="flex space-x-2">
              <button
                className="border border-gray-300 p-2 rounded-lg"
                onClick={() => {
                  setModoEdicion(false);
                  setNuevaTarea(initialTareaState);
                  setModalOpen(true);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-gray-700">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V256h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
              <Link href="/secure/administrador/tareas/archivo" className="border border-gray-300 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-gray-700">
                  <path d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Selector de pestañas para móvil */}
          <div className="flex md:hidden w-full overflow-x-auto space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex-1 ${columnaActivaMobil === 'por_hacer' ? 'bg-white shadow' : 'bg-gray-200'}`}
              onClick={() => setColumnaActivaMobil('por_hacer')}
            >
              Por hacer ({tareasPorEstado.por_hacer.length})
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex-1 ${columnaActivaMobil === 'en_progreso' ? 'bg-white shadow' : 'bg-gray-200'}`}
              onClick={() => setColumnaActivaMobil('en_progreso')}
            >
              En progreso ({tareasPorEstado.en_progreso.length})
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex-1 ${columnaActivaMobil === 'completada' ? 'bg-white shadow' : 'bg-gray-200'}`}
              onClick={() => setColumnaActivaMobil('completada')}
            >
              Completada ({tareasPorEstado.completada.length})
            </button>
          </div>

          {/* Botones de acción - Versión escritorio */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
              <Link href="/secure/administrador/tareas/archivo">
                <span className="text-gray-700 font-medium">Archivo</span>
              </Link>
            </button>

            <button
              className="bg-lime-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition"
              onClick={() => {
                setModoEdicion(false);
                setNuevaTarea(initialTareaState);
                setModalOpen(true);
              }}
            >
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

        {/* Vista de escritorio - Grid con 3 columnas */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 p-4 h-[85%] xl-plus:h-9/10">
          {/* Columna Por hacer */}
          <div
            className="bg-white border border-gray-300 rounded-lg min-h-[200px] max-h-full overflow-y-auto scroll-custom"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("por_hacer")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 px-5 pb-2 pt-4 sticky top-0 bg-white">
              Por hacer{" "}
              <span className="text-gray-500 text-sm">
                ({tareasPorEstado.por_hacer.length})
              </span>
            </h3>
            <div className="px-4">
              {tareasPorEstado.por_hacer.map((tarea) => renderTarea(tarea))}
            </div>
          </div>

          {/* Columna En progreso */}
          <div
            className="bg-white border border-gray-300 rounded-lg min-h-[200px] max-h-full overflow-y-auto scroll-custom"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("en_progreso")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 px-5 pb-2 pt-4 sticky top-0 bg-white">
              En progreso{" "}
              <span className="text-gray-500 text-sm">
                ({tareasPorEstado.en_progreso.length})
              </span>
            </h3>
            <div className="px-4">
              {tareasPorEstado.en_progreso.map((tarea) => renderTarea(tarea))}
            </div>
          </div>

          {/* Columna Completado */}
          <div
            className="bg-white border border-gray-300 rounded-lg min-h-[200px] max-h-full overflow-y-auto scroll-custom"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("completada")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 px-5 pb-2 pt-4 sticky top-0 bg-white">
              Completado{" "}
              <span className="text-gray-500 text-sm">
                ({tareasPorEstado.completada.length})
              </span>
            </h3>
            <div className="px-4">
              {tareasPorEstado.completada.map((tarea) => renderTarea(tarea))}
            </div>
          </div>
        </div>

        {/* Vista móvil - Una sola columna activa */}
        <div className="md:hidden h-[85%] p-3 overflow-y-auto">
          <div className="bg-white rounded-lg min-h-[200px]">
            <h3 className="text-black text-lg font-semibold mb-3 sticky top-0 bg-white pb-2 border-b">
              {columnaActivaMobil === 'por_hacer' ? 'Por hacer' : 
               columnaActivaMobil === 'en_progreso' ? 'En progreso' : 'Completadas'}{" "}
              <span className="text-gray-500 text-sm">
                ({tareasPorEstado[columnaActivaMobil].length})
              </span>
            </h3>
            
            <div>
              {tareasPorEstado[columnaActivaMobil].length > 0 
                ? tareasPorEstado[columnaActivaMobil].map(renderTareaMobil)
                : <div className="text-center py-6 text-gray-500">No hay tareas en esta columna</div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Modal de agregar/editar tarea */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3 z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-normal mb-4 md:mb-6">
              {modoEdicion ? "Editar tarea" : "Añadir una nueva tarea"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <input
                  type="text"
                  name="titulo"
                  value={nuevaTarea.titulo}
                  onChange={handleInputChange}
                  placeholder="Titulo de la tarea"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                  required
                />
                <input
                  type="date"
                  name="fechaLimite"
                  value={nuevaTarea.fechaLimite}
                  onChange={handleInputChange}
                  placeholder="Fecha de vencimiento"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
                <select
                  name="prioridad"
                  value={nuevaTarea.prioridad}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
                <select
                  name="asignadoId"
                  value={nuevaTarea.asignadoId}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                >
                  <option value="">Seleccione el usuario</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nombres} {usuario.apellidos}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="descripcion"
                value={nuevaTarea.descripcion}
                onChange={handleInputChange}
                placeholder="Descripcion"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-sm md:text-base"
                rows="3"
              ></textarea>
              <div className="flex flex-col md:flex-row justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition text-sm md:text-base w-full md:w-auto"
                  onClick={() => {
                    setModalOpen(false);
                    setModoEdicion(false);
                    setNuevaTarea(initialTareaState);
                  }}
                >
                  <span className="font-medium">Cancelar</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base w-full md:w-auto"
                >
                  <span className="font-medium">
                    {modoEdicion ? "Guardar cambios" : "Crear tarea"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de detalles de tarea */}
      {detalleModalOpen && tareaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3 z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              {tareaSeleccionada.titulo}
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-2 py-1 rounded-md text-sm ${
                  tareaSeleccionada.prioridad === "alta"
                    ? "bg-red-100 text-red-800"
                    : tareaSeleccionada.prioridad === "media"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Prioridad: {tareaSeleccionada.prioridad}
              </span>

              <span
                className={`px-2 py-1 rounded-md text-sm ${
                  tareaSeleccionada.estado === "por_hacer"
                    ? "bg-gray-100 text-gray-800"
                    : tareaSeleccionada.estado === "en_progreso"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Estado: {tareaSeleccionada.estado.replace("_", " ")}
              </span>

              {tareaSeleccionada.fechaLimite && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">
                  Fecha límite:{" "}
                  {new Date(tareaSeleccionada.fechaLimite).toLocaleDateString()}
                </span>
              )}

              {tareaSeleccionada.asignadoId && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                  Asignado a:{" "}
                  {tareaSeleccionada.asignado?.nombres || "sin asignar"}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Descripción:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {tareaSeleccionada.descripcion || "Sin descripción"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-300 transition text-sm md:text-base w-full md:w-auto"
                onClick={() => setDetalleModalOpen(false)}
              >
                <span className="font-medium">Cerrar</span>
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-verde-dos text-white rounded-md transition text-sm md:text-base w-full md:w-auto"
                onClick={() => archivarTarea(tareaSeleccionada.id)}
              >
                <span className="font-medium">Archivar</span>
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base w-full md:w-auto"
                onClick={() => abrirEdicion(tareaSeleccionada)}
              >
                <span className="font-medium">Editar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}