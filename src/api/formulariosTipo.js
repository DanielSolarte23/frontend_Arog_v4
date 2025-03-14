import axios from "./axios";

export const getFormulariosTipoRequest = () => axios.get("/formulariosTipo");
export const getFormularioTipoRequest = (id) => axios.get(`/formulariosTipo/${id}`);
export const createFormularioTipoRequest = (ruta) => axios.post("/formulariosTipo", ruta);
export const updateFormularioTipoRequest = (id, ruta) => axios.put(`/formulariosTipo/${id}`, ruta);
export const deleteFormularioTipoRequest = (id) => axios.delete(`/formulariosTipo/${id}`);
