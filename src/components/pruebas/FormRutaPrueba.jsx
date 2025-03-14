"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useVehiculo } from "@/context/VehiculoContext";
import { useUbicacion } from "@/context/UbicacionContext";
import { useUsuario } from "@/context/UsuarioContext";
import { useRutas } from "@/context/RutasContext";
import { useFormularioTipo } from "@/context/FormularioTipoContext";

const RutaForm = ({ isOpen, closeModal, mode, selectedRuta, openEditModal }) => {
    const { vehiculos, getVehiculos } = useVehiculo();
    const { ubicaciones, getUbicaciones } = useUbicacion();
    const { usuarios, getUsuarios } = useUsuario();
    const { formularioTipo, getFormulariosTipo } = useFormularioTipo();
    const { getRutas, createRuta, updateRuta } = useRutas();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, reset, control } = useForm({
        defaultValues: {
            nombre: "",
            horaInicio: "",
            horaFin: null,
            usuarioAsignadoId: "null",
            puntos: [{ idUbicacion: "", orden: 1 }],
            idVehiculo: "",
            formularioTipoId: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "puntos",
    });

    useEffect(() => {
        getVehiculos();
        getUbicaciones();
        getUsuarios();
        getFormulariosTipo();
    }, []);

    useEffect(() => {
        if (mode === "edit" && selectedRuta) {
            setValue("nombre", selectedRuta.nombre);
            setValue("horaInicio", selectedRuta.horaInicio);
            setValue("horaFin", selectedRuta.horaFin);

            // Verificar si usuarioAsignadoId existe antes de convertirlo a string
            if (selectedRuta.usuarioAsignadoId != null) {
                setValue("usuarioAsignadoId", selectedRuta.usuarioAsignadoId.toString());
            } else {
                setValue("usuarioAsignadoId", "");
            }

            // Verificar si idVehiculo existe antes de convertirlo a string
            if (selectedRuta.idVehiculo != null) {
                setValue("idVehiculo", selectedRuta.idVehiculo.toString());
            } else {
                setValue("idVehiculo", "");
            }

            // Modified part to handle different formats of points data
            if (selectedRuta.puntos && selectedRuta.puntos.length > 0) {
                setValue("puntos", selectedRuta.puntos.map(punto => ({
                    idUbicacion: punto.idUbicacion ? punto.idUbicacion.toString() : "",
                    orden: punto.orden
                })));
            } else if (selectedRuta.puntosRuta && selectedRuta.puntosRuta.length > 0) {
                // Handle the case where points come in puntosRuta format (from TablaRutas)
                setValue("puntos", selectedRuta.puntosRuta.map((punto, index) => ({
                    idUbicacion: punto.ubicacion?.id ? punto.ubicacion.id.toString() : "",
                    orden: punto.orden || index + 1
                })));
            }

            if (selectedRuta.formularioTipoId) {
                setValue("formularioTipoId", selectedRuta.formularioTipoId);
            }
        } else {
            reset({
                nombre: "",
                horaInicio: "",
                horaFin: null,
                usuarioAsignadoId: "",
                puntos: [{ idUbicacion: "", orden: 1 }],
                idVehiculo: "",
                formularioTipoId: [],
            });
        }
    }, [mode, selectedRuta, setValue, reset]);

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const formattedData = {
                id: data.id,
                nombre: data.nombre,
                horaInicio: data.horaInicio,
                horaFin: data.horaFin,
                usuarioAsignadoId: data.usuarioAsignadoId ? parseInt(data.usuarioAsignadoId) : null,
                idVehiculo: data.idVehiculo ? parseInt(data.idVehiculo) : null,
                puntos: data.puntos.map((punto, index) => ({
                    idUbicacion: parseInt(punto.idUbicacion),
                    orden: index + 1,
                })),
                formularioTipoId: parseInt(data.formularioTipoId),
            };

            if (mode === "create") {
                const rutaData = await createRuta(formattedData);
                if (rutaData) {
                    try {
                        const vehiculoResponse = await fetch(
                            "http://localhost:3002/api/rutas/asignar-vehiculo",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    idRuta: rutaData.id,
                                    idVehiculo: parseInt(data.idVehiculo),
                                }),
                            }
                        );
                        const vehiculoData = await vehiculoResponse.json();
                        if (!vehiculoResponse.ok) {
                            throw new Error(
                                vehiculoData.message || "Error al asignar el vehículo"
                            );
                        }
                        alert("Vehículo asignado a la ruta correctamente");
                        getVehiculos();
                    } catch (error) {
                        alert(error.message);
                    }
                } else {
                    alert("error al crear la ruta");
                }
            } else if (mode === "edit") {
                if (!selectedRuta || typeof selectedRuta.id !== 'number') {
                    console.error("Error: selectedRuta.id no es un número válido.");
                    return;
                }
                await updateRuta(selectedRuta.id, formattedData);
                alert("Ruta actualizada correctamente");
                try {
                    const vehiculoResponse = await fetch(
                        "http://localhost:3002/api/rutas/asignar-vehiculo",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                idRuta: selectedRuta.id,
                                idVehiculo: parseInt(data.idVehiculo),
                            }),
                        }
                    );
                    const vehiculoData = await vehiculoResponse.json();
                    if (!vehiculoResponse.ok) {
                        throw new Error(
                            vehiculoData.message || "Error al asignar el vehículo"
                        );
                    }
                    getVehiculos();
                } catch (error) {
                    alert(error.message);
                }
            }
            setIsLoading(false);
            getRutas();
            closeModal();
        } catch (error) {
            alert(error.message || "Error al procesar la ruta");
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    if (mode === "details") {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300">
                <div className="bg-white p-6 rounded-xl shadow-2xl w-96 transform scale-100 transition-transform duration-300">
                    {/* Encabezado */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Detalles de la Ruta</h2>

                    {/* Información de la ruta */}
                    <div className="space-y-2 text-gray-700">
                        <p><strong><i className="fa-solid fa-signature"></i> Nombre:</strong> {selectedRuta.nombre}</p>
                        <p><strong><i className="fa-solid fa-clock"></i> Hora de inicio:</strong> {new Date(selectedRuta.horaInicio).toLocaleString()}</p>
                        <p><strong><i className="fa-solid fa-user"></i> Usuario asignado:</strong> {selectedRuta.usuarioAsignado ? `${selectedRuta.usuarioAsignado.nombres} ${selectedRuta.usuarioAsignado.apellidos}` : 'No asignado'}</p>

                        <p><strong><i className="fa-solid fa-car"></i> Vehículo:</strong> {selectedRuta.vehiculosAsignados.length > 0 ? `${selectedRuta.vehiculosAsignados[0].vehiculo.marca} - ${selectedRuta.vehiculosAsignados[0].vehiculo.placa}` : 'No asignado'}</p>

                    </div>

                    {/* Puntos de recolección */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800"><i className="fa-solid fa-map-pin"></i> Puntos de recolección:</h3>
                        <ul className="list-none pl-3 mt-2 space-y-1">
                            {selectedRuta.puntosRuta && selectedRuta.puntosRuta.map((punto, index) => (
                                <li key={index} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 shadow-sm">
                                    <span className="text-gray-700">{punto.ubicacion?.nombre || `Punto ${punto.orden}`}</span>
                                    <span className="text-sm text-gray-500">(Orden: {punto.orden})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => openEditModal(selectedRuta)}
                            className="bg-verde text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-all duration-200 shadow-md"
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>

        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 max-w-xl max-h-5/6 overflow-y-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {mode === "create" ? "Añadir Ruta" : "Editar Ruta"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Nombre:</label>
                        <input
                            {...register("nombre", { required: true })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nombre de la Ruta"
                        />
                    </div>

                    {mode === "create" && (
                        <div>
                            <label className="block text-gray-700 font-medium">Hora de inicio:</label>
                            <input
                                type="datetime-local"
                                {...register("horaInicio", { required: true })}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 font-medium">Usuario asignado:</label>
                        <select
                            {...register("usuarioAsignadoId", { required: true })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione el usuario</option>
                            {usuarios.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.nombres}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Vehículo:</label>
                        <select
                            {...register("idVehiculo", { required: true })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione un vehículo</option>
                            {vehiculos.map((vehiculo) => (
                                <option key={vehiculo.id} value={vehiculo.id}>
                                    {vehiculo.marca} - {vehiculo.placa}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Tipo de Formulario:</label>
                        <select
                            {...register("formularioTipoId", { required: true })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione el tipo de formulario</option>
                            {formularioTipo.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Puntos de recolección:</label>
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex space-x-2 mb-2">
                                <select
                                    {...register(`puntos.${index}.idUbicacion`, { required: true })}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Seleccione la ubicación</option>
                                    {ubicaciones.map((ubicacion) => (
                                        <option key={ubicacion.id} value={ubicacion.id}>
                                            {ubicacion.nombre}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={index + 1}
                                    readOnly
                                    className="w-16 p-2 border rounded-md bg-gray-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ idUbicacion: "", orden: fields.length + 1 })}
                            className="bg-verde-dos text-white px-4 py-2 rounded-md hover:bg-zinc-900 w-full mt-2 duration-700"
                        >
                            Agregar Punto <i className="fa-solid fa-plus"></i>
                        </button>
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
                            disabled={isLoading}
                            className="bg-verde text-white px-4 py-2 rounded-md hover:bg-lime-700"
                        >
                            {isLoading ? "Procesando..." : mode === "create" ? "Guardar" : "Actualizar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RutaForm;