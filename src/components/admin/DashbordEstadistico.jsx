"use client"
import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    ComposedChart, Area
} from 'recharts';

// Datos de muestra para el formulario "Registro operativo en ruta"
const rutaData = [
    { item: 1, fecha: '2025-03-25T08:30:00', barrio: 'San Antonio', pesoTotal: 125, descripcion: 'Residuos orgánicos principalmente' },
    { item: 2, fecha: '2025-03-25T10:15:00', barrio: 'El Poblado', pesoTotal: 198, descripcion: 'Alta cantidad de plásticos' },
    { item: 3, fecha: '2025-03-25T13:45:00', barrio: 'Laureles', pesoTotal: 156, descripcion: 'Mezcla de residuos' },
    { item: 4, fecha: '2025-03-26T09:20:00', barrio: 'San Antonio', pesoTotal: 132, descripcion: '' },
    { item: 5, fecha: '2025-03-26T11:30:00', barrio: 'Envigado', pesoTotal: 210, descripcion: 'Residuos comerciales' },
    { item: 6, fecha: '2025-03-26T14:10:00', barrio: 'El Poblado', pesoTotal: 187, descripcion: '' },
    { item: 7, fecha: '2025-03-27T08:45:00', barrio: 'Belén', pesoTotal: 145, descripcion: 'Materiales reciclables' },
    { item: 8, fecha: '2025-03-27T11:00:00', barrio: 'Laureles', pesoTotal: 163, descripcion: '' },
    { item: 9, fecha: '2025-03-27T13:30:00', barrio: 'Envigado', pesoTotal: 195, descripcion: 'Residuos de construcción' },
    { item: 10, fecha: '2025-03-28T09:10:00', barrio: 'Belén', pesoTotal: 138, descripcion: '' }
];

// Datos de muestra para el formulario "Registro de recolección en fuentes"
const fuentesData = [
    { fecha: '2025-03-25T09:00:00', recipiente: 1, pesoVacio: 12, pesoLleno: 58, diferencia: 46, observacion: 'Plásticos PET' },
    { fecha: '2025-03-25T09:15:00', recipiente: 2, pesoVacio: 10, pesoLleno: 63, diferencia: 53, observacion: 'Papel y cartón' },
    { fecha: '2025-03-25T09:30:00', recipiente: 3, pesoVacio: 15, pesoLleno: 89, diferencia: 74, observacion: 'Residuos orgánicos' },
    { fecha: '2025-03-26T10:00:00', recipiente: 1, pesoVacio: 12, pesoLleno: 62, diferencia: 50, observacion: 'Plásticos PET' },
    { fecha: '2025-03-26T10:15:00', recipiente: 2, pesoVacio: 10, pesoLleno: 58, diferencia: 48, observacion: 'Papel y cartón' },
    { fecha: '2025-03-26T10:30:00', recipiente: 3, pesoVacio: 15, pesoLleno: 92, diferencia: 77, observacion: 'Residuos orgánicos' },
    { fecha: '2025-03-27T09:45:00', recipiente: 1, pesoVacio: 12, pesoLleno: 65, diferencia: 53, observacion: 'Plásticos PET' },
    { fecha: '2025-03-27T10:00:00', recipiente: 2, pesoVacio: 10, pesoLleno: 67, diferencia: 57, observacion: 'Papel y cartón' },
    { fecha: '2025-03-27T10:15:00', recipiente: 3, pesoVacio: 15, pesoLleno: 94, diferencia: 79, observacion: 'Residuos orgánicos' },
    { fecha: '2025-03-28T09:30:00', recipiente: 1, pesoVacio: 12, pesoLleno: 59, diferencia: 47, observacion: 'Plásticos PET' },
    { fecha: '2025-03-28T09:45:00', recipiente: 2, pesoVacio: 10, pesoLleno: 61, diferencia: 51, observacion: 'Papel y cartón' },
    { fecha: '2025-03-28T10:00:00', recipiente: 3, pesoVacio: 15, pesoLleno: 97, diferencia: 82, observacion: 'Residuos orgánicos' }
];

// Función auxiliar para formatear fechas
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
};

