import axios from "./axios";

export const getReciduoRequest = () => axios.get("/reciduos");
export const getReciduosRequest = (id) => axios.get(`/reciduos${id}`);
export const createReciduosRequest = (ruta) => axios.post("/reciduos", ruta);
export const updateReciduosRequest = (id, ruta) => axios.put(`/reciduos${id}`, ruta);
export const deleteReciduosRequest = (id) => axios.delete(`/reciduos${id}`);
