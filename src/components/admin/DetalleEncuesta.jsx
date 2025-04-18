"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, Send } from "lucide-react";
import LoadingScreen from "../LoadingScreen";

export default function EncuestaDetail({ encuestaId, onBack, onResponder }) {
  const [encuesta, setEncuesta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEncuesta = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3002/api/encuestas/${encuestaId}`
        );
        setEncuesta(response.data);
        setError(null);
      } catch (err) {
        setError("Error al cargar la encuesta: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (encuestaId) {
      fetchEncuesta();
    }
  }, [encuestaId]);

  if (loading) return <LoadingScreen />;

  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );

  if (!encuesta) return null;

  // Verifica si la encuesta está expirada
  const isExpired =
    encuesta.fechaExpiracion && new Date(encuesta.fechaExpiracion) < new Date();

  return (
    <div className="bg-white rounded-lg overflow-y-auto h-full px-4">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-1" />
            Volver
          </button>

          {!isExpired && encuesta.estado !== "CERRADA" && (
            <button
              onClick={onResponder}
              className="bg-verde text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Send size={18} />
              Responder
            </button>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {encuesta.titulo}
          </h2>
          <p className="text-gray-600 mb-4">{encuesta.descripcion}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Creador:</span>{" "}
              {encuesta.creador.nombres} {encuesta.creador.apellidos}
            </div>
            {encuesta.fechaExpiracion && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">
                  Fecha de expiración:
                </span>{" "}
                {new Date(encuesta.fechaExpiracion).toLocaleDateString()}
                {isExpired && (
                  <span className="ml-2 text-red-600 font-medium">
                    (Expirada)
                  </span>
                )}
              </div>
            )}
            <div className="text-sm">
              <span className="font-medium text-gray-700">Estado:</span>{" "}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  encuesta.estado === "ACTIVA"
                    ? "bg-green-100 text-green-800"
                    : encuesta.estado === "CERRADA"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {encuesta.estado}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Preguntas
          </h3>

          <div className="space-y-6">
            {encuesta.preguntas.map((pregunta, index) => (
              <div key={pregunta.id} className="bg-gray-50 rounded p-4">
                <div className="flex items-start mb-2">
                  <span className="bg-lime-100 text-verde-dos text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                    {index + 1}
                  </span>
                  <h4 className="text-md font-medium text-gray-800">
                    {pregunta.texto}
                    {pregunta.requerida && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h4>
                </div>

                <div className="ml-7">
                  <p className="text-xs text-gray-500 mb-2">
                    {pregunta.tipo === "texto_libre"
                      ? "Respuesta de texto libre"
                      : pregunta.tipo === "opcion_multiple"
                      ? "Selección múltiple"
                      : pregunta.tipo === "seleccion_unica"
                      ? "Selección única"
                      : "Escala de valoración"}
                  </p>

                  {(pregunta.tipo === "opcion_multiple" ||
                    pregunta.tipo === "seleccion_unica") && (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {pregunta.opciones.map((opcion) => (
                        <li key={opcion.id} className="flex items-center">
                          <span className="h-2 w-2 bg-gray-400 rounded-full mr-2"></span>
                          {opcion.texto}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
