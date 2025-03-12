"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getVehiculosRequest,
  getVehiculoRequest,
  updateVehiculoRequest,
  deleteVehiculoRequest,
  createRutaRequest,
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
    console.log(error);
  };

  const getVehiculos = async () => {
    setLoading(true);
    try {
      const res = await getVehiculosRequest();
      setVehiculos(res.data);
      // console.log("Datos recibidos:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar vehiculos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createVehiculo = async (ruta) => {
    try {
      const res = await createRutaRequest(ruta);
      setVehiculos((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear ruta");
    }
  };

  const deleteVehiculo = async (id) => {
    try {
      const res = await deleteVehiculoRequest(id);
      if (res.status === 204) {
        setVehiculos((prev) => prev.filter((ruta) => ruta._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar el vehiculo");
      console.log(error);
    }
  };

  const getVehiculo = async (id) => {
    try {
      const res = await getVehiculoRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener vehiulo");
    }
  };

  const updateVehiulo = async (id, ruta) => {
    try {
      await updateVehiculoRequest(id, ruta);
      setVehiculos((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...ruta } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar ruta");
      console.log(error);
    }
  };

  useEffect(() => {
    getVehiculos();
  }, [])
  
  useEffect(() => {
    console.log("Autos actualizados:", vehiculos);
  }, [vehiculos]); 
  

  return (
    <vehiculoContext.Provider
      value={{
        vehiculos,
        createVehiculo,
        getVehiculo,
        deleteVehiculo,
        getVehiculos,
        updateVehiulo,
        deleteVehiculoRequest,
        errors,
      }}
    >
      {children}
    </vehiculoContext.Provider>
  );
}
