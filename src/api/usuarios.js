import axios from "./axios";

export const getUsuariosRequest = () => axios.get("/usuarios");
export const getUsuarioRequest = (id) => axios.get(`/usuarios/${id}`);
export const createUsuarioRequest = (ruta) => axios.post("/usuarios", ruta);
export const updateUsuarioRequest = (id, ruta) =>
  axios.put(`/usuarios${id}`, ruta);
export const deleteUsuarioRequest = (id) => axios.delete(`/usuarios${id}`);
