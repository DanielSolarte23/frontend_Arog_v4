"use client";
import { useTarea } from "@/context/TareasContext";
import { useState, useEffect } from "react";
import Cardtarea from "./CardTarea";

export default function TableroTareas() {
  const {
    tareas,
    createTarea,
    getTarea,
    deleteTarea,
    getTareas,
    updateTarea,
  } = useTarea();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getTareas();
  }, []);

  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    prioridad: "media",
    asignadoId: "",
    creadorId: "",
    estado: "por_hacer",
    archivada: false
  });

  const [draggedTask, setDraggedTask] = useState(null);

  // Agrupar tareas por estado
  const tareasPorEstado = {
    por_hacer: tareas.filter(tarea => tarea.estado === "por_hacer"),
    en_progreso: tareas.filter(tarea => tarea.estado === "en_progreso"),
    completado: tareas.filter(tarea => tarea.estado === "completado")
  };

  // Manejar cambios en el formulario de nueva tarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea({ ...nuevaTarea, [name]: value });
  };

  // Crear nueva tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createTarea(nuevaTarea);
      
      // Reiniciar el formulario
      setNuevaTarea({
        titulo: "",
        descripcion: "",
        fechaLimite: "",
        prioridad: "media",
        asignadoId: "",
        creadorId: "",
        estado: "por_hacer",
        archivada: false
      });
      
      // Cerrar el modal y refrescar las tareas
      setModalOpen(false);
      getTareas();
    } catch (error) {
      console.error("Error al crear tarea:", error);
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
      // Actualizar el estado de la tarea usando el contexto
      const tareaActualizada = { ...draggedTask, estado: columnaDestino };
      await updateTarea(tareaActualizada.id, tareaActualizada);
      
      // Refrescar las tareas después de la actualización
      getTareas();
      
      // Limpiar el estado de arrastre
      setDraggedTask(null);
    } catch (error) {
      console.error(`Error al actualizar tarea ${draggedTask.id}:`, error);
    }
  };

  // Renderizar una tarjeta de tarea
  const renderTarea = (tarea) => (
    <Cardtarea 
      key={tarea.id} 
      tarea={tarea} 
      handleDragStart={handleDragStart}
    />
  );

  return (
    <div className="h-full">
      <div className="border h-full border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white">
        <nav className="bg-white border-b border-gray-200 flex flex-col md:flex-row items-center justify-between p-4 gap-4">
          <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg">
            <div className="bg-white px-4 py-2 rounded-md font-medium shadow flex items-center gap-1">
              Todas las tareas
              <span className="text-gray-500 text-sm">({tareas.length})</span>
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              Por hacer
              <span className="text-gray-500 text-sm">({tareasPorEstado.por_hacer.length})</span>
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              En progreso
              <span className="text-gray-500 text-sm">({tareasPorEstado.en_progreso.length})</span>
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              Completado
              <span className="text-gray-500 text-sm">({tareasPorEstado.completado.length})</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
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
              className="bg-lime-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition"
              onClick={() => setModalOpen(true)}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {/* Columna Por hacer */}
          <div 
            className="bg-white border border-gray-300 rounded-lg p-4 min-h-[200px] overflow-y-auto"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("por_hacer")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 ml-1">
              Por hacer <span className="text-gray-500 text-sm">({tareasPorEstado.por_hacer.length})</span>
            </h3>
            
            {tareasPorEstado.por_hacer.map(tarea => renderTarea(tarea))}
          </div>
          
          {/* Columna En progreso */}
          <div 
            className="bg-white border border-gray-300 rounded-lg p-4 min-h-[200px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("en_progreso")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 ml-1">
              En progreso <span className="text-gray-500 text-sm">({tareasPorEstado.en_progreso.length})</span>
            </h3>
            
            {tareasPorEstado.en_progreso.map(tarea => renderTarea(tarea))}
          </div>
          
          {/* Columna Completado */}
          <div 
            className="bg-white border border-gray-300 rounded-lg p-4 min-h-[200px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("completado")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 ml-1">
              Completado <span className="text-gray-500 text-sm">({tareasPorEstado.completado.length})</span>
            </h3>
            
            {tareasPorEstado.completado.map(tarea => renderTarea(tarea))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-normal mb-4 md:mb-6">
              Añadir una nueva tarea
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
                <input
                  type="text"
                  name="asignadoId"
                  value={nuevaTarea.asignadoId}
                  onChange={handleInputChange}
                  placeholder="Asignado a"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
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
                  onClick={() => setModalOpen(false)}
                >
                  <span className="font-medium">Cancelar</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base w-full md:w-auto"
                >
                  <span className="font-medium">Crear tarea</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}