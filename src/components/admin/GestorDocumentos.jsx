'use client'
import React, { useState, useEffect } from 'react';
import FormularioInforme from './FormularioInforme';
import FormularioCertificado from './FormularioCertificado';
import ListadoDocumentos from './ListadoDocumentos';
import VisualizadorDocumento from './VisualizadorDocumento';

const GestorDocumentos = () => {
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoDocumentoActivo, setTipoDocumentoActivo] = useState('INFORME');
  const [actualizarListado, setActualizarListado] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState('crear');
  const [tipoPestanaActiva, setTipoPestanaActiva] = useState('informe');
  const [tipoListadoActivo, setTipoListadoActivo] = useState('informes');

  const handleCreacionExitosa = () => {
    setActualizarListado(!actualizarListado);
  };

  const handleVerDocumento = (documento) => {
    setDocumentoSeleccionado(documento);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setDocumentoSeleccionado(null);
  };

  const handleEliminarDocumento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/documentos${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setActualizarListado(!actualizarListado);
        if (mostrarModal) {
          handleCerrarModal();
        }
      } else {
        const data = await response.json();
        alert(`Error al eliminar: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      alert('Error al eliminar el documento');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestor de Documentos</h1>
      
      {/* Pestañas principales */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${pestanaActiva === 'crear' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setPestanaActiva('crear')}
          >
            Crear Documento
          </button>
          <button
            className={`py-2 px-4 font-medium ${pestanaActiva === 'listar' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setPestanaActiva('listar')}
          >
            Ver Documentos
          </button>
        </div>
        
        {/* Contenido de pestañas principales */}
        {pestanaActiva === 'crear' && (
          <div className="p-4 border rounded-lg mt-4">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`py-2 px-4 font-medium ${tipoPestanaActiva === 'informe' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                  setTipoPestanaActiva('informe');
                  setTipoDocumentoActivo('INFORME');
                }}
              >
                Informe
              </button>
              <button
                className={`py-2 px-4 font-medium ${tipoPestanaActiva === 'certificado' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                  setTipoPestanaActiva('certificado');
                  setTipoDocumentoActivo('CERTIFICADO');
                }}
              >
                Certificado
              </button>
            </div>
            
            {tipoPestanaActiva === 'informe' && (
              <FormularioInforme onCreacionExitosa={handleCreacionExitosa} />
            )}
            
            {tipoPestanaActiva === 'certificado' && (
              <FormularioCertificado onCreacionExitosa={handleCreacionExitosa} />
            )}
          </div>
        )}
        
        {pestanaActiva === 'listar' && (
          <div className="p-4 border rounded-lg mt-4">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`py-2 px-4 font-medium ${tipoListadoActivo === 'informes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setTipoListadoActivo('informes')}
              >
                Informes
              </button>
              <button
                className={`py-2 px-4 font-medium ${tipoListadoActivo === 'certificados' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setTipoListadoActivo('certificados')}
              >
                Certificados
              </button>
            </div>
            
            {tipoListadoActivo === 'informes' && (
              <ListadoDocumentos 
                tipoDocumento="INFORME" 
                onVerDocumento={handleVerDocumento} 
                onEliminarDocumento={handleEliminarDocumento}
                actualizarListado={actualizarListado}
              />
            )}
            
            {tipoListadoActivo === 'certificados' && (
              <ListadoDocumentos 
                tipoDocumento="CERTIFICADO" 
                onVerDocumento={handleVerDocumento} 
                onEliminarDocumento={handleEliminarDocumento}
                actualizarListado={actualizarListado}
              />
            )}
          </div>
        )}
      </div>
      
      {/* Modal para visualizar documento */}
      {mostrarModal && documentoSeleccionado && (
        <VisualizadorDocumento 
          documento={documentoSeleccionado} 
          onCerrar={handleCerrarModal}
          onEliminar={handleEliminarDocumento}
        />
      )}
    </div>
  );
};

export default GestorDocumentos;