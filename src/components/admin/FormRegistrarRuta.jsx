"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useVehiculo } from "@/context/VehiculoContext";
import { useUbicacion } from "@/context/UbicacionContext";
import { useUsuario } from "@/context/UsuarioContext";
import { useRutas } from "@/context/RutasContext";

const RutaForm = ({ modalRutas, setModalRutas }) => {
  const { vehiculos, getVehiculos } = useVehiculo();
  const { ubicaciones, getUbicaciones } = useUbicacion();
  const { usuarios, getUsuarios } = useUsuario();
  const { getRutas } = useRutas();

  useEffect(() => {
    getVehiculos();
    getUbicaciones();
    getUsuarios();
  }, []);

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      nombre: "",
      color: "#FF5733",
      horaInicio: "",
      horaFin: null,
      usuarioAsignadoId: "null",
      puntos: [{ idUbicacion: "", orden: "" }],
      idVehiculo: "",
      formularios: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "puntos",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Primera petición: Guardar la ruta
      const rutaResponse = await fetch("http://localhost:3002/api/rutas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          color: data.color,
          horaInicio: data.horaInicio,
          horaFin: data.horaFin,
          usuarioAsignadoId: parseInt(data.usuarioAsignadoId),
          puntos: data.puntos.map((punto, index) => ({
            idUbicacion: parseInt(punto.idUbicacion),
            orden: index + 1,
          })),
        }),
      });

      const rutaData = await rutaResponse.json();

      if (!rutaResponse.ok) {
        throw new Error(rutaData.message || "Error al crear la ruta");
      }

      setTimeout(async () => {
        const vehiculoResponse = await fetch(
          "http://localhost:3002/api/rutas/asignar-vehiculo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idRuta: rutaData.id, // Se obtiene el ID de la ruta creada
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

        alert("Ruta y vehículo asignados correctamente");
        reset();
        setIsLoading(false);
        getVehiculos();
      }, 500);

      setModalRutas(false);
      getRutas();
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black z-50 flex justify-center items-center overflow-y-auto py-5">
      <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white h-5/6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Crear Nueva Ruta
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 flex flex-col gap-2"
        >
          <input
            className="w-full p-2 border rounded"
            type="text"
            {...register("nombre")}
            placeholder="Nombre de la Ruta"
            required
          />

          <input
            className="w-full p-2 border rounded"
            type="color"
            {...register("color")}
          />

          <input
            className="w-full p-2 border rounded"
            type="datetime-local"
            {...register("horaInicio")}
            required
          />
          <select
            className="w-full p-2 border rounded"
            {...register("usuarioAsignadoId")}
            required
          >
            <option value="">Seleccione el usuario</option>
            {usuarios.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nombres}
              </option>
            ))}
          </select>

          <h3 className="text-lg font-semibold">Puntos de recoleccion:</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="flex space-x-2">
              <select
                className="w-full border rounded"
                {...register(`puntos.${index}.idUbicacion`)}
                required
              >
                <option value="">Seleccione la ubicación</option>
                {ubicaciones.map((ubicacion) => (
                  <option key={ubicacion.id} value={ubicacion.id}>
                    {ubicacion.nombre}
                  </option>
                ))}
              </select>

              <input
                className="w-1/2 p-2 border rounded"
                type="number"
                {...register(`puntos.${index}.orden`)}
                placeholder="Orden"
                value={index + 1}
                readOnly
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                ✖
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ idUbicacion: "", orden: fields.length + 1 })
            }
            className="w-full p-2 bg-verde-dos text-white rounded"
          >
            Agregar Punto ➕
          </button>

          <h3 className="text-lg font-semibold">Asignar Vehículo:</h3>
          <select
            className="w-full p-2 border rounded"
            {...register("idVehiculo")}
            required
          >
            <option value="">Seleccione un vehículo</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.id} value={vehiculo.id}>
                {vehiculo.marca} - {vehiculo.placa}
              </option>
            ))}
          </select>

          <h3 className="text-lg font-semibold">Formularios:</h3>
          <input
            className="w-full p-2 border rounded"
            type="text"
            {...register("formularios")}
            placeholder="IDs de formularios (separados por comas)"
          />

          <button
            type="submit"
            className="w-full p-3 bg-gray-300 text-verde-dos font-bold rounded "
            onClick={() => setModalRutas(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-verde text-white font-bold rounded "
          >
            {isLoading ? "Enviando..." : "Guardar Ruta"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RutaForm;
