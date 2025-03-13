"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { useRutas } from '@/context/RutasContext';


function TablaRutas({ onUbicacionClick, onHorasClick, openModal }) {
    const { rutas, actualizarRuta } = useRutas();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(rutas.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRutas = rutas.slice(startIndex, startIndex + itemsPerPage);
    const [selectedRuta, setSelectedRuta] = useState(null);

    const handleDetails = (ruta) => {
        setSelectedRuta(ruta);
        openModal('details', ruta);
        console.log("Esta es la ruta:", ruta);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleRowClick = (ruta) => {
        if (ruta.puntosRuta) {
            const ubicaciones = ruta.puntosRuta.map(punto => punto.ubicacion);
            onUbicacionClick(ubicaciones);
        }

        const horasData = {
            horaInicio: ruta.horaInicio,
            horaFin: ruta.horaFin,
            color: ruta.color,
            nombres: ruta.usuarioAsignado ? ruta.usuarioAsignado.nombres : 'N/A',
            nombre: ruta.nombre,
            placa: (ruta.vehiculosAsignados && ruta.vehiculosAsignados.length > 0 && ruta.vehiculosAsignados[0].vehiculo)
                ? ruta.vehiculosAsignados[0].vehiculo.placa
                : 'N/A'
        };

        onHorasClick([horasData]);
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
                        <th className='px-4 py-3 w-20 '>Detalles</th>
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
                            <td className="px-6 py-2">
                                {ruta.vehiculosAsignados && ruta.vehiculosAsignados.length > 0 && ruta.vehiculosAsignados[0].vehiculo
                                    ? ruta.vehiculosAsignados[0].vehiculo.placa
                                    : 'N/A'}
                            </td>
                            <td className="px-6 py-2 text-center">
                                <i className='fa-solid fa-eye h-5 w-5 cursor-pointer'
                                    onClick={() => handleDetails(ruta)}
                                ></i>
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
        </div>
    );
}

export default TablaRutas;