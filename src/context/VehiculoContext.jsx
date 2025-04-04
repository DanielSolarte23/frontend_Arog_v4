"use client";

import { useState, useContext, createContext, useEffect } from "react";
import {
    getVehiculosRequest,
    getVehiculoRequest,
    updateVehiculoRequest,
    deleteVehiculoRequest,
    createVehiculoRequest,
} from "../api/vehiculos";

const vehiculoContext = createContext();

export const useVehiculo = () => {
    const context = useContext(vehiculoContext);
    if (!context) {
        throw new Error("El useVehiculo debe estar dentro de un VehiculoProvider");
    }
    return context;
};

export function VehiculoProvider({ children }) {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleError = (error, defaultMessage) => {
        setErrors(error.response?.data?.message || defaultMessage);
        console.error(error); // Usar console.error para errores
    };

    const getVehiculos = async () => {
        setLoading(true);
        try {
            const res = await getVehiculosRequest();
            setVehiculos(res.data);
        } catch (error) {
            handleError(error, "Error al cargar vehículos");
        } finally {
            setLoading(false);
        }
    };

    const createVehiculo = async (vehiculo) => { // Cambio de nombre
        try {
            const res = await createVehiculoRequest(vehiculo); // Cambio de nombre
            setVehiculos((prev) => [...prev, res.data]);
        } catch (error) {
            handleError(error, "Error al crear vehículo");
        }
    };

    const deleteVehiculo = async (id) => {
        try {
            const res = await deleteVehiculoRequest(id);
            if (res.status === 204) {
                setVehiculos((prev) => prev.filter((vehiculo) => vehiculo._id !== id));
            }
        } catch (error) {
            handleError(error, "Error al eliminar el vehículo");
        }
    };

    const getVehiculo = async (id) => {
        try {
            const res = await getVehiculoRequest(id);
            return res.data;
        } catch (error) {
            handleError(error, "Error al obtener vehículo");
        }
    };

    const updateVehiculo = async (id, vehiculo) => {
      try {
          console.log("ID del vehículo a actualizar:", id);
          console.log("Datos del vehículo a actualizar:", vehiculo);
          if (typeof id !== 'number') {
              console.error("Error: ID del vehículo no es un número válido.");
              return;
          }
          await updateVehiculoRequest(id, vehiculo);
          setVehiculos((prev) =>
              prev.map((item) => (item.id === id ? { ...item, ...vehiculo } : item))
          );
      } catch (error) {
          console.error("Error al actualizar vehículo:", error);
          handleError(error, "Error al actualizar vehículo");
      }
  };

    // useEffect(() => {
    //     getVehiculos();
    // }, []);

    return (
        <vehiculoContext.Provider
            value={{
                vehiculos,
                createVehiculo,
                getVehiculo,
                deleteVehiculo,
                getVehiculos,
                updateVehiculo, // Cambio de nombre
                errors,
            }}
        >
            {children}
        </vehiculoContext.Provider>
    );
}