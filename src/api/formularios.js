import axios from "./axios";

export const getFormulariosRequest = () => axios.get("/rutas");
export const getFormularioRequest = (id) => axios.get(`/rutas${id}`);
export const createFormularioRequest = (ruta) => axios.post("/rutas", ruta);
export const updateFormularioRequest = (id, ruta) => axios.put(`/rutas${id}`, ruta);
export const deleteFormularioRequest = (id) => axios.delete(`/rutas${id}`);
