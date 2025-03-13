"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
  getFormulariosTipoRequest,
  getFormularioTipoRequest,
  updateFormularioTipoRequest,
  deleteFormularioTipoRequest,
  createFormularioTipoRequest,
} from "../api/formulariosTipo";

const FormularioTipoContext = createContext();

export const useFormularioTipo = () => {
  const context = useContext(FormularioTipoContext);

  if (!context) {
    throw new Error("El useFormularioTipo debe estar dentro de un FormularioTipoProvider");
  }

  return context;
};

export function FormularioTipoProvider({ children }) {
  const [formularioTipo, setFormularioTipo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getFormulariosTipo = async () => {
    setLoading(true);
    try {
      const res = await getFormulariosTipoRequest();
      setFormularioTipo(res.data); 
      console.log(res.data);
    } catch (error) {
      handleError(error, "Error al cargar formularioTipo");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const createFormularioTipo = async (ruta) => {
    try {
        const res = await createFormularioTipoRequest(ruta);
        setFormularioTipo((prev) => [...prev, res.data]);
        return res.data;
    } catch (error) {
        console.log(error);
        handleError(error, "Error al crear el formulario tipo");
        return null; // o lanza un error para manejarlo en el componente
    }
};

  const deleteFormularioTipo = async (id) => {
    try {
      const res = await deleteFormularioTipoRequest(id);
      if (res.status === 204) {
        setFormularioTipo((prev) => prev.filter((ruta) => ruta.id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar el formulario tipo");
      console.log(error);
    }
  };

  const getFormularioTipo = async (id) => {
    try {
      const res = await getFormularioTipoRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener el formulario Tipo");
    }
  };

  const updateFormularioTipo = async (id, ruta) => {
    try {
      await updateFormularioTipoRequest(id, ruta);
      setFormularioTipo((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...ruta } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar el formulario");
      console.log(error);
    }
  };

  useEffect(() => {
    getFormulariosTipo();
  }, [])
  
  // useEffect(() => {
  //   console.log("Rutas actualizadas:", formularioTipo);
  // }, [formularioTipo]); // Se ejecutará cada vez que `formularioTipo` cambie
  

  return (
    <FormularioTipoContext.Provider
      value={{
        formularioTipo,
        createFormularioTipo,
        getFormularioTipo,
        deleteFormularioTipo,
        getFormulariosTipo,
        updateFormularioTipo,
        deleteFormularioTipoRequest,
        errors,
      }}
    >
      {children}
    </FormularioTipoContext.Provider>
  );
}
