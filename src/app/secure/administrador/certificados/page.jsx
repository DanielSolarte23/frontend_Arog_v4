"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, FileText, Calendar, FileType, File } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import FormularioInforme from "@/components/admin/FormularioInformes";
import FormularioCertificado from "@/components/admin/GenerCertificado";

function Certificados() {
  const [datos, setDatos] = useState(null);
  const [certificadoSeleccionado, setCertificadoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalForm, setMostrarModalForm] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get(
          "http://localhost:3002/api/documentos"
        );
        setDatos(respuesta.data);
        console.log("Datos recibidos:", respuesta.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const abrirModal = (informe) => {
    setCertificadoSeleccionado(informe);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCertificadoSeleccionado(null);
  };

  const abrirFormulario = () => {
    setMostrarModalForm(true);
  };
  const cerrarFormulario = () => {
    setMostrarModalForm(false);
  };

  // Función para formatear la fecha
  const formatearFecha = (fechaStr) => {
    try {
      const fecha = new Date(fechaStr);
      return formatDistanceToNow(fecha, { addSuffix: true, locale: es });
    } catch (error) {
      return fechaStr;
    }
  };

  // Función para formatear el tamaño del archivo
  const formatearTamano = (tamano) => {
    if (!tamano) return "Desconocido";

    const tamanoEnKB = parseFloat(tamano) / 1024;
    if (tamanoEnKB < 1024) {
      return `${tamanoEnKB.toFixed(2)} KB`;
    } else {
      return `${(tamanoEnKB / 1024).toFixed(2)} MB`;
    }
  };

  return (
    <div className="bg-white h-full w-full border rounded-lg shadow-sm">
      <div className="border-b px-6 flex items-center justify-between py-2">
        <h1 className="text-2xl font-bold text-gray-800">Certificados</h1>

        <button
          className="bg-verde text-white p-3 rounded-lg"
          onClick={abrirFormulario}
        >
          Registrar certificado +
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((informe) => (
              <div
                key={informe.id}
                className="border rounded-lg shadow hover:shadow-md transition-all duration-200 cursor-pointer bg-white overflow-hidden flex flex-col"
                onClick={() => abrirModal(informe)}
              >
                <div className="bg-lime-50 p-4 flex items-center justify-center">
                  <FileText size={48} className="text-verde-dos" />
                </div>
                <div className="p-4 flex-grow">
                  <h2 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                    {informe.nombreArchivo}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileType size={16} className="mr-2" />
                      <span>{informe.tipoDocumento || "Documento"}</span>
                    </div>
                    {informe.subtipoCertificado && (
                      <div className="flex items-center text-sm text-gray-600">
                        <File size={16} className="mr-2" />
                        <span>{informe.subtipoCertificado}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>{formatearFecha(informe.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
                  {formatearTamano(informe.tamanoArchivo)}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-8 text-gray-500">
              {datos === null ? (
                <p>Cargando documentos...</p>
              ) : (
                <p>No hay informes disponibles.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal abrir formulario y registrar un nuevo informe */}

      {mostrarModalForm && (
        <FormularioCertificado cerrarFormulario={cerrarFormulario} />
      )}

      {/* Modal para mostrar el documento */}
      {mostrarModal && certificadoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-4/5 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg text-gray-800">
                {certificadoSeleccionado.nombreArchivo}
              </h3>
              <button
                onClick={cerrarModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow p-4 overflow-hidden">
              <iframe
                src={certificadoSeleccionado.url}
                className="w-full h-full border rounded"
                title={certificadoSeleccionado.nombreArchivo}
              ></iframe>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificados;
