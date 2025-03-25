import React from "react";

function DetallesPago({
  handleCloseModal,
  pagoSeleccionado,
  handleSubmit,
  handleInputChange,
  nuevoPago,
  setDetallePago,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px]">
        <h2 className="text-lg md:text-xl font-normal mb-4 md:mb-6">
          Factura de pago
        </h2>

        <div className="">
          <div>
            <h3 className=" font-medium">Nombre y apellido</h3>
            <p className="text-gray-400">
              {pagoSeleccionado.cliente?.nombre}{" "}
              {pagoSeleccionado.cliente?.apellido}
            </p>
          </div>
          <div>
            <h3 className=" font-medium">Descripcion</h3>
            <p className="text-gray-400">{pagoSeleccionado.descripcion} </p>
          </div>
          <div>
            <h3 className=" font-medium">Fecha de emision</h3>
            <p className="text-gray-400">{pagoSeleccionado.fechaEmision} </p>
          </div>
          <div>
            <h3 className=" font-medium">Fecha de vencimiento</h3>
            <p className="text-gray-400">{pagoSeleccionado.fechaVencimiento} </p>
          </div>
          <div>
            <h3 className=" font-medium">Plan de pago</h3>
            <p className="text-gray-400">{pagoSeleccionado.planPago ? "Si" : "No"} </p>
          </div>
        </div>

        <div className="flex gap-5 justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-verde rounded-md hover:bg-gray-400 transition"
            onClick={() => {
              setDetallePago(false);
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base w-full md:w-auto"
          >
            {}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallesPago;
