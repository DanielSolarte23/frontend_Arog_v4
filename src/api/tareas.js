import axios from "./axios";

export const getTareasRequest = () => axios.get("/tareas");
export const getTareaRequest = (id) => axios.get(`/rutas${id}`);
export const createTareaRequest = (ruta) => axios.post("/rutas", ruta);
export const updateTareaRequest = (id, ruta) => axios.put(`/rutas${id}`, ruta);
export const deleteTareaRequest = (id) => axios.delete(`/rutas${id}`);
