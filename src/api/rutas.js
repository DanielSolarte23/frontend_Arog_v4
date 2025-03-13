import axios from "./axios";

export const getRutasRequest = () => axios.get("/rutas");
export const getRutaRequest = (id) => axios.get(`/rutas${id}`);
export const createRutaRequest = (ruta) => axios.post("/rutas", ruta);
export const updateRutaRequest = (id, ruta) => axios.put(`/rutas/${id}`, ruta);
export const deleteRutaRequest = (id) => axios.delete(`/rutas${id}`);
