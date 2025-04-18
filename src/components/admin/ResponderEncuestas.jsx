'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Send } from 'lucide-react';

export default function ResponderEncuesta({ encuestaId, onBack, onSuccess }) {
  const [encuesta, setEncuesta] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Obtener datos de la encuesta
  useEffect(() => {
    const fetchEncuesta = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3002/api/encuestas/${encuestaId}`);
        setEncuesta(response.data);
        
        // Inicializar las respuestas vacías
        const initialRespuestas = {};
        response.data.preguntas.forEach(pregunta => {
          if (pregunta.tipo === 'opcion_multiple') {
            initialRespuestas[pregunta.id] = [];
          } else {
            initialRespuestas[pregunta.id] = null;
          }
        });
        setRespuestas(initialRespuestas);
        
        setError(null);
      } catch (err) {
        setError('Error al cargar la encuesta: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (encuestaId) {
      fetchEncuesta();
    }
  }, [encuestaId]);

  // Manejar cambios en las respuestas
  const handleRespuestaChange = (preguntaId, valor, tipo, opcionId = null) => {
    setRespuestas(prev => {
      const newRespuestas = { ...prev };
      
      if (tipo === 'texto_libre') {
        newRespuestas[preguntaId] = valor;
      } else if (tipo === 'seleccion_unica') {
        newRespuestas[preguntaId] = opcionId;
      } else if (tipo === 'opcion_multiple') {
        if (newRespuestas[preguntaId].includes(opcionId)) {
          newRespuestas[preguntaId] = newRespuestas[preguntaId].filter(id => id !== opcionId);
        } else {
          newRespuestas[preguntaId] = [...newRespuestas[preguntaId], opcionId];
        }
      } else if (tipo === 'escala') {
        newRespuestas[preguntaId] = parseInt(valor);
      }
      
      return newRespuestas;
    });
  };

  // Enviar respuestas
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Validar respuestas requeridas
      let hasError = false;
      encuesta.preguntas.forEach(pregunta => {
        if (pregunta.requerida) {
          if (respuestas[pregunta.id] === null || 
              respuestas[pregunta.id] === "" || 
              (Array.isArray(respuestas[pregunta.id]) && respuestas[pregunta.id].length === 0)) {
            hasError = true;
          }
        }
      });
      
      if (hasError) {
        throw new Error('Por favor completa todas las preguntas requeridas');
      }
      
      // Formatear las respuestas para la API
      const respuestasFormateadas = encuesta.preguntas.map(pregunta => {
        let respuesta = {
          preguntaId: pregunta.id
        };
        
        if (pregunta.tipo === 'texto_libre') {
          respuesta.textoRespuesta = respuestas[pregunta.id] || '';
        } else if (pregunta.tipo === 'seleccion_unica') {
          respuesta.opcionSeleccionadaId = respuestas[pregunta.id];
        } else if (pregunta.tipo === 'opcion_multiple') {
          // Para opción múltiple, enviamos una respuesta por cada opción seleccionada
          respuesta.opcionSeleccionadaId = respuestas[pregunta.id][0]; // Primera opción
          // Las demás opciones se manejarían con respuestas adicionales
        } else if (pregunta.tipo === 'escala') {
          respuesta.valorEscala = respuestas[pregunta.id];
        }
        
        return respuesta;
      });
      
      // Agregar las respuestas adicionales para opciones múltiples
      let respuestasExtras = [];
      encuesta.preguntas.forEach(pregunta => {
        if (pregunta.tipo === 'opcion_multiple' && respuestas[pregunta.id].length > 1) {
          for (let i = 1; i < respuestas[pregunta.id].length; i++) {
            respuestasExtras.push({
              preguntaId: pregunta.id,
              opcionSeleccionadaId: respuestas[pregunta.id][i]
            });
          }
        }
      });
      
      // Combinar todas las respuestas
      const todasLasRespuestas = [...respuestasFormateadas, ...respuestasExtras];
      
      // Enviar a la API
      await axios.post(`http://localhost:3002/api/encuestas/${encuestaId}/responder`, {
        usuarioId: 1, // Esto deberías obtenerlo de tu sistema de autenticación
        ciudadanoId: 1, // Igual aquí
        respuestas: todasLasRespuestas
      });
      
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Ha ocurrido un error al enviar las respuestas');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verde"></div>
    </div>
  );

  if (error && !encuesta) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{error}</p>
    </div>
  );

  if (success) return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      <p className="font-medium">¡Gracias por responder la encuesta!</p>
      <p>Tus respuestas han sido registradas correctamente.</p>
    </div>
  );

  if (!encuesta) return null;

  // Verificar si la encuesta está expirada o cerrada
  const isExpired = encuesta.fechaExpiracion && new Date(encuesta.fechaExpiracion) < new Date();
  const isClosed = encuesta.estado === 'CERRADA';

  if (isExpired || isClosed) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p className="font-medium">Esta encuesta ya no está disponible para responder</p>
        <p>{isExpired ? 'La encuesta ha expirado.' : 'La encuesta ha sido cerrada.'}</p>
        <button 
          onClick={onBack}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mt-4"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-1" />
            Volver
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{encuesta.titulo}</h2>
          <p className="text-gray-600">{encuesta.descripcion}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {encuesta.preguntas.map((pregunta, index) => (
              <div key={pregunta.id} className="bg-gray-50 rounded p-4">
                <div className="flex items-start mb-4">
                  <span className="bg-lime-100 text-verde text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                    {index + 1}
                  </span>
                  <h4 className="text-md font-medium text-gray-800">
                    {pregunta.texto}
                    {pregunta.requerida && <span className="text-red-500 ml-1">*</span>}
                  </h4>
                </div>
                
                <div className="ml-7">
                  {pregunta.tipo === 'texto_libre' && (
                    <textarea
                      value={respuestas[pregunta.id] || ''}
                      onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value, pregunta.tipo)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                      placeholder="Escribe tu respuesta aquí"
                      required={pregunta.requerida}
                    ></textarea>
                  )}
                  
                  {pregunta.tipo === 'seleccion_unica' && (
                    <div className="space-y-2">
                      {pregunta.opciones.map((opcion) => (
                        <div key={opcion.id} className="flex items-center">
                          <input
                            type="radio"
                            id={`opcion-${opcion.id}`}
                            name={`pregunta-${pregunta.id}`}
                            value={opcion.id}
                            checked={respuestas[pregunta.id] === opcion.id}
                            onChange={() => handleRespuestaChange(pregunta.id, null, pregunta.tipo, opcion.id)}
                            className="w-4 h-4 text-verde focus:ring-verde"
                            required={pregunta.requerida}
                          />
                          <label 
                            htmlFor={`opcion-${opcion.id}`}
                            className="ml-2 text-sm font-medium text-gray-700"
                          >
                            {opcion.texto}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {pregunta.tipo === 'opcion_multiple' && (
                    <div className="space-y-2">
                      {pregunta.opciones.map((opcion) => (
                        <div key={opcion.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`opcion-${opcion.id}`}
                            name={`pregunta-${pregunta.id}`}
                            value={opcion.id}
                            checked={(respuestas[pregunta.id] || []).includes(opcion.id)}
                            onChange={() => handleRespuestaChange(pregunta.id, null, pregunta.tipo, opcion.id)}
                            className="w-4 h-4 text-verde focus:ring-verde"
                          />
                          <label 
                            htmlFor={`opcion-${opcion.id}`}
                            className="ml-2 text-sm font-medium text-gray-700"
                          >
                            {opcion.texto}
                          </label>
                        </div>
                      ))}
                      {pregunta.requerida && respuestas[pregunta.id]?.length === 0 && (
                        <p className="text-red-500 text-xs">Selecciona al menos una opción</p>
                      )}
                    </div>
                  )}
                  
                  {pregunta.tipo === 'escala' && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">1 - Muy bajo</span>
                        <span className="text-xs text-gray-500">5 - Muy alto</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        {[1, 2, 3, 4, 5].map((valor) => (
                          <div key={valor} className="flex-1 text-center">
                            <input
                              type="radio"
                              id={`escala-${pregunta.id}-${valor}`}
                              name={`pregunta-${pregunta.id}`}
                              value={valor}
                              checked={respuestas[pregunta.id] === valor}
                              onChange={() => handleRespuestaChange(pregunta.id, valor, pregunta.tipo)}
                              className="hidden peer"
                              required={pregunta.requerida}
                            />
                            <label
                              htmlFor={`escala-${pregunta.id}-${valor}`}
                              className="block w-full py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 peer-checked:bg-verde peer-checked:text-white"
                            >
                              {valor}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-verde hover:bg-verde text-white px-6 py-2 rounded flex items-center gap-2"
            >
              <Send size={18} />
              {submitting ? 'Enviando...' : 'Enviar respuestas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}