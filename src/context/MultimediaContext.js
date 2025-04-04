"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getMultimediaRequest,
  getMultimediaRequest,
  updateMultimediaRequest,
  deleteMultimediaRequest,
  createMultimediaRequest,
} from "../api/multimedia";

const MultimediaContext = createContext();

export const useMultimedia = () => {
  const context = useContext(MultimediaContext);

  if (!context) {
    throw new Error("El useMultimedia debe estar dentro de un MultimediaProvider");
  }

  return context;
};

export function MultimediaProvider({ children }) {
  const [multimedia, setMultimedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getMultimedia = async () => {
    setLoading(true);
    try {
      const res = await getMultimediaRequest();
      setMultimedia(res.data); // En lugar de hacer res.json()
      console.log("Datos recibidos:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar multimedia");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createMultimedia = async (multimedia) => {
    try {
      const res = await createMultimediaRequest(ruta);
      setMultimedia((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear multimedia");
    }
  };

  const deleteMultimedia = async (id) => {
    try {
      const res = await deleteMultimediaRequest(id);
      if (res.status === 204) {
        setMultimedia((prev) => prev.filter((multimedia) => multimedia._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar multimedia");
      console.log(error);
    }
  };

  const getMultimedias = async (id) => {
    try {
      const res = await getMultimediaRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener Multimedia");
    }
  };

  const updateMultimedia = async (id, multimedia) => {
    try {
      await updateMultimediaRequest(id, multimedia);
      setMultimedia((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...multimedia } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar multimedia");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getMultimedia();
  // }, [])
  
  // useEffect(() => {
  //   console.log("Multimedia actualizadas:", multimedia);
  // }, [multimedia]); // Se ejecutará cada vez que `rutas` cambie
  

  return (
    <MultimediaContext.Provider
      value={{
        multimedia,
        createMultimedia,
        getMultimedia,
        deleteMultimedia,
        getMultimedias,
        updateMultimedia,
        deleteMultimediaRequest,
        errors,
      }}
    >
      {children}
    </MultimediaContext.Provider>
  );
}
