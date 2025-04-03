"use client";
import FormularioDinamico from "@/components/admin/Formularios";
import FormularioTipoForm from "@/components/admin/FormularioTipoForm";
// import NotificationModal from "../pruebas/NotificationModal";
import { useFormularioTipo } from "@/context/FormularioTipoContext";
import React, { useEffect, useState } from "react";

function Registros() {
  const { getFormulariosTipo, formularioTipo } = useFormularioTipo();
  const [searchQuery, setSearchQuery] = useState("");
  const [mostrarFormularioTipo, setMostrarFormularioTipo] = useState(false);
  // const [notification, setNotification] = useState({
  //   message: "",
  //   isVisible: false,
  //   type: "success",
  // });

  useEffect(() => {
    getFormulariosTipo();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFormularios = formularioTipo.filter(form => 
    form.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
    form.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const showNotification = (message, type = "success") => {
  //   setNotification({
  //     message,
  //     isVisible: true,
  //     type
  //   });

  //   // Ocultar la notificación después de 5000ms
  //   setTimeout(() => {
  //     setNotification(prev => ({ ...prev, isVisible: false }));
  //   }, 5000);
  // };

  // const closeNotification = () => {
  //   setNotification((prev) => ({ ...prev, isVisible: false }));
  // };

  return (
    <div className="relative bg-gray-50 min-h-screen p-4 md:p-6">
      {/* {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          isVisible={notification.isVisible}
          type={notification.type}
          onClose={closeNotification}
        />
      )} */}
      {/* <FormularioDinamico/> */}
      
      {mostrarFormularioTipo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <FormularioTipoForm
              setMostrarFormularioTipo={setMostrarFormularioTipo}
              getFormulariosTipo={getFormulariosTipo}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {/* Header con buscador y botón */}
        <div className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 md:mr-auto">Formatos Disponibles</h1>
            
            <div className="relative w-full md:w-1/3 flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Buscar formatos..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-3 pl-10 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
              />
            </div>
            
            <button
              onClick={() => setMostrarFormularioTipo(!mostrarFormularioTipo)}
              className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <span>Crear Formato</span>
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

        {/* Contenido de tarjetas */}
        <div className="p-4 md:p-6">
          {filteredFormularios.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-regular fa-folder-open text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">No se encontraron formatos. {searchQuery ? "Intenta con otra búsqueda." : "Crea tu primer formato con el botón 'Crear Formato'."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredFormularios.map((formTipo) => (
                <div
                  key={formTipo.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex items-start gap-4 cursor-pointer bg-white hover:border-lime-500"
                >
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <i className="fa-regular fa-file-lines text-3xl text-lime-600"></i>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">{formTipo.nombre}</h2>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{formTipo.descripcion}</p>
                    <div className="mt-3 flex space-x-2">
                      <button className="text-xs bg-lime-100 text-lime-700 px-2 py-1 rounded-md hover:bg-lime-200 transition-colors">Editar</button>
                      <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors">Ver detalles</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con paginación si es necesario */}
        {filteredFormularios.length > 0 && (
          <div className="border-t border-gray-200 p-4 flex justify-center">
            {/* Aquí puedes agregar tu componente de paginación */}
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
              </button>
              <span className="px-3 py-1 bg-lime-600 text-white rounded">1</span>
              <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* {DetallePago && (
          <DetallesPago
            handleCloseModal={handleCloseModal}
            pagoSeleccionado={pagoSeleccionado}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            nuevoPago={nuevoPago}
            setDetallePago={setDetallePago}
          />
        )} */}

      {/* {modalOpen && (
          <FormularioPago
            handleCloseModal={handleCloseModal}
            pagoSeleccionado={pagoSeleccionado}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            nuevoPago={nuevoPago}
          />
        )} */}
      {/* <FormularioDinamico /> */}
    </div>
  );
}

export default Registros;