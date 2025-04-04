"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getReciduosRequest,
  getReciduosRequest,
  updateReciduosRequest,
  deleteReciduosRequest,
  createReciduosRequest,
} from "../api/reciduos";

const ReciduosContext = createContext();

export const useReciduos = () => {
  const context = useContext(ReciduosContext);

  if (!context) {
    throw new Error("El useRutas debe estar dentro de un RutasProvider");
  }

  return context;
};

export function ReciduosProvider({ children }) {
  const [reciduos, setReciduos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getReciduo = async () => {
    setLoading(true);
    try {
      const res = await getReciduosRequest();
      setReciduos(res.data); // En lugar de hacer res.json()
      console.log("Datos recibidos:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar reciduos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createReciduos = async (reciduos) => {
    try {
      const res = await createReciduosRequest(reciduos);
      setReciduos((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear reciduos");
    }
  };

  const deleteReciduos = async (id) => {
    try {
      const res = await deleteReciduosRequest(id);
      if (res.status === 204) {
        setReciduos((prev) => prev.filter((reciduos) => reciduos._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar reciduos");
      console.log(error);
    }
  };

  const getReciduos = async (id) => {
    try {
      const res = await getReciduosRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener reciduos");
    }
  };

  const updateRuta = async (id, reciduos) => {
    try {
      await updateReciduosRequest(id, reciduos);
      setReciduos((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...reciduos } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar reciduos");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getReciduos();
  // }, [])
  
  // useEffect(() => {
  //   console.log("Reciduos actualizadas:", reciduos);
  // }, [reciduos]); // Se ejecutará cada vez que `reciduos` cambie
  

  return (
    <ReciduosContext.Provider
      value={{
        reciduos,
        createReciduos,
        getReciduo,
        deleteReciduos,
        getReciduos,
        updateRuta,
        deleteReciduosRequest,
        errors,
      }}
    >
      {children}
    </ReciduosContext.Provider>
  );
}
