import axios from "./axios";

export const getMultimediaRequest = () => axios.get("/multimedia");
export const getMultimediasRequest = (id) => axios.get(`/multimedia${id}`);
export const createMultimediaRequest = (multimedia) => axios.post("/multimedia", multimedia);
export const updateMultimediaRequest = (id, multimedia) => axios.put(`/multimedia${id}`, multimedia);
export const deleteMultimediaRequest = (id) => axios.delete(`/multimedia${id}`);
