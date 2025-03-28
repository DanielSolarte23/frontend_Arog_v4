"use client";
import FormularioDinamico from "@/components/admin/Formularios";
import FormularioTipoForm from "@/components/admin/FormularioTipoForm";
// import NotificationModal from "../pruebas/NotificationModal";
import { useFormularioTipo } from "@/context/FormularioTipoContext";
import React, { useEffect, useState } from "react";

function Registros() {
  const { getFormulariosTipo, formularioTipo } = useFormularioTipo();

  useEffect(() => {
    getFormulariosTipo();
  }, []);

  const [mostrarFormularioTipo, setMostrarFormularioTipo] = useState(false);
  // const [notification, setNotification] = useState({
  //   message: "",
  //   isVisible: false,
  //   type: "success",
  // });

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
    <div className="relative overflow-x-auto bg-white h-full border-gray-200 rounded-lg">
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
        <FormularioTipoForm
          setMostrarFormularioTipo={setMostrarFormularioTipo}
          getFormulariosTipo={getFormulariosTipo}
        />
      )}

      <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-2 px-4 gap-4 h-[15%] xl-plus:h-1/10">
        <div className="relative w-full md:w-1/3 flex items-center">
          <i className="fa-solid left-3 text-zinc-400 absolute fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Buscar..."
            // value={searchQuery}
            // onChange={handleSearchChange}
            className="px-3 pl-10 py-2 border border-zinc-300 rounded-md w-full focus:outline-none  focus:ring-zinc-300"
          />
        </div>
        <div className="flex items-center gap-2 md:w-auto">
          <button
            className="bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition w-full md:w-auto justify-center"
            // onClick={() => abrirModal(null)}
            onClick={() => setMostrarFormularioTipo(!mostrarFormularioTipo)}
          >
            <span className="font-medium">
              Crear Formato
              {/* {isPago ? "Registrar cliente" : "Registrar pago"} */}
            </span>
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

      <div className="overflow-x-auto h-[70%] xl-plus:h-8/10 w-full p-6 xl-plus:p-10">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 xl-plus:grid-cols-4 xl-plus-grid-rows-4 gap-5">
          {formularioTipo.map((formTipo) => (
            <div
              key={formTipo.id}
              className="border rounded-md p-5 flex items-center"
            >
              <i className="fa-regular fa-file-lines text-5xl text-gray-300"></i>
              <div className="h-full pl-5 flex flex-col justify-center">
                <h1 className=" font-bold">{formTipo.nombre}</h1>
                <p className="text-gray-400">{formTipo.descripcion}</p>
              </div>
            </div>
          ))}

          {/* <div className="border"> hola</div>
          <div className="border"> hola</div>
          <div className="border"> hola</div> */}
        </div>
      </div>

      {/* <div className="bg-white border-t rounded-b-md h-[15%] xl-plus:h-1/10 flex flex-col md:flex-row items-center justify-center p-2 gap-4 px-4">
          <Paginacion
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            getPageNumbers={getPageNumbers}
          />
        </div> */}

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
