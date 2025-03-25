import axios from "./axios";

export const getClientesRequest = () => axios.get("/cliente");
export const getClienteRequest = (id) => axios.get(`/cliente/${id}`);
export const createClienteRequest = (cliente) => axios.post("/cliente", cliente);
export const updateClienteRequest = (id, cliente) => axios.put(`/cliente/${id}`, cliente);
export const deleteClienteRequest = (id) => axios.delete(`/cliente/${id}`);