// Función para agrupar datos por barrio
const getPesoPorBarrio = () => {
    const barrioMap = {};
    rutaData.forEach(item => {
        barrioMap[item.barrio] = (barrioMap[item.barrio] || 0) + item.pesoTotal;
    });
    return Object.keys(barrioMap).map(barrio => ({
        barrio,
        pesoTotal: barrioMap[barrio]
    }));
};

// Función para obtener datos por día
const getPesoPorDia = () => {
    const dataMap = {};
    rutaData.forEach(item => {
        const day = item.fecha.split('T')[0];
        dataMap[day] = (dataMap[day] || 0) + item.pesoTotal;
    });
    return Object.keys(dataMap).map(day => ({
        fecha: formatDate(day),
        pesoTotal: dataMap[day]
    }));
};

// Función para obtener datos de fuentes por tipo
const getPesoPorTipoFuente = () => {
    const dataMap = {};
    fuentesData.forEach(item => {
        const tipo = item.observacion.split(' ')[0]; // Simplificación para este ejemplo
        dataMap[tipo] = (dataMap[tipo] || 0) + item.diferencia;
    });
    return Object.keys(dataMap).map(tipo => ({
        tipo,
        peso: dataMap[tipo]
    }));
};

// Datos para la gráfica compuesta
const getComparisonData = () => {
    const dates = [...new Set(rutaData.map(item => item.fecha.split('T')[0]))];
    return dates.map(date => {
        const rutaPeso = rutaData
            .filter(item => item.fecha.startsWith(date))
            .reduce((sum, item) => sum + item.pesoTotal, 0);

        const fuentesPeso = fuentesData
            .filter(item => item.fecha.startsWith(date))
            .reduce((sum, item) => sum + item.diferencia, 0);

        return {
            fecha: formatDate(date),
            ruta: rutaPeso,
            fuentes: fuentesPeso
        };
    });
};

// Colores para los gráficos
const COLORS = ['#72aa00', '#181d27', '#d1d1d1', '#f7f7f7', '#999999'];

