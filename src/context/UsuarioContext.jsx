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
      // console.log("Datos recibidos de usuario:", res.data);
    } catch (error) {
      handleError(error, "Error al cargar usuarios");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const createUsuario = async (usuario) => {
    try {
      const res = await createUsuarioRequest(usuario);
      setUsuarios((prev) => [...prev, res.data]);
      return {
        success: true,
        data: res.data,
        status: res.status
      };
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear usuario");
      return {
        success: false,
        error: error.message,
        status: error.response?.status
      };
    }
  };

  const deleteUsuario = async (id) => {
    try {
      const res = await deleteUsuarioRequest(id);
      if (res.status === 204) {
        setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar usuario");
      console.log(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      if (res.status === 404) {
        setErrors("Usuario no encontrado");
        return;
      }
      if (res.status === 500) {
        setErrors("Error interno del servidor");
        return;
      }
      setUsuarios(res.data);
      return {
        success: true,
        data: res.data,
        status: res.status
      };
    } catch (error) {
      handleError(error, "Error al obtener usuario");
    }
  }; 

  const updateUsuario = async (id, usuario) => {
    try {
      const res = await updateUsuarioRequest(id, usuario);
      setUsuarios((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...usuario } : item))
      );
      return {
        success: true,
        data: res.data,
        status: res.status
      };
    } catch (error) {
      handleError(error, "Error al actualizar el ususario");
      return {
        success: false,
        error: error.message,
        status: error.response?.status
      };
      console.log(error);
    }
  };


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
        loading,
        errors,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
