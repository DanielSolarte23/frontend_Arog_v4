'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Eye, Edit, Trash2, BarChart2 } from 'lucide-react';
import EncuestaForm from './FormularioEncuesta';
import EncuestaDetail from './DetalleEncuesta';
import ResponderEncuesta from './ResponderEncuestas';
import EncuestaResultados from './ResultadoEncuesta';
import LoadingScreen from '../LoadingScreen';

export default function EncuestasDashboard() {
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState('list');
    const [selectedEncuesta, setSelectedEncuesta] = useState(null);

    // Cargar todas las encuestas
    useEffect(() => {
        const fetchEncuestas = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3002/api/encuestas');
                setEncuestas(response.data);
                setError(null);
            } catch (err) {
                setError('Error al cargar las encuestas: ' + err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEncuestas();
    }, []);

    // Eliminar encuesta
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) {
            try {
                await axios.delete(`http://localhost:3002/api/encuestas/${id}`);
                setEncuestas(encuestas.filter(enc => enc.id !== id));
            } catch (err) {
                setError('Error al eliminar la encuesta: ' + err.message);
            }
        }
    };

    const changeView = async (view, encuesta = null) => {
        setActiveView(view);
        if (view === 'edit' && encuesta) {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3002/api/encuestas/${encuesta.id}`);
                setSelectedEncuesta(response.data); // Obtener la encuesta con las preguntas
            } catch (err) {
                setError('Error al cargar los detalles de la encuesta: ' + err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            setSelectedEncuesta(encuesta);
        }
    };

    if (loading) return (
        <LoadingScreen />
    );

    // Renderizar la vista activa
    const renderActiveView = () => {
        switch (activeView) {
            case 'list':
                return <EncuestasList
                    encuestas={encuestas}
                    onView={(encuesta) => changeView('view', encuesta)}
                    onEdit={(encuesta) => changeView('edit', encuesta)}
                    onDelete={handleDelete}
                    onResults={(encuesta) => changeView('results', encuesta)}
                    onNew={() => changeView('new')}
                />;
            case 'view':
                return <EncuestaDetail
                    encuestaId={selectedEncuesta.id}
                    onBack={() => changeView('list')}
                    onResponder={() => changeView('responder', selectedEncuesta)}
                />;
            case 'new':
                return <EncuestaForm
                    onBack={() => changeView('list')}
                    onSuccess={(newEncuesta) => {
                        setEncuestas([...encuestas, newEncuesta]);
                        changeView('list');
                    }}
                />;
            case 'edit':
                return <EncuestaForm
                    encuesta={selectedEncuesta}
                    onBack={() => changeView('list')}
                    onSuccess={(updatedEncuesta) => {
                        setEncuestas(encuestas.map(e => e.id === updatedEncuesta.id ? updatedEncuesta : e));
                        changeView('list');
                    }}
                />;
            case 'responder':
                return <ResponderEncuesta
                    encuestaId={selectedEncuesta.id}
                    onBack={() => changeView('view', selectedEncuesta)}
                    onSuccess={() => changeView('list')}
                />;
            case 'results':
                return <EncuestaResultados
                    encuestaId={selectedEncuesta.id}
                    onBack={() => changeView('list')}
                />;
            default:
                return <div>Vista no disponible</div>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* //   <h1 className="text-2xl font-bold mb-6 text-gray-800"> */}
            {/* //     {activeView === 'list' ? 'Gestión de Encuestas' :  */}
            {/* //      activeView === 'new' ? 'Nueva Encuesta' : */}
            {/* //      activeView === 'edit' ? 'Editar Encuesta' :
        //      activeView === 'view' ? 'Ver Encuesta' :
        //      activeView === 'responder' ? 'Responder Encuesta' :
        //      'Resultados de Encuesta'}
        //   </h1> */}
            {/* // <> */}
            {renderActiveView()}
            {/* </> */}
        </div>
    );
}

// Componente para listar todas las encuestas
function EncuestasList({ encuestas, onView, onEdit, onDelete, onResults, onNew }) {
    return (
        <div className='px-4'>
            <div className="flex justify-end mb-4">
                <button
                    onClick={onNew}
                    className="bg-verde  text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <Plus size={18} />
                    Nueva Encuesta
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="border rounded-lg">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creador</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preguntas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Respuestas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {encuestas.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No hay encuestas disponibles
                                </td>
                            </tr>
                        ) : (
                            encuestas.map(encuesta => (
                                <tr key={encuesta.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{encuesta.titulo}</div>
                                        <div className="text-sm text-gray-500">{encuesta.descripcion?.substring(0, 50)}{encuesta.descripcion?.length > 50 ? '...' : ''}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {encuesta.creador.nombres} {encuesta.creador.apellidos}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {encuesta._count.preguntas}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {encuesta._count.respuestas}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => onView(encuesta)}
                                                className="text-verde-dos hover:text-verde-dos"
                                                title="Ver detalles"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => onEdit(encuesta)}
                                                className="text-verde-dos hover:text-verde-dos"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(encuesta.id)}
                                                className="text-verde-dos hover:text-verde-dos"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => onResults(encuesta)}
                                                className="text-verde-dos hover:text-verde-dos"
                                                title="Ver resultados"
                                            >
                                                <BarChart2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}