export default function DashboardEstadistico() {
    const [activeTab, setActiveTab] = useState('general');
    const [windowWidth, setWindowWidth] = useState(1024);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            // Establecer el ancho inicial
            setWindowWidth(window.innerWidth);

            // Agregar listener para manejar cambios de tamaño
            window.addEventListener('resize', handleResize);

            // Limpiar al desmontar
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);


    const barrioData = getPesoPorBarrio();
    const diaData = getPesoPorDia();
    const tipoFuenteData = getPesoPorTipoFuente();
    const comparisonData = getComparisonData();

    // Determina si estamos en vista móvil
    const isMobile = windowWidth < 768;

    return (
        <div className="min-h-full bg-white rounded-lg border">
            <nav className="border-b">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        <button
                            className={`py-4 px-6 font-medium ${activeTab === 'general' ? 'text-verde border-b-2 border-verde' : 'text-verde-dos'}`}
                            onClick={() => setActiveTab('general')}
                        >
                            Vista General
                        </button>
                        <button
                            className={`py-4 px-6 font-medium ${activeTab === 'ruta' ? 'text-verde border-b-2 border-verde' : 'text-verde-dos'}`}
                            onClick={() => setActiveTab('ruta')}
                        >
                            Registro en Ruta
                        </button>
                        <button
                            className={`py-4 px-6 font-medium ${activeTab === 'fuentes' ? 'text-verde border-b-2 border-verde' : 'text-verde-dos'}`}
                            onClick={() => setActiveTab('fuentes')}
                        >
                            Registro en Fuentes
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                {activeTab === 'general' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                        <div className="bg-white  p-6 rounded-lg shadow border">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Comparación de Recolección Diaria</h2>
                            <div className="h-64 xl-plus:h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={comparisonData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="fecha" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="ruta" name="Recolección en Ruta" fill="#181d27" />
                                        <Bar dataKey="fuentes" name="Recolección en Fuentes" fill="#72aa00" />
                                        <Line type="monotone" dataKey="ruta" name="Tendencia Ruta" stroke="#ff7300" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribución por Tipo de Residuo</h2>
                            <div className="h-64 xl-plus:h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={tipoFuenteData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={!isMobile}
                                            label={!isMobile && {
                                                formatter({ name, percent }) {
                                                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                                                }
                                            }}
                                            outerRadius={isMobile ? 60 : 80}
                                            fill="#8884d8"
                                            dataKey="peso"
                                            nameKey="tipo"
                                        >
                                            {tipoFuenteData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border lg:col-span-2 xl-plus:h-64">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen Estadístico</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-lime-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-verde-dos">Total Recolectado en Ruta</h3>
                                    <p className="text-3xl font-bold text-verde-dos mt-2">
                                        {rutaData.reduce((sum, item) => sum + item.pesoTotal, 0)} kg
                                    </p>
                                </div>
                                <div className="bg-lime-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-verde">Total Recolectado en Fuentes</h3>
                                    <p className="text-3xl font-bold text-verde mt-2">
                                        {fuentesData.reduce((sum, item) => sum + item.diferencia, 0)} kg
                                    </p>
                                </div>
                                <div className="bg-zinc-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-zinc-900">Total General</h3>
                                    <p className="text-3xl font-bold text-zinc-900 mt-2">
                                        {rutaData.reduce((sum, item) => sum + item.pesoTotal, 0) +
                                            fuentesData.reduce((sum, item) => sum + item.diferencia, 0)} kg
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'ruta' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Peso Recolectado por Barrio</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barrioData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="barrio" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pesoTotal" name="Peso Total (kg)" fill="#181d27" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tendencia de Recolección Diaria</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={diaData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="fecha" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="pesoTotal" name="Peso Total (kg)" stroke="#72aa00" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles de Registros en Ruta</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left">Item</th>
                                            <th className="py-2 px-4 border-b text-left">Fecha</th>
                                            <th className="py-2 px-4 border-b text-left">Barrio</th>
                                            <th className="py-2 px-4 border-b text-left">Peso Total (kg)</th>
                                            <th className="py-2 px-4 border-b text-left">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rutaData.map((item) => (
                                            <tr key={item.item} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">{item.item}</td>
                                                <td className="py-2 px-4 border-b">{new Date(item.fecha).toLocaleString()}</td>
                                                <td className="py-2 px-4 border-b">{item.barrio}</td>
                                                <td className="py-2 px-4 border-b">{item.pesoTotal}</td>
                                                <td className="py-2 px-4 border-b">{item.descripcion || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'fuentes' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Peso por Tipo de Residuo</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={tipoFuenteData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={!isMobile}
                                            label={!isMobile && {
                                                formatter({ tipo, percent }) {
                                                    return `${tipo}: ${(percent * 100).toFixed(0)}%`;
                                                }
                                            }}
                                            outerRadius={isMobile ? 60 : 80}
                                            fill="#8884d8"
                                            dataKey="peso"
                                            nameKey="tipo"
                                        >
                                            {tipoFuenteData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Peso por Recipiente</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={fuentesData.reduce((acc, item) => {
                                            const existingItem = acc.find(i => i.recipiente === item.recipiente);
                                            if (existingItem) {
                                                existingItem.diferencia += item.diferencia;
                                            } else {
                                                acc.push({
                                                    recipiente: item.recipiente,
                                                    diferencia: item.diferencia,
                                                    observacion: item.observacion
                                                });
                                            }
                                            return acc;
                                        }, [])}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="recipiente" name="Recipiente" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="diferencia" name="Peso Neto (kg)" fill="#72aa00" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles de Registros en Fuentes</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left">Fecha</th>
                                            <th className="py-2 px-4 border-b text-left">Recipiente</th>
                                            <th className="py-2 px-4 border-b text-left">Peso Vacío (kg)</th>
                                            <th className="py-2 px-4 border-b text-left">Peso Lleno (kg)</th>
                                            <th className="py-2 px-4 border-b text-left">Diferencia (kg)</th>
                                            <th className="py-2 px-4 border-b text-left">Observación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fuentesData.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">{new Date(item.fecha).toLocaleString()}</td>
                                                <td className="py-2 px-4 border-b">{item.recipiente}</td>
                                                <td className="py-2 px-4 border-b">{item.pesoVacio}</td>
                                                <td className="py-2 px-4 border-b">{item.pesoLleno}</td>
                                                <td className="py-2 px-4 border-b">{item.diferencia}</td>
                                                <td className="py-2 px-4 border-b">{item.observacion || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
                }
            </main >
        </div >
    );
}