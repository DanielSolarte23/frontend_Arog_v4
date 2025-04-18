"use client";
import FormularioInstanciaForm from "@/components/admin/FormularioInstanciaForm";
import FormularioDinamico from "@/components/admin/Formularios";
import FormularioTipoForm from "@/components/admin/FormularioTipoForm";
import { useFormularioTipo } from "@/context/FormularioTipoContext";
import React, { useEffect, useState } from "react";

function Registros() {
  const { getFormulariosTipo, formularioTipo } = useFormularioTipo();
  const [searchQuery, setSearchQuery] = useState("");
  const [mostrarFormularioTipo, setMostrarFormularioTipo] = useState(false);
  const [modalRespuesta, setModalRespuesta] = useState(false);

  useEffect(() => {
    getFormulariosTipo();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFormularios = formularioTipo.filter(
    (form) =>
      form.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative h-full">
      {/* Modal para crear formato */}
      {mostrarFormularioTipo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <FormularioTipoForm
              setMostrarFormularioTipo={setMostrarFormularioTipo}
              getFormulariosTipo={getFormulariosTipo}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl h-full shadow-md overflow-hidden flex flex-col">
        {/* Header con buscador y botón - Mejorado para móviles */}
        <div className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 md:mr-auto">
              Formatos Disponibles
            </h1>

            <div className="relative w-full md:w-1/3 flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-gray-400"></i>
              <input
                type="search"
                placeholder="Buscar formatos..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-3 pl-10 py-2 border border-gray-300 rounded-lg w-full transition-all outline-none"
              />
            </div>

            <button
              onClick={() => setMostrarFormularioTipo(!mostrarFormularioTipo)}
              className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <span className="font-medium">Crear Formato</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 fill-current"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido de tarjetas - Optimizado para diferentes pantallas */}
        <div className="p-4 md:p-6 flex-grow overflow-y-auto">
          {filteredFormularios.length === 0 ? (
            <div className="text-center py-8 md:py-12 h-full flex flex-col items-center justify-center">
              <i className="fa-regular fa-folder-open text-5xl md:text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-base md:text-lg px-4">
                No se encontraron formatos.{" "}
                {searchQuery
                  ? "Intenta con otra búsqueda."
                  : "Crea tu primer formato con el botón 'Crear Formato'."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {filteredFormularios.map((formTipo) => (
                <div
                  key={formTipo.id}
                  className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow duration-200 flex items-start gap-3 md:gap-4 cursor-pointer bg-white"
                >
                  <div className="bg-gray-100 rounded-lg p-2 md:p-3 flex items-center justify-center flex-shrink-0">
                    <i className="fa-regular fa-file-lines text-2xl md:text-3xl text-lime-600"></i>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h2 className="font-semibold text-base md:text-lg text-gray-800 line-clamp-1">
                      {formTipo.nombre}
                    </h2>
                    <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">
                      {formTipo.descripcion}
                    </p>
                    <div className="mt-2 md:mt-3 flex flex-wrap gap-2">
                      <button className="text-xs bg-lime-100 text-lime-700 px-2 py-1 rounded-md hover:bg-lime-200 transition-colors">
                        Editar
                      </button>
                      <button
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
                        onClick={() => setModalRespuesta(true)} // Abre el modal de respuestas
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con paginación - Mejorado para móviles */}
        {filteredFormularios.length > 0 && (
          <div className="border-t p-3 md:p-4 flex justify-center mt-auto">
            <div className="flex items-center justify-between space-x-2 w-full max-w-full">
              <button className="px-2 py-1 md:px-3 md:py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1">
                <i className="fa-solid fa-chevron-left text-xs hidden sm:block"></i>
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-lime-600 text-white rounded text-sm">
                  1
                </span>
                <span className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded cursor-pointer text-sm hidden sm:block">
                  2
                </span>
                <span className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded cursor-pointer text-sm hidden md:block">
                  3
                </span>
                <span className="text-gray-500 text-sm mx-1">...</span>
              </div>

              <button className="px-2 py-1 md:px-3 md:py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1">
                <span>Siguiente</span>
                <i className="fa-solid fa-chevron-right text-xs hidden sm:block"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para mostrar respuestas - Mejorado para móviles */}
      {modalRespuesta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <FormularioInstanciaForm
              setModalRespuesta={setModalRespuesta}
              formularioTipo={formularioTipo}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Registros;
