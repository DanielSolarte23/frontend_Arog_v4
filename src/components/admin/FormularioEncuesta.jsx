"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAauth } from "@/context/AauthContext";

export default function EncuestaForm({ encuesta = null, onBack, onSuccess }) {
  const { user } = useAauth();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaExpiracion: "",
    estado: "ACTIVA",
    preguntas: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Si estamos editando, cargar los datos de la encuesta
  useEffect(() => {
    if (encuesta) {
      const formattedEncuesta = {
        ...encuesta,
        fechaExpiracion: encuesta.fechaExpiracion
          ? new Date(encuesta.fechaExpiracion).toISOString().split("T")[0]
          : "",
      };
      formattedEncuesta.preguntas = Array.isArray(encuesta.preguntas)
        ? encuesta.preguntas
        : [];
      setFormData(formattedEncuesta);
    } else {
      setFormData({
        titulo: "",
        descripcion: "",
        fechaExpiracion: "",
        estado: "ACTIVA",
        preguntas: [
          {
            texto: "",
            tipo: "texto_libre",
            requerida: true,
            opciones: [],
          },
        ],
      });
      setExpandedQuestion(0);
    }
  }, [encuesta]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validar que tengamos al menos título y una pregunta
      if (!formData.titulo.trim()) {
        throw new Error("El título de la encuesta es obligatorio");
      }

      if (formData.preguntas.length === 0) {
        throw new Error("La encuesta debe tener al menos una pregunta");
      }

      // Validar cada pregunta
      formData.preguntas.forEach((pregunta, index) => {
        if (!pregunta.texto.trim()) {
          throw new Error(`La pregunta ${index + 1} debe tener un texto`);
        }

        if (
          (pregunta.tipo === "opcion_multiple" ||
            pregunta.tipo === "seleccion_unica") &&
          (!pregunta.opciones || pregunta.opciones.length < 2)
        ) {
          throw new Error(
            `La pregunta ${index + 1} debe tener al menos 2 opciones`
          );
        }
      });

      // Preparar datos para la API
      const dataToSend = {
        ...formData,
        creadorId: user.id,
      };

      let response;
      if (encuesta) {
        response = await axios.put(
          `http://localhost:3002/api/encuestas/${encuesta.id}`,
          dataToSend
        );
      } else {
        response = await axios.post(
          "http://localhost:3002/api/encuestas",
          dataToSend
        );
      }

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.message || "Ha ocurrido un error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedPreguntas = [...prev.preguntas];
      updatedPreguntas[index] = {
        ...updatedPreguntas[index],
        [field]: value,
      };

      // Si cambiamos el tipo de pregunta a texto libre, eliminamos las opciones
      if (field === "tipo" && value === "texto_libre") {
        updatedPreguntas[index].opciones = [];
      }

      // Si cambiamos de texto libre a otro tipo, inicializamos las opciones
      if (
        field === "tipo" &&
        value !== "texto_libre" &&
        (!updatedPreguntas[index].opciones ||
          updatedPreguntas[index].opciones.length === 0)
      ) {
        updatedPreguntas[index].opciones = [
          { texto: "Opción 1" },
          { texto: "Opción 2" },
        ];
      }

      return {
        ...prev,
        preguntas: updatedPreguntas,
      };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData((prev) => {
      const updatedPreguntas = [...prev.preguntas];
      const updatedOpciones = [...updatedPreguntas[questionIndex].opciones];
      updatedOpciones[optionIndex] = {
        ...updatedOpciones[optionIndex],
        texto: value,
      };
      updatedPreguntas[questionIndex].opciones = updatedOpciones;

      return {
        ...prev,
        preguntas: updatedPreguntas,
      };
    });
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      preguntas: [
        ...prev.preguntas,
        {
          texto: "",
          tipo: "texto_libre",
          requerida: true,
          opciones: [],
        },
      ],
    }));
    setExpandedQuestion(formData.preguntas.length);
  };

  const removeQuestion = (index) => {
    if (formData.preguntas.length === 1) {
      return; // No permitir eliminar todas las preguntas
    }

    setFormData((prev) => ({
      ...prev,
      preguntas: prev.preguntas.filter((_, i) => i !== index),
    }));

    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else if (expandedQuestion > index) {
      setExpandedQuestion(expandedQuestion - 1);
    }
  };

  const addOption = (questionIndex) => {
    setFormData((prev) => {
      const updatedPreguntas = [...prev.preguntas];
      updatedPreguntas[questionIndex].opciones = [
        ...(updatedPreguntas[questionIndex].opciones || []),
        {
          texto: `Opción ${
            (updatedPreguntas[questionIndex].opciones?.length || 0) + 1
          }`,
        },
      ];

      return {
        ...prev,
        preguntas: updatedPreguntas,
      };
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    setFormData((prev) => {
      const updatedPreguntas = [...prev.preguntas];
      updatedPreguntas[questionIndex].opciones = updatedPreguntas[
        questionIndex
      ].opciones.filter((_, i) => i !== optionIndex);

      return {
        ...prev,
        preguntas: updatedPreguntas,
      };
    });
  };

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg overflow-y-auto h-full">
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
            onClick={handleSubmit}
            disabled={loading}
            className="bg-verde-dos text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? "Guardando..." : "Guardar Encuesta"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="titulo"
            >
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={formData.titulo}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 xl-plus:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Título de la encuesta"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Descripción de la encuesta"
              rows="3"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fechaExpiracion"
              >
                Fecha de expiración
              </label>
              <input
                id="fechaExpiracion"
                name="fechaExpiracion"
                type="date"
                value={formData.fechaExpiracion || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 xl-plus:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="estado"
              >
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 xl-plus:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="ACTIVA">Activa</option>
                <option value="INACTIVA">Inactiva</option>
                <option value="CERRADA">Cerrada</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Preguntas</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-verde text-white px-3 py-2 xl-plus:py-3 rounded text-sm flex items-center gap-1"
              >
                <Plus size={16} />
                Añadir pregunta
              </button>
            </div>

            <div className="space-y-4">
              {formData.preguntas.map((pregunta, questionIndex) => (
                <div
                  key={questionIndex}
                  className="border border-gray-200 rounded"
                >
                  <div
                    className="flex items-center justify-between bg-gray-50 px-4 py-3 cursor-pointer"
                    onClick={() => toggleQuestion(questionIndex)}
                  >
                    <div className="flex items-center">
                      <span className="bg-lime-100 text-verde-dos text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                        {questionIndex + 1}
                      </span>
                      <span className="font-medium truncate">
                        {pregunta.texto || "Nueva pregunta"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeQuestion(questionIndex);
                        }}
                        className="text-red-500 hover:text-red-700 mr-2"
                      >
                        <Trash2 size={16} />
                      </button>
                      {expandedQuestion === questionIndex ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                  </div>

                  {expandedQuestion === questionIndex && (
                    <div className="p-4">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Texto de la pregunta{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pregunta.texto}
                          onChange={(e) =>
                            handleQuestionChange(
                              questionIndex,
                              "texto",
                              e.target.value
                            )
                          }
                          className="shadow appearance-none border rounded w-full py-2 xl-plus:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Escribe la pregunta"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tipo de pregunta
                          </label>
                          <select
                            value={pregunta.tipo}
                            onChange={(e) =>
                              handleQuestionChange(
                                questionIndex,
                                "tipo",
                                e.target.value
                              )
                            }
                            className="shadow appearance-none border rounded w-full py-2 xl-plus:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="texto_libre">Texto libre</option>
                            <option value="seleccion_unica">
                              Selección única
                            </option>
                            <option value="opcion_multiple">
                              Opción múltiple
                            </option>
                            <option value="escala">Escala de valoración</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            ¿Es requerida?
                          </label>
                          <select
                            value={pregunta.requerida ? "true" : "false"}
                            onChange={(e) =>
                              handleQuestionChange(
                                questionIndex,
                                "requerida",
                                e.target.value === "true"
                              )
                            }
                            className="shadow appearance-none border rounded w-full py-2 xl-plus:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>

                      {(pregunta.tipo === "opcion_multiple" ||
                        pregunta.tipo === "seleccion_unica") && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-700 text-sm font-bold">
                              Opciones <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => addOption(questionIndex)}
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                            >
                              <Plus size={16} />
                              Añadir opción
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(pregunta.opciones || []).map(
                              (opcion, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center"
                                >
                                  <div className="mr-2 text-gray-400">
                                    <GripVertical size={16} />
                                  </div>
                                  <input
                                    type="text"
                                    value={opcion.texto}
                                    onChange={(e) =>
                                      handleOptionChange(
                                        questionIndex,
                                        optionIndex,
                                        e.target.value
                                      )
                                    }
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder={`Opción ${optionIndex + 1}`}
                                    required
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeOption(questionIndex, optionIndex)
                                    }
                                    className="ml-2 text-red-500 hover:text-red-700"
                                    disabled={
                                      (pregunta.opciones || []).length <= 2
                                    }
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                          {(pregunta.opciones || []).length < 2 && (
                            <p className="text-red-500 text-xs mt-1">
                              Se requieren al menos 2 opciones
                            </p>
                          )}
                        </div>
                      )}

                      {pregunta.tipo === "escala" && (
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Escala de valoración
                          </label>
                          <p className="text-sm text-gray-600 mb-2">
                            La escala será del 1 al 5, donde 1 es el valor
                            mínimo y 5 es el valor máximo.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
