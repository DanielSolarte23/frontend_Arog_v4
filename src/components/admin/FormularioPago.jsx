import { useCliente } from "@/context/ClienteContext";
import { useState, useEffect } from "react";

const FormularioPago = ({ handleCloseModal, pagoSeleccionado, handleSubmit, handleInputChange, nuevoPago }) => {

    const { clientes, getClientes } = useCliente()

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
            onKeyDown={(e) => e.key === "Escape" && handleCloseModal()}
        >
            <div className="w-1/2 mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    {pagoSeleccionado ? "Editar Pago" : "Registrar Pago"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="idCliente" className="block text-gray-600">Cliente</label>
                        <select
                            id="idCliente"
                            name="idCliente"
                            value={nuevoPago?.idCliente || ""}
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
                            value={nuevoPago?.descripcion || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fechaPago" className="block text-gray-600">Fecha de Pago</label>
                        <input
                            id="fechaPago"
                            type="datetime-local"
                            name="fechaPago"
                            value={nuevoPago?.fechaPago || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fechaVencimiento" className="block text-gray-600">Fecha de Vencimiento</label>
                        <input
                            id="fechaVencimiento"
                            type="datetime-local"
                            name="fechaVencimiento"
                            value={nuevoPago?.fechaVencimiento || ""}
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
                            value={nuevoPago?.montoPago || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="montoPagoRealizado" className="block text-gray-600">Monto Pagado</label>
                        <input
                            id="montoPagoRealizado"
                            type="number"
                            step="0.01"
                            name="montoPagoRealizado"
                            value={nuevoPago?.montoPagoRealizado || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="interesMora" className="block text-gray-600">Interés por Mora</label>
                        <input
                            id="interesMora"
                            type="number"
                            step="0.01"
                            name="interesMora"
                            value={nuevoPago?.interesMora || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="diasMora" className="block text-gray-600">Días en Mora</label>
                        <input
                            id="diasMora"
                            type="number"
                            name="diasMora"
                            value={nuevoPago?.diasMora || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="estadoMora" className="block text-gray-600">Estado de Pago</label>
                        <select
                            id="estadoMora"
                            name="estadoMora"
                            value={nuevoPago?.estadoMora !== undefined ? String(nuevoPago.estadoMora) : ""} // Convertir a string para la comparacion
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        >
                            <option value="">Seleccionar</option>
                            <option value="false">Pendiente</option>
                            <option value="true">Pagado</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="estadoMora" className="block text-gray-600">Metodo de Pago</label>
                        <select
                            id="metodoPago"
                            name="metodoPago"
                            value={nuevoPago.metodoPago}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-verde"
                        >
                            <option value="">Selecciona un metodo de pago</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="transferencia">Transferencia</option>
                            <option value="paypal">Paypal</option>
                            <option value="otro">Otro</option>
                        </select>
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
