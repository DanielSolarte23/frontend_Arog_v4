"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getEncuestasRequest,
  getEncuestasRequest,
  updateEncuestasRequest,
  deleteEncuestasRequest,
  createEncuestasRequest,
} from "../api/encuestas";

const EncuestasContext = createContext();

export const useEncuestas = () => {
  const context = useContext(EncuestasContext);

  if (!context) {
    throw new Error("El useEncuestas debe estar dentro de un EncuestasProvider");
  }

  return context;
};

export function EncuestasProvider({ children }) {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getEncuestas = async () => {
    setLoading(true);
    try {
      const res = await getEncuestasRequest();
      setEncuestas(res.data); // En lugar de hacer res.json()
      console.log("Datos recibidos:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar encuestas");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createEncuestas = async (encuestas) => {
    try {
      const res = await createEncuestasRequest(encuestas);
      setRutas((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear encuestas");
    }
  };

  const deleteEncuestas = async (id) => {
    try {
      const res = await deleteEncuestasRequest(id);
      if (res.status === 204) {
        setRutas((prev) => prev.filter((encuestas) => encuestas._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar encuestas");
      console.log(error);
    }
  };

  const getEncuesta = async (id) => {
    try {
      const res = await getEncuestasRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener encuestas");
    }
  };

  const updateEncuestas = async (id, encuestas) => {
    try {
      await updateEncuestasRequest(id, encuestas);
      setEncuestas((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...ruta } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar encuestas");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getEncuestas();
  // }, [])
  
  // useEffect(() => {
  //   console.log("Encuestas actualizadas:", encuestas);
  // }, [encuestas]); // Se ejecutará cada vez que `Encuestas` cambie
  

  return (
    <EncuestasContext.Provider
      value={{
        encuestas,
        createEncuestas,
        getEncuestas,
        deleteEncuestas,
        getEncuestas,
        updateEncuestas,
        deleteEncuestasRequest,
        errors,
      }}
    >
      {children}
    </EncuestasContext.Provider>
  );
}
