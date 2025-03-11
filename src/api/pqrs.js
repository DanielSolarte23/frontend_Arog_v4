import axios from "./axios";

export const getPqrsRequest = () => axios.get("/pqrs");
export const getPqrssRequest = (id) => axios.get(`/pqrs${id}`);
export const createPqrsRequest = (pqrs) => axios.post("/pqrs", pqrs);
export const updatePqrsRequest = (id, pqrs) => axios.put(`/pqrs${id}`, pqrs);
export const deletePqrsRequest = (id) => axios.delete(`/pqrs${id}`);
 