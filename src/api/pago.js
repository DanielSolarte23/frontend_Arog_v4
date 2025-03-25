import axios from "./axios";

export const getPagosRequest = () => axios.get("/pagos");
export const getPagoRequest = (id) => axios.get(`/pagos/${id}`);
export const createPagoRequest = (ruta) => axios.post("/pagos", ruta);
export const updatePagoRequest = (id, ruta) =>
  axios.put(`/pagos/${id}`, ruta);
export const deletePagoRequest = (id) => axios.delete(`/pagos/${id}`);
