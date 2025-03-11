import axios from "./axios";

export const getEncuestaRequest = () => axios.get("/encuestas");
export const getEncuestasRequest = (id) => axios.get(`/encuestas${id}`);
export const createEncuestasRequest = (encuestas) => axios.post("/encuestas", encuestas);
export const updateEncuestasRequest = (id, encuestas) => axios.put(`/encuestas${id}`, encuestas);
export const deleteEncuestasRequest = (id) => axios.delete(`/encuestas${id}`);
