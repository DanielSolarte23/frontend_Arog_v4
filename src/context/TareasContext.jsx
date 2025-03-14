"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  createTareaRequest,
  createTareaFormularioRequest,
  getTareasRequest,
  getTareaRequest,
  getTareaUsuarioRequest,
  updateTareaRequest,
  updateEstadoRequest,
  deleteTareaRequest
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


  

  const createTarea = async (tarea) => {
    try {
      const res = await createTareaRequest(tarea);
      setTareas((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear la tarea");
    }
  };

  const createTareaForm = async (tarea) {
    try {
      const res = await createTareaFormularioRequest(tarea);
      setTareas(() => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear la tarea");
    } 
  }

  const deleteTarea = async (id) => {
    try {
      const res = await deleteTareaRequest(id);
      if (res.status === 204) {
        setTareas((prev) => prev.filter((tarea) => tarea._id !== id));
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

  const updateTarea = async (id, tarea) => {
    try {
      await updateTareaRequest(id, tarea);
      setTareas((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...tarea } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar la tarea");
      console.log(error);
    }
  };

  const updateEstado = async(id, estado) => {
    try {
      await updateEstadoRequest(id, estado);
      setTareas((prev) => 
      prev.map((item) => (item.id === id ? {...item, ...estado} : item)));
    } catch (error) {
      handleError(error, "Error al actualizar estado");
      console.log(error);
      
    }
  }

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
