"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { useRutas } from '@/context/RutasContext';

function TablaRutas({ onUbicacionClick }) {
    const { rutas } = useRutas();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(rutas.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRutas = rutas.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="relative overflow-x-auto sm:rounded-lg flex flex-col justify-between h-full border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th scope="col" className="p-4 w-12">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-4 py-3 w-1/4">Nombre de ruta</th>
                        <th scope="col" className="px-4 py-3 w-1/4">Funcionario</th>
                        <th scope="col" className="px-4 py-3 w-1/4">Vehículo</th>
                        <th scope='col' className='px-4 py-3 w-20'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRutas.map((ruta) => (
                        <tr key={ruta.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                            onClick={() => onUbicacionClick(ruta.puntosRuta.map(punto => punto.ubicacion))}>
                            <td className="w-12 px-4 py-2">
                                <div className="flex items-center">
                                    <input id={`checkbox-${ruta.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
                                    <label htmlFor={`checkbox-${ruta.id}`} className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">{ruta.nombre}</th>
                            <td className="px-6 py-2">{ruta.usuarioAsignado.nombres}</td>
                            <td className="px-6 py-2">
                                {ruta.vehiculosAsignados.length > 0 ? ruta.vehiculosAsignados[0].vehiculo.placa : 'N/A'}
                            </td>
                            <td className="px-6 py-2">
                                <FontAwesomeIcon icon={faPen} className='h-5 w-5 cursor-pointer' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center flex-wrap md:flex-row justify-between p-2 border-t" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    {rutas.length} RUTAS
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">
                            <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4' />
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                            <button onClick={() => setCurrentPage(index + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight border ${currentPage === index + 1 ? 'bg-verde-dos text-white' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}>{index + 1}</button>
                        </li>
                    ))}
                    <li>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">
                            <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4' />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default TablaRutas;