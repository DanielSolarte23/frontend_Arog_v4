import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Download } from 'lucide-react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingScreen from '../LoadingScreen';

export default function EncuestaResultados({ encuestaId, onBack }) {
    const [resultados, setResultados] = useState(null);
    const [encuesta, setEncuesta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                setLoading(true);
                // Cargar la información básica de la encuesta
                const encuestaResponse = await axios.get(`http://localhost:3002/api/encuestas/${encuestaId}`);
                setEncuesta(encuestaResponse.data);

                // Cargar los resultados
                const resultadosResponse = await axios.get(`http://localhost:3002/api/encuestas/${encuestaId}/resultados`);
                setResultados(resultadosResponse.data);

                setError(null);
            } catch (err) {
                setError('Error al cargar los resultados: ' + err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (encuestaId) {
            fetchResultados();
        }
    }, [encuestaId]);

    const exportarResultados = () => {
        if (!resultados) return;
      
        // Verificar que estamos en el cliente
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          // Crear un objeto para exportar que sea más legible
          const dataToExport = {
            encuesta: {
              titulo: encuesta.titulo,
              descripcion: encuesta.descripcion,
              fechaCreacion: encuesta.createdAt,
              fechaExpiracion: encuesta.fechaExpiracion,
              totalRespuestas: resultados.totalRespuestas
            },
            preguntas: resultados.preguntas.map(pregunta => {
              const preguntaData = {
                texto: pregunta.texto,
                tipo: pregunta.tipo,
                totalRespuestas: pregunta.totalRespuestas
              };
      
              if (pregunta.tipo === 'opcion_multiple' || pregunta.tipo === 'seleccion_unica') {
                preguntaData.opciones = pregunta.opciones.map(opcion => ({
                  texto: opcion.texto,
                  cantidad: opcion.cantidad,
                  porcentaje: opcion.porcentaje.toFixed(2) + '%'
                }));
              } else if (pregunta.tipo === 'escala') {
                preguntaData.promedio = pregunta.promedio.toFixed(2);
              }
      
              return preguntaData;
            })
          };
      
          // Convertir a JSON
          const jsonStr = JSON.stringify(dataToExport, null, 2);
      
          // Crear un blob y descargar
          const blob = new Blob([jsonStr], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `resultados-encuesta-${encuestaId}.json`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      };
      

    if (loading) return (
        <LoadingScreen/>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
        </div>
    );

    if (!resultados || !encuesta) return null;

    return (
        <div className="bg-white rounded-lg overflow-hidden px-4">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={20} className="mr-1" />
                        Volver
                    </button>

                    <button
                        onClick={exportarResultados}
                        className="bg-verde text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <Download size={18} />
                        Exportar resultados
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{encuesta.titulo}</h2>
                    <p className="text-gray-600 mb-4">{encuesta.descripcion}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-lime-50 rounded-lg p-4">
                            <p className="text-sm text-verde-dos font-medium">Total de respuestas</p>
                            <p className="text-3xl font-bold text-verde-dos">{resultados.totalRespuestas}</p>
                        </div>
                        <div className="bg-lime-50 rounded-lg p-4">
                            <p className="text-sm text-verde font-medium">Preguntas</p>
                            <p className="text-3xl font-bold text-verde">{resultados.preguntas.length}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Resultados por pregunta</h3>

                    <div className="space-y-8">
                        {resultados.preguntas.map((pregunta, index) => (
                            <div key={pregunta.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="mb-4">
                                    <div className="flex items-start">
                                        <span className="bg-blue-100 text-verde text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                                            {index + 1}
                                        </span>
                                        <h4 className="text-md font-medium text-gray-800">{pregunta.texto}</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-7">
                                        Tipo: {
                                            pregunta.tipo === 'texto_libre' ? 'Respuesta de texto libre' :
                                                pregunta.tipo === 'opcion_multiple' ? 'Selección múltiple' :
                                                    pregunta.tipo === 'seleccion_unica' ? 'Selección única' :
                                                        'Escala de valoración'
                                        }
                                    </p>
                                </div>

                                {(pregunta.tipo === 'opcion_multiple' || pregunta.tipo === 'seleccion_unica') && (
                                    <div className="ml-7">
                                        <div className="mb-4">
                                            <ResponsiveContainer width="100%" height={200}>
                                                <BarChart
                                                    data={pregunta.opciones}
                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="texto" />
                                                    <YAxis />
                                                    <Tooltip
                                                        formatter={(value) => [`${value} respuestas`, 'Cantidad']}
                                                        labelFormatter={(value) => `Opción: ${value}`}
                                                    />
                                                    <Bar dataKey="cantidad" fill="#72aa29" name="Respuestas" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opción</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Respuestas</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Porcentaje</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {pregunta.opciones.map((opcion) => (
                                                    <tr key={opcion.texto}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{opcion.texto}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opcion.cantidad}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                                                    <div
                                                                        className="bg-verde h-2.5 rounded-full"
                                                                        style={{ width: `${opcion.porcentaje}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span>{opcion.porcentaje.toFixed(1)}%</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {pregunta.tipo === 'escala' && (
                                    <div className="ml-7">
                                        <div className="mb-4">
                                            <div className="py-4">
                                                <p className="text-center text-lg font-medium text-gray-700">
                                                    Promedio: <span className="text-verde font-bold">{pregunta.promedio.toFixed(2)}</span>
                                                </p>
                                                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                                                    <div
                                                        className="bg-verde h-4 rounded-full"
                                                        style={{ width: `${(pregunta.promedio / 5) * 100}%` }}
                                                    >
                                                        <div className="relative h-full">
                                                            <div
                                                                className="absolute -right-3 -top-8 bg-verde text-white text-xs px-2 py-1 rounded"
                                                            >
                                                                {pregunta.promedio.toFixed(1)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                    <span>1</span>
                                                    <span>2</span>
                                                    <span>3</span>
                                                    <span>4</span>
                                                    <span>5</span>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <ResponsiveContainer width="100%" height={200}>
                                                    <LineChart
                                                        data={[
                                                            { valor: 1, cantidad: pregunta.respuestas?.filter(r => r.valorEscala === 1)?.length || 0 },
                                                            { valor: 2, cantidad: pregunta.respuestas?.filter(r => r.valorEscala === 2)?.length || 0 },
                                                            { valor: 3, cantidad: pregunta.respuestas?.filter(r => r.valorEscala === 3)?.length || 0 },
                                                            { valor: 4, cantidad: pregunta.respuestas?.filter(r => r.valorEscala === 4)?.length || 0 },
                                                            { valor: 5, cantidad: pregunta.respuestas?.filter(r => r.valorEscala === 5)?.length || 0 }
                                                        ]}
                                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="valor" />
                                                        <YAxis />
                                                        <Tooltip
                                                            formatter={(value) => [`${value} respuestas`, 'Cantidad']}
                                                            labelFormatter={(value) => `Valor: ${value}`}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="cantidad"
                                                            stroke="##72aa29"
                                                            activeDot={{ r: 8 }}
                                                            name="Respuestas"
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {pregunta.tipo === 'texto_libre' && (
                                    <div className="ml-7 mt-4">
                                        <p className="text-gray-500 italic mb-2">
                                            Las respuestas de texto libre no tienen visualización estadística disponible.
                                        </p>
                                        {/* Si quisieras mostrar las respuestas textuales individuales, podrías hacerlo aquí */}
                                        <div className="bg-gray-100 p-4 rounded-md">
                                            <p className="text-sm text-gray-600">Este tipo de pregunta requiere un análisis cualitativo de las respuestas.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}