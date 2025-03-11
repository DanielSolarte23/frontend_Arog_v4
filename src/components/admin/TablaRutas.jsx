"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { useRutas } from '@/context/RutasContext';

function TablaRutas({ onUbicacionClick, onHorasClick }) {
    const { rutas, actualizarRuta } = useRutas();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(rutas.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRutas = rutas.slice(startIndex, startIndex + itemsPerPage);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRuta, setSelectedRuta] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        nombre: '',
        color: '',
        horaInicio: '',
        horaFin: '',
        usuarioAsignadoId: '',
        puntos: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);

    // Cargar usuarios y ubicaciones al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch usuarios
                const responseUsuarios = await fetch('/api/usuarios');
                const dataUsuarios = await responseUsuarios.json();
                setUsuarios(dataUsuarios);
                
                // Fetch ubicaciones
                const responseUbicaciones = await fetch('/api/ubicaciones');
                const dataUbicaciones = await responseUbicaciones.json();
                setUbicaciones(dataUbicaciones);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, []);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleRowClick = (ruta) => {
        const ubicaciones = ruta.puntosRuta.map(punto => punto.ubicacion);
        onUbicacionClick(ubicaciones);
        const horasData = {
            horaInicio: ruta.horaInicio,
            horaFin: ruta.horaFin,
            color: ruta.color,
            nombres: ruta.usuarioAsignado.nombres,
            nombre: ruta.nombre,
            placa: ruta.vehiculosAsignados.length > 0 ? ruta.vehiculosAsignados[0].vehiculo.placa : 'N/A'
        };
        onHorasClick([horasData]);
    };

    const handleEditClick = (ruta, e) => {
        e.stopPropagation();
        setSelectedRuta(ruta);

        // Convertir los puntosRuta al formato requerido para el formulario
        const puntos = ruta.puntosRuta.map(punto => ({
            idUbicacion: punto.idUbicacion,
            orden: punto.orden
        }));

        // Formatear fechas para input type="datetime-local"
        const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toISOString().slice(0, 16); // formato YYYY-MM-DDTHH:MM
        };

        // Llenar el formulario con los datos de la ruta
        setFormData({
            id: ruta.id,
            nombre: ruta.nombre,
            color: ruta.color,
            horaInicio: formatDate(ruta.horaInicio),
            horaFin: formatDate(ruta.horaFin),
            usuarioAsignadoId: ruta.usuarioAsignadoId,
            puntos: puntos
        });

        setModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePuntoChange = (index, field, value) => {
        const newPuntos = [...formData.puntos];
        newPuntos[index] = {
            ...newPuntos[index],
            [field]: field === 'idUbicacion' ? parseInt(value, 10) : value
        };
        setFormData({
            ...formData,
            puntos: newPuntos
        });
    };

    const addPunto = () => {
        setFormData({
            ...formData,
            puntos: [
                ...formData.puntos,
                { idUbicacion: ubicaciones.length > 0 ? ubicaciones[0].id : 0, orden: formData.puntos.length + 1 }
            ]
        });
    };

    const removePunto = (index) => {
        const newPuntos = formData.puntos.filter((_, i) => i !== index);
        // Reordenar los puntos restantes
        const puntosOrdenados = newPuntos.map((punto, i) => ({
            ...punto,
            orden: i + 1
        }));
        setFormData({
            ...formData,
            puntos: puntosOrdenados
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`/api/rutas/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    color: formData.color,
                    horaInicio: formData.horaInicio,
                    horaFin: formData.horaFin,
                    usuarioAsignadoId: parseInt(formData.usuarioAsignadoId, 10),
                    puntos: formData.puntos
                }),
            });

            if (response.ok) {
                const updatedRuta = await response.json();
                actualizarRuta(updatedRuta);
                setModalOpen(false);
                // Si necesitas mostrar un mensaje de éxito, puedes hacerlo aquí
            } else {
                console.error('Error al actualizar la ruta');
                // Si necesitas mostrar un mensaje de error, puedes hacerlo aquí
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative overflow-x-auto sm:rounded-lg flex flex-col justify-between h-full border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 w-12">
                            <input type="checkbox" className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm" />
                        </th>
                        <th className="px-4 py-3 w-1/4">Nombre de ruta</th>
                        <th className="px-4 py-3 w-1/4">Funcionario</th>
                        <th className="px-4 py-3 w-1/4">Vehículo</th>
                        <th className='px-4 py-3 w-20'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRutas.map((ruta) => (
                        <tr key={ruta.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleRowClick(ruta)}>
                            <td className="w-12 px-4 py-2">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm" />
                            </td>
                            <td className="px-6 py-2 font-medium text-gray-900">{ruta.nombre}</td>
                            <td className="px-6 py-2">{ruta.usuarioAsignado.nombres}</td>
                            <td className="px-6 py-2">{ruta.vehiculosAsignados.length > 0 ? ruta.vehiculosAsignados[0].vehiculo.placa : 'N/A'}</td>
                            <td className="px-6 py-2">
                                <FontAwesomeIcon icon={faPen} className='h-5 w-5 cursor-pointer' onClick={(e) => handleEditClick(ruta, e)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center justify-between p-2 border-t">
                <span className="text-sm font-normal text-gray-500">{rutas.length} RUTAS</span>
                <ul className="inline-flex text-sm h-8">
                    <li>
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 h-8 border border-gray-300 rounded-s-lg hover:bg-gray-100 disabled:opacity-50">
                            <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4' />
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                            <button onClick={() => setCurrentPage(index + 1)} className={`px-3 h-8 border ${currentPage === index + 1 ? 'bg-verde-dos text-white' : 'hover:bg-gray-100'}`}>{index + 1}</button>
                        </li>
                    ))}
                    <li>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 h-8 border border-gray-300 rounded-e-lg hover:bg-gray-100 disabled:opacity-50">
                            <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4' />
                        </button>
                    </li>
                </ul>
            </nav>
            
            {/* Modal Formulario de Edición */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 py-0">
                    <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-4xl max-h-[70vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Editar Ruta</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Información básica */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre de la ruta</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        value={formData.nombre} 
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        // required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Color</label>
                                    <input 
                                        type="color" 
                                        name="color" 
                                        value={formData.color} 
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm p-1"
                                        // required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hora de inicio</label>
                                    <input 
                                        type="datetime-local" 
                                        name="horaInicio" 
                                        value={formData.horaInicio} 
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        // required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hora de fin</label>
                                    <input 
                                        type="datetime-local" 
                                        name="horaFin" 
                                        value={formData.horaFin} 
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        // required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Funcionario asignado</label>
                                    <input type="text" value={formData.usuarioAsignadoId} onChange={handleInputChange} />
                                    
                                    {/* <select 
                                        name="usuarioAsignadoId" 
                                        value={formData.usuarioAsignadoId} 
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        // required
                                    >
                                        <option value="">Seleccionar funcionario</option>
                                        {usuarios.map(usuario => (
                                            <option key={usuario.id} value={usuario.id}>
                                                {usuario.nombres} {usuario.apellidos}
                                            </option>
                                        ))}
                                    </select> */}
                                </div>
                            </div>

                            {/* Puntos de la ruta */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-medium text-gray-700">Puntos de la ruta</h3>
                                    <button 
                                        type="button" 
                                        onClick={addPunto}
                                        className="px-3 py-1 bg-verde-dos text-white rounded-md hover:bg-green-600"
                                    >
                                        Agregar punto
                                    </button>
                                </div>
                                
                                {formData.puntos.map((punto, index) => (
                                    <div key={index} className="grid grid-cols-3 gap-4 mb-3 items-end border-b pb-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                                            {/* <select 
                                                value={punto.idUbicacion} 
                                                onChange={(e) => handlePuntoChange(index, 'idUbicacion', e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                // required
                                            >
                                                {ubicaciones.map(ubicacion => (
                                                    <option key={ubicacion.id} value={ubicacion.id}>
                                                        {ubicacion.nombre}
                                                    </option>
                                                ))}
                                            </select> */}
                                            <input type="text" value={punto.idUbicacion} 
                                                onChange={(e) => handlePuntoChange(index, 'idUbicacion', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Orden</label>
                                            <input 
                                                type="number" 
                                                value={punto.orden} 
                                                onChange={(e) => handlePuntoChange(index, 'orden', parseInt(e.target.value, 10))}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                min="1"
                                                // required
                                            />
                                        </div>
                                        <div>
                                            <button 
                                                type="button" 
                                                onClick={() => removePunto(index)}
                                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Detalles adicionales */}
                            {selectedRuta && (
                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Información adicional</h3>
                                    <p><strong>ID de la ruta:</strong> {selectedRuta.id}</p>
                                    {selectedRuta.vehiculosAsignados.length > 0 && (
                                        <p><strong>Vehículo asignado:</strong> {selectedRuta.vehiculosAsignados[0].vehiculo.placa}</p>
                                    )}
                                    {selectedRuta.tareas && selectedRuta.tareas.length > 0 && (
                                        <div>
                                            <p><strong>Tareas asociadas:</strong> {selectedRuta.tareas.length}</p>
                                            <ul className="list-disc pl-5 mt-1">
                                                {selectedRuta.tareas.slice(0, 3).map(tarea => (
                                                    <li key={tarea.id}>{tarea.titulo} - {tarea.estado}</li>
                                                ))}
                                                {selectedRuta.tareas.length > 3 && <li>... y {selectedRuta.tareas.length - 3} más</li>}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Botones de acción */}
                            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                                <button 
                                    type="button" 
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-verde-dos text-white rounded hover:bg-green-600 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TablaRutas;