"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getUsuariosRequest,
  getUsuarioRequest,
  updateUsuarioRequest,
  deleteUsuarioRequest,
  createUsuarioRequest,
} from "../api/usuarios";

const UsuarioContext = createContext();

export const useUsuario = () => {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error("El useUsuario debe estar dentro de un UsuarioProvider");
  }

  return context;
};

export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getUsuarios = async () => {
    setLoading(true);
    try {
      const res = await getUsuariosRequest();
      setUsuarios(res.data);
      console.log("Datos recibidos:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar usuarios");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createUsuario = async (ruta) => {
    try {
      const res = await createUsuarioRequest(ruta);
      setUsuarios((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear usuario");
    }
  };

  const deleteUsuario = async (id) => {
    try {
      const res = await deleteUsuarioRequest(id);
      if (res.status === 204) {
        setUsuarios((prev) => prev.filter((ruta) => ruta._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar usuario");
      console.log(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener usuario");
    }
  };

  const updateUsuario = async (id, ruta) => {
    try {
      await updateUsuarioRequest(id, ruta);
      setUsuarios((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...ruta } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar el ususario");
      console.log(error);
    }
  };

//   useEffect(() => {
//     getUsuarios();
//   }, [])
  
//   useEffect(() => {
//     console.log("Usuarios:", usuarios);
//   }, [usuarios]);
  

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        createUsuario,
        getUsuario,
        deleteUsuario,
        getUsuarios,
        updateUsuario,
        deleteUsuarioRequest,
        errors,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
