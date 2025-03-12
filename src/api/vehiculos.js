import axios from "./axios";

export const getVehiculosRequest = () => axios.get("/autos");
export const getVehiculoRequest = (id) => axios.get(`/autos/${id}`);
export const createVehiculoRequest = (ruta) => axios.post("/autos", ruta);
export const updateVehiculoRequest = (id, ruta) =>
  axios.put(`/autos${id}`, ruta);
export const deleteVehiculoRequest = (id) => axios.delete(`/autos${id}`);
