import { useCliente } from "@/context/ClienteContext";
import { useState, useEffect } from "react";

const FormularioPago = ({ handleCloseModal, pagoSeleccionado, handleSubmit, handleInputChange, nuevoPago }) => {
    const { clientes, getClientes } = useCliente();

    useEffect(() => {
        getClientes();
    }, []);

    // Formatear fechas para inputs datetime-local
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // Formatear a YYYY-MM-DDTHH:mm para inputs datetime-local
        return date.toISOString().slice(0, 16);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
            onKeyDown={(e) => e.key === "Escape" && handleCloseModal()}
        >
            <div className="w-1/2 mx-auto p-4 bg-white shadow-md rounded-lg max-h-[600px] xl-plus:max-h-[750px] overflow-y-auto scroll-custom">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    {pagoSeleccionado ? "Editar Pago" : "Registrar Pago"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="idCliente" className="block text-gray-600">Cliente</label>
                        <select
                            id="idCliente"
                            name="idCliente"
                            value={pagoSeleccionado?.idCliente || nuevoPago?.idCliente || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                            autoFocus
                        >
                            <option value="">Seleccione un cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombre} {cliente.apellido}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="block text-gray-600">Descripción</label>
                        <input
                            id="descripcion"
                            type="text"
                            name="descripcion"
                            value={pagoSeleccionado?.descripcion || nuevoPago?.descripcion || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    {pagoSeleccionado && (
                        <div className="mb-3">
                            <label htmlFor="fechaEmision" className="block text-gray-600">Fecha de Emisión</label>
                            <input
                                id="fechaEmision"
                                type="datetime-local"
                                name="fechaEmision"
                                value={formatDateForInput(pagoSeleccionado.fechaEmision)}
                                disabled
                                className="w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="fechaVencimiento" className="block text-gray-600">Fecha de Vencimiento</label>
                        <input
                            id="fechaVencimiento"
                            type="datetime-local"
                            name="fechaVencimiento"
                            value={pagoSeleccionado
                                ? formatDateForInput(pagoSeleccionado.fechaVencimiento)
                                : formatDateForInput(nuevoPago?.fechaVencimiento)}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="montoPago" className="block text-gray-600">Monto a Pagar</label>
                        <input
                            id="montoPago"
                            type="number"
                            step="0.01"
                            name="montoPago"
                            value={pagoSeleccionado?.montoPago || nuevoPago?.montoPago || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>
                    <div className="flex gap-5 justify-end">
                        <button type="button" className="px-4 py-2 bg-verde rounded-md hover:bg-gray-400 transition"
                            onClick={handleCloseModal}>
                            Cancelar
                        </button>
                        <button type="submit"
                            className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base w-full md:w-auto">
                            {pagoSeleccionado ? "Guardar Cambios" : "Registrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioPago;