"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getUbicacionesRequest,
  getUbicacionRequest,
  updateUbicacionRequest,
  deleteUbicacionRequest,
  createUbicacionRequest,
} from "../api/ubicaciones";

const UbicacionContext = createContext();

export const useUbicacion = () => {
  const context = useContext(UbicacionContext);

  if (!context) {
    throw new Error("El useUbicacion debe estar dentro de un UbicacionProvider");
  }

  return context;
};

export function UbicacionProvider({ children }) {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getUbicaciones = async () => {
    setLoading(true);
    try {
      const res = await getUbicacionesRequest();
      setUbicaciones(res.data);
      console.log("Datos recibidos:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar ubicaciones");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createUbicacion = async (ruta) => {
    try {
      const res = await createUbicacionRequest(ruta);
      setUbicaciones((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear ubicacion");
    }
  };

  const deleteUbicacion = async (id) => {
    try {
      const res = await deleteUbicacionRequest(id);
      if (res.status === 204) {
        setUbicaciones((prev) => prev.filter((ruta) => ruta._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar ubicacion");
      console.log(error);
    }
  };

  const getUbicacion = async (id) => {
    try {
      const res = await getUbicacionRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener ubicacion");
    }
  };

  const updateUbicacion = async (id, ruta) => {
    try {
      await updateUbicacionRequest(id, ruta);
      setUbicaciones((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...ruta } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar la ubicacion");
      console.log(error);
    }
  };

  useEffect(() => {
    getUbicaciones();
  }, [])
  
  useEffect(() => {
    console.log("Ubications:", ubicaciones);
  }, [ubicaciones]);
  

  return (
    <UbicacionContext.Provider
      value={{
        ubicaciones,
        createUbicacion,
        getUbicacion,
        deleteUbicacion,
        getUbicaciones,
        updateUbicacion,
        deleteUbicacionRequest,
        errors,
      }}
    >
      {children}
    </UbicacionContext.Provider>
  );
}
