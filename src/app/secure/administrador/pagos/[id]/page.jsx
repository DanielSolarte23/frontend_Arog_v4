"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import NotificationModal from "@/components/pruebas/NotificationModal";
import RegistroTransaccionModal from "@/components/admin/RegistroTransaccionModal";
import Paginacion from "@/components/admin/Paginacion";
import LoadingScreen from "@/components/LoadingScreen";

export default function TransaccionDetalle() {
    const params = useParams();
    const idPago = params.id;
    const router = useRouter();

    // Estados
    const [transacciones, setTransacciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [transaccionSeleccionada, setTransaccionSeleccionada] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    const [nuevaTransaccion, setNuevaTransaccion] = useState({
        idPago: params.id,
        monto: "",
        metodoPago: "",
        referencia: "",
    });

    const [notification, setNotification] = useState({
        message: "",
        isVisible: false,
        type: "success"
    });

    // Funciones de utilidad
    const showNotification = (message, type = "success") => {
        setNotification({ message, isVisible: true, type });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }, 5000);
    };

    const closeNotification = () => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    };

    const fetchTransacciones = async () => {
        if (!idPago) return;
        try {
            const response = await axios.get(
                `http://localhost:3002/api/pagos/${idPago}/transacciones`
            );
            setTransacciones(response.data);
            setLoading(false);
        } catch (err) {
            // Manejo específico de error 404
            if (err.response && err.response.status === 404) {
                // No hay transacciones, pero no es un error crítico
                setTransacciones([]);
            } else {
                // Otros tipos de errores
                console.error(err);
                showNotification("Error al cargar transacciones", "error");
            }
            setLoading(false);
        }
    };

    // Efectos
    useEffect(() => {
        if (idPago) {
            fetchTransacciones();
        }
    }, [idPago]);

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1536) {
                setItemsPerPage(10);
            } else if (window.innerWidth >= 640) {
                setItemsPerPage(5);
            } else {
                setItemsPerPage(3);
            }
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    // Filtrado y paginación
    const filteredTransacciones = useMemo(() => {
        if (!searchQuery) return transacciones;

        const lowercaseQuery = searchQuery.toLowerCase();
        return transacciones.filter(transaccion =>
            Object.values(transaccion).some(
                value => value && value.toString().toLowerCase().includes(lowercaseQuery)
            )
        );
    }, [searchQuery, transacciones]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTransacciones.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredTransacciones.length / itemsPerPage);

    // Métodos de manejo
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaTransaccion(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const abrirModal = (transaccion) => {
        if (transaccion) {
            setTransaccionSeleccionada(transaccion);
            setNuevaTransaccion({
                idPago: transaccion.idPago || "",
                monto: transaccion.monto || "",
                metodoPago: transaccion.metodoPago || "",
                referencia: transaccion.referencia || "",
            });
        } else {
            setTransaccionSeleccionada(null);
            setNuevaTransaccion({
                idPago: "",
                monto: "",
                metodoPago: "",
                referencia: "",
            });
        }
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones antes de enviar
        if (!nuevaTransaccion.monto || !nuevaTransaccion.metodoPago) {
            showNotification("Por favor complete todos los campos requeridos", "error");
            return;
        }
    
        try {
            const datosParaEnviar = { 
                ...nuevaTransaccion,
                monto: parseFloat(nuevaTransaccion.monto),
                idPago: parseInt(nuevaTransaccion.idPago)
            };
    
            const resultado = transaccionSeleccionada
                ? await updateTransaccion(transaccionSeleccionada.id, datosParaEnviar)
                : await createTransaccion(datosParaEnviar);
    
            // Resto del código igual...
        } catch (error) {
            console.error(error);
            showNotification(
                error.response?.data?.message || "Error al guardar transacción", 
                "error"
            );
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setTransaccionSeleccionada(null);
        setNuevaTransaccion({
            idPago: "",
            monto: "",
            metodoPago: "",
            referencia: "",
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const createTransaccion = async (datos) => {
        try {
            const response = await axios.post('http://localhost:3002/api/pagos/transacciones', datos);
            return response.data;
        } catch (error) {
            console.error('Error al crear transacción:', error.response?.data);
            showNotification(
                error.response?.data?.message || "Error al crear transacción", 
                "error"
            );
            throw error;
        }
    };

    const updateTransaccion = async (id, datos) => {
        try {
            const response = await axios.put(`http://localhost:3002/api/transacciones/${id}`, {
                ...datos,
                monto: parseFloat(datos.monto),
                idPago: parseInt(datos.idPago)
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar transacción:', error.response?.data);
            showNotification(
                error.response?.data?.message || "Error al actualizar transacción", 
                "error"
            );
            throw error;
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="relative overflow-x-auto bg-white h-full border-gray-200 rounded-lg">
            {notification.isVisible && (
                <NotificationModal
                    message={notification.message}
                    isVisible={notification.isVisible}
                    type={notification.type}
                    onClose={closeNotification}
                />
            )}

            <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-2 px-4 gap-4">
                <div className="relative w-full md:w-1/3 flex items-center">
                    <input
                        type="text"
                        placeholder="Buscar transacciones..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-3 pl-10 py-2 border border-zinc-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-rojo"
                    />
                </div>
                <button
                    className="bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition"
                    onClick={() => abrirModal()}
                >
                    Registrar Transacción
                </button>
            </nav>

            <div className="overflow-x-auto w-full p-6">
                {transacciones.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-500">No existen transacciones relacionadas a este pago.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-white border-b">
                            <tr>
                                <th className="px-4 py-3">ID Pago</th>
                                <th className="px-4 py-3">Monto</th>
                                <th className="px-4 py-3">Método Pago</th>
                                <th className="px-4 py-3">Referencia</th>
                                <th className="px-4 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((transaccion) => (
                                <tr key={transaccion.id} className="border-b">
                                    <td className="px-4 py-3">{transaccion.idPago}</td>
                                    <td className="px-4 py-3">{transaccion.monto}</td>
                                    <td className="px-4 py-3">{transaccion.metodoPago}</td>
                                    <td className="px-4 py-3">{transaccion.referencia}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => abrirModal(transaccion)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="bg-white border-t rounded-b-md flex justify-center p-4">
                {/* <Paginacion 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    paginate={setCurrentPage}
                /> */}
            </div>

            {modalOpen && (
                <RegistroTransaccionModal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    transaccion={nuevaTransaccion}
                    onChange={handleInputChange}
                />
            )}
        </div>
    );
}