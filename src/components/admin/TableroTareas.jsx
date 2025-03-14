"use client";
import { useTarea } from "@/context/TareasContext";
import { useState, useEffect } from "react";

export default function TableroTareas() {
  const {tareas, getTareas} = useTarea();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getTareas();
    console.log("estas son las tareas", tareas)
  }, [])

  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    prioridad: "",
    asignadoId: "",
    creadorId: "",
    estado: "por_hacer",
    archivada: false
  });

  const [tareass, setTareass] = useState({
    por_hacer: [],
    en_progreso: [],
    completado: []
  });

  const [draggedTask, setDraggedTask] = useState(null);

  const tareasPorEstado = tareas.reduce((acc, tarea) => {
    acc[tarea.estado] = acc[tarea.estado] || [];
    acc[tarea.estado].push(tarea);
    return acc;
  }, {});

  useEffect(() =>{
    console.log("tareas dividas por estado", tareasPorEstado);
  }, []);

  useEffect(() => {
    const tareasIniciales = {
      por_hacer: [
        {
          id: "1",
          titulo: "Planificar rutas de recolección",
          descripcion: "Diseñar rutas eficientes para la recolección de residuos en la zona norte",
          fechaVencimiento: "2025-03-20",
          etiquetas: "Planificación",
          asignado: "Carlos Méndez",
          estado: "por_hacer",
          comentarios: 2
        },
        {
          id: "2",
          titulo: "Revisar equipos de seguridad",
          descripcion: "Verificar que todos los equipos de seguridad estén en buen estado y listos para usar",
          fechaVencimiento: "2025-03-17",
          etiquetas: "Seguridad",
          asignado: "Ana López",
          estado: "por_hacer",
          comentarios: 0
        }
      ],
      en_progreso: [
        {
          id: "3",
          titulo: "Mantenimiento de camiones",
          descripcion: "Realizar el mantenimiento preventivo de la flota de camiones recolectores",
          fechaVencimiento: "2025-03-18",
          etiquetas: "Mantenimiento",
          asignado: "Luis Torres",
          estado: "en_progreso",
          comentarios: 3
        }
      ],
      completado: [
        {
          id: "4",
          titulo: "Realizar la ruta Aida Lucia",
          descripcion: "Realizar la ruta establecida desde AROG hasta Aida Lucia recojiendo los residuos producidos por los ciudadanos",
          fechaVencimiento: "2025-03-12",
          etiquetas: "Rutas",
          asignado: "Miguel Sánchez",
          estado: "completado",
          comentarios: 1
        },
        {
          id: "5",
          titulo: "Realizar la ruta Aida Lucia",
          descripcion: "Realizar la ruta establecida desde AROG hasta Aida Lucia recojiendo los residuos producidos por los ciudadanos",
          fechaVencimiento: "2025-03-12",
          etiquetas: "Rutas",
          asignado: "Miguel Sánchez",
          estado: "completado",
          comentarios: 1
        }
      ]
    };
    
    setTareass(tareasIniciales);
  }, []);

  // Manejar cambios en el formulario de nueva tarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea({ ...nuevaTarea, [name]: value });
  };

  // Crear nueva tarea
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevaTareaCompleta = {
      ...nuevaTarea,
      id: Date.now().toString(),
      estado: "por_hacer",
      comentarios: 0
    };
    
    setTareass({
      ...tareass,
      por_hacer: [...tareass.por_hacer, nuevaTareaCompleta]
    });
    
    setNuevaTarea({
      id: "",
      titulo: "",
      descripcion: "",
      fechaVencimiento: "",
      etiquetas: "",
      asignado: "",
      estado: "por_hacer",
      comentarios: 0
    });
    
    setModalOpen(false);
  };

  // Funciones para drag and drop
  const handleDragStart = (tarea) => {
    setDraggedTask(tarea);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (columnaDestino) => {
    if (!draggedTask) return;
    
    // Si la tarea ya está en esta columna, no hacer nada
    if (draggedTask.estado === columnaDestino) return;
    
    // Eliminar la tarea de su columna actual
    const columnaActual = draggedTask.estado;
    const nuevasTareas = { ...tareass };
    
    nuevasTareas[columnaActual] = nuevasTareas[columnaActual].filter(
      tarea => tarea.id !== draggedTask.id
    );
    
    // Actualizar el estado de la tarea
    const tareaActualizada = { ...draggedTask, estado: columnaDestino };
    
    // Agregar la tarea a la nueva columna
    nuevasTareas[columnaDestino] = [...nuevasTareas[columnaDestino], tareaActualizada];
    
    // Actualizar el estado
    setTareass(nuevasTareas);
    
    // En un ambiente real, aquí se enviaría la actualización al backend
    console.log(`Tarea ${tareaActualizada.id} movida a ${columnaDestino}`);
    
    // Limpiar el estado de arrastre
    setDraggedTask(null);
  };

  // Renderizar una tarjeta de tarea
  const renderTarea = (tarea) => (
    <div
      key={tarea.id}
      className="block mb-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition cursor-pointer"
      draggable
      onDragStart={() => handleDragStart(tarea)}
    >
      <h5 className="mb-2 text-lg font-semibold text-black">{tarea.titulo}</h5>
      <p className="text-gray-700">{tarea.descripcion}</p>
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="fill-gray-400 w-4 h-4"
          >
            <path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" />
          </svg>
          <span className="text-sm ml-2 text-gray-400">
            {new Date(tarea.fechaVencimiento).toLocaleDateString('es-ES', { weekday: 'long' })}
          </span>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-gray-400 w-4 h-4"
          >
            <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
          </svg>
          <span className="text-sm ml-2 text-gray-400">{tarea.comentarios}</span>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-gray-400 w-5 h-5"
          >
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
          <span className="text-sm ml-2 text-gray-400">{tarea.asignado.split(' ')[0]}</span>
        </div>
      </div>
    </div>
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

              {/* <span className="text-gray-500 text-sm">({tareas.estado === "pendiente".length})</span> */}
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              En progreso
            </div>
            <div className="bg-gray-200 px-4 py-2 rounded-md font-medium">
              Completado
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
              Por hacer <span className="text-gray-500 text-sm">({tareass.por_hacer.length})</span>
            </h3>
            
            {tareass.por_hacer.map(tarea => renderTarea(tarea))}
          </div>
          
          {/* Columna En progreso */}
          <div 
            className="bg-white border border-gray-300 rounded-lg p-4 min-h-[200px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("en_progreso")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 ml-1">
              En progreso <span className="text-gray-500 text-sm">({tareass.en_progreso.length})</span>
            </h3>
            
            {tareass.en_progreso.map(tarea => renderTarea(tarea))}
          </div>
          
          {/* Columna Completado */}
          <div 
            className="bg-white border border-gray-300 rounded-lg p-4 min-h-[200px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("completado")}
          >
            <h3 className="text-black text-xl font-semibold mb-4 ml-1">
              Completado <span className="text-gray-500 text-sm">({tareass.completado.length})</span>
            </h3>
            
            {tareass.completado.map(tarea => renderTarea(tarea))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-normal mb-4 md:mb-6">
              Añadir una nueva tarea
            </h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Titulo de la tarea"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Fecha de vencimiento"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Etiquetas"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />

                <input
                  type="text"
                  placeholder="Asignado"
                  className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
                />
              </div>
              <textarea
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
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition  text-sm md:text-base w-full md:w-auto"
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
