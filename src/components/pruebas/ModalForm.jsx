"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useVehiculo } from "@/context/VehiculoContext";

const VehiculoForm = ({ isOpen, closeModal, mode, selectedVehiculo, openEditModal }) => {
    const { createVehiculo, updateVehiculo } = useVehiculo();
    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        if (mode === "edit" && selectedVehiculo) {
            setValue("marca", selectedVehiculo.marca);
            setValue("modelo", selectedVehiculo.modelo);
            setValue("placa", selectedVehiculo.placa);
        } else {
            reset();
        }
    }, [mode, selectedVehiculo, setValue, reset]);
    const onSubmit = (data) => {
        if (mode === "create") {
            createVehiculo(data);
        } else if (mode === "edit") {
            console.log("selectedVehiculo:", selectedVehiculo);
            console.log("selectedVehiculo.id:", selectedVehiculo.id);
            if (typeof selectedVehiculo.id !== 'number') {
                console.error("Error: selectedVehiculo._id no es un número válido.");
                return;
            }
            updateVehiculo(selectedVehiculo.id, data);
        }
        closeModal();
    };

    if (!isOpen) return null;

    if (mode === "details") {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles del Vehículo</h2>
                    <p><strong>Marca:</strong> {selectedVehiculo.marca}</p>
                    <p><strong>Modelo:</strong> {selectedVehiculo.modelo}</p>
                    <p><strong>Placa:</strong> {selectedVehiculo.placa}</p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => openEditModal(selectedVehiculo)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {mode === "create" ? "Añadir Vehículo" : "Editar Vehículo"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Marca:</label>
                        <input
                            {...register("marca", { required: true })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej. Toyota"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Modelo:</label>
                        <input
                            {...register("modelo", { required: true })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej. Corolla"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Placa:</label>
                        <input
                            {...register("placa", { required: true })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej. ABC-123"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            {mode === "create" ? "Guardar" : "Actualizar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehiculoForm;