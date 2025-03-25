"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
    getPagosRequest,
    getPagoRequest,
    updatePagoRequest,
    deletePagoRequest,
    createPagoRequest,
} from "../api/pago";

const PagoContext = createContext();

export const usePago = () => {
    const context = useContext(PagoContext);

    if (!context) {
        throw new Error("El usePago debe estar dentro de un PagoProvider");
    }

    return context;
};

export function PagoProvider({ children }) {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleError = (error, defaultMessage) => {
        setErrors(error.response?.data?.message || defaultMessage);
        console.log(error);
    };

    const getPagos = async () => {
        setLoading(true);
        try {
            const res = await getPagosRequest();
            setPagos(res.data);
            console.log("Datos recibidos de pagos:", res.data);
        } catch (error) {
            handleError(error, "Error al cargar pagos");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const createPago = async (pago) => {
        try {
            const res = await createPagoRequest(pago);
            setPagos((prev) => [...prev, res.data]);
            return {
                success: true,
                data: res.data,
                status: res.status
            };
        } catch (error) {
            console.log(error);
            handleError(error, "Error al crear pago");
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            };
        }
    };

    const deletePago = async (id) => {
        try {
            const res = await deletePagoRequest(id);
            if (res.status === 204) {
                setPagos((prev) => prev.filter((pago) => pago.id !== id));
            }
        } catch (error) {
            handleError(error, "Error al eliminar pago");
            console.log(error);
        }
    };

    const getPago = async (id) => {
        try {
            const res = await getPagoRequest(id);
            return res.data;
        } catch (error) {
            handleError(error, "Error al obtener pago");
        }
    };

    const updatePago = async (id, pago) => {
        try {
            const res = await updatePagoRequest(id, pago);
            setPagos((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...pago } : item))
            );
            return {
                success: true,
                data: res.data,
                status: res.status
            };
        } catch (error) {
            handleError(error, "Error al actualizar el ususario");
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            };
            console.log(error);
        }
    };


    return (
        <PagoContext.Provider
            value={{
                pagos,
                createPago,
                getPago,
                deletePago,
                getPagos,
                updatePago,
                deletePagoRequest,
                loading,
                errors,
            }}
        >
            {children}
        </PagoContext.Provider>
    );
}
