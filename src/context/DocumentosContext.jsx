"use client"

import {useState, useContext, createContext, useEffect } from "react"

import {
    getDocumentosRequest,
    getDocumentosByIdRequest,
    postDocumentosRequest,
    putDocumentosRequest,
    deleteDocumentosRequest,
    getDocumentoInformeRequest,
    getDocumentosCertificadoRequest,
} from "../api/documentos";

const DocumentosContext = createContext()
export const useDocumentos = () => {
    const context = useContext(DocumentosContext)
    if (!context) throw new Error("useDocumentos must be used within a DocumentosProvider")
    return context
}

export function DocumentosProvider({ children }) {
    const [documentos, setDocumentos] = useState([])
    const [documentosInforme, setDocumentosInforme] = useState([])
    const [documentosCertificado, setDocumentosCertificado] = useState([])
    const [documento, setDocumento] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getDocumentos = async () => {
        try {
            setLoading(true)
            const res = await getDocumentosRequest()
            setDocumentos(res.data)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    const getDocumentosById = async (id) => {
        try {
            setLoading(true)
            const res = await getDocumentosByIdRequest(id)
            setDocumento(res.data)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    const postDocumentos = async (data) => {
        try {
            setLoading(true)
            const res = await postDocumentosRequest(data)
            setDocumentos([...documentos, res.data])
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    const putDocumentos = async (id, data) => {
        try {
            setLoading(true)
            const res = await putDocumentosRequest(id, data)
            setDocumentos(documentos.map((doc) => (doc.id === id ? res.data : doc)))
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    const deleteDocumentos = async (id) => {
        try {
            setLoading(true)
            await deleteDocumentosRequest(id)
            setDocumentos(documentos.filter((doc) => doc.id !== id))
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const getDocumentoInforme = async () => {
        try {
            setLoading(true)
            const res = await getDocumentoInformeRequest()
            setDocumentosInforme(res.data)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    
    const getDocumentosCertificado = async () => {
        try {
            setLoading(true)
            const res = await getDocumentosCertificadoRequest()
            setDocumentosCertificado(res.data)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    
    // useEffect(() => {
    //     getDocumentos()
    // }, [])
    return (
        <DocumentosContext.Provider
            value={{
                documentos,
                documentosInforme,
                documentosCertificado,
                documento,
                loading,
                error,
                getDocumentos,
                getDocumentosById,
                postDocumentos,
                putDocumentos,
                deleteDocumentos,
                getDocumentoInforme,
                getDocumentosCertificado,
            }}
        >
            {children}
        </DocumentosContext.Provider>
    )
};

