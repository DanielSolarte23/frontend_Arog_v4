import React from 'react';

const RegistroTransaccionModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    transaccion, 
    onChange 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    {/* Encabezado del Modal */}
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                        <h3 className="text-3xl font-semibold">
                            {transaccion.id ? 'Editar Transacción' : 'Registrar Transacción'}
                        </h3>
                        <button
                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="block w-6 h-6 text-2xl text-black bg-transparent opacity-5 focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>

                    {/* Cuerpo del Modal */}
                    <form onSubmit={onSubmit} className="relative flex-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label 
                                    htmlFor="idPago" 
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    ID de Pago
                                </label>
                                <input
                                    type="number"
                                    id="idPago"
                                    name="idPago"
                                    value={transaccion.idPago}
                                    onChange={onChange}
                                    disabled
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label 
                                    htmlFor="monto" 
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    Monto
                                </label>
                                <input
                                    type="number"
                                    id="monto"
                                    name="monto"
                                    value={transaccion.monto}
                                    onChange={onChange}
                                    required
                                    step="0.01"
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label 
                                    htmlFor="metodoPago" 
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    Método de Pago
                                </label>
                                <select
                                    id="metodoPago"
                                    name="metodoPago"
                                    value={transaccion.metodoPago}
                                    onChange={onChange}
                                    required
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Seleccionar Método de Pago</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Tarjeta">Tarjeta</option>
                                    <option value="PayPal">PayPal</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label 
                                    htmlFor="referencia" 
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    Referencia
                                </label>
                                <input
                                    type="text"
                                    id="referencia"
                                    name="referencia"
                                    value={transaccion.referencia}
                                    onChange={onChange}
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 mb-1 mr-4 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                            >
                                {transaccion.id ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistroTransaccionModal;