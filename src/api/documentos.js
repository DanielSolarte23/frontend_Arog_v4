import axios from "./axios";

export const getDocumentosRequest = async () => axios.get(`/documentos`);
export const getDocumentosByIdRequest = async (id) => axios.get(`/documentos/${id}`);
export const postDocumentosRequest = async (data) => axios.post(`/documentos`, data);
export const putDocumentosRequest = async (id, data) => axios.put(`/documentos/${id}`, data);
export const deleteDocumentosRequest = async (id) => axios.delete(`/documentos/${id}`);
export const getDocumentoInformeRequest = async () => axios.get(`/documentos/informes`);
export const getDocumentosCertificadoRequest = async () => axios.get(`/documentos/certificados`);