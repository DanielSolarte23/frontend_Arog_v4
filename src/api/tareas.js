import axios from "./axios";

export const createTareaRequest = (tarea) => axios.post("/tareas", tarea);
export const createTareaFormularioRequest = (tarea) => axios.post("/tareas-con-formulario", tarea);
export const getTareasRequest = () => axios.get("/tareas");
export const getTareaArchivoRequest = () => axios.get('/tareas/archivada/archivadas');
export const getTareaRequest = (id) => axios.get(`/tareas/${id}`);
export const getTareaUsuarioRequest = (id) => axios.get(`/tareas/tarea/${id}`);
export const updateTareaRequest = (id, tarea) => axios.put(`/tareas/${id}`, tarea);
export const updateEstadoRequest = async (id, estado) => {
    return axios.patch(`/tareas/${id}/estado`, { estado });
  };

export const deleteTareaRequest = (id) => axios.delete(`/tareas/${id}`);
