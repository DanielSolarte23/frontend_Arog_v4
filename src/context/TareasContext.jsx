"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getTareasRequest,
  getTareaRequest,
  updateTareaRequest,
  deleteTareaRequest,
  createTareaRequest,
} from "../api/tareas";

const TareaContext = createContext();

export const useTarea = () => {
  const context = useContext(TareaContext);

  if (!context) {
    throw new Error("El useTarea debe estar dentro de un TareaProvider");
  }

  return context;
};

export function TareaProvider({ children }) {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getTareas = async () => {
    setLoading(true);
    try {
      const res = await getTareasRequest();
      setTareas(res.data);
      console.log("Datos recibidos de tareas:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar tareas");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createTarea = async (ruta) => {
    try {
      const res = await createTareaRequest(ruta);
      setTareas((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear la tarea");
    }
  };

  const deleteTarea = async (id) => {
    try {
      const res = await deleteTareaRequest(id);
      if (res.status === 204) {
        setTareas((prev) => prev.filter((ruta) => ruta._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar tarea");
      console.log(error);
    }
  };

  const getTarea = async (id) => {
    try {
      const res = await getTareaRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener Tarea");
    }
  };

  const updateTarea = async (id, ruta) => {
    try {
      await updateTareaRequest(id, ruta);
      setTareas((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...ruta } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar la tarea");
      console.log(error);
    }
  };

  useEffect(() => {
    getTareas();
  }, [])
  
  useEffect(() => {
    console.log("Ubications:", tareas);
  }, [tareas]);
  

  return (
    <TareaContext.Provider
      value={{
        tareas,
        createTarea,
        getTarea,
        deleteTarea,
        getTareas,
        updateTarea,
        deleteTareaRequest,
        errors,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
}
