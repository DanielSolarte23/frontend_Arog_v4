'use client'
import React, { useState, useEffect } from 'react';

const VisualizadorDocumento = ({ documento, onCerrar, onEliminar }) => {
  const [metadatos, setMetadatos] = useState({});
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  // Procesar metadatos cuando el componente se monta o cuando cambia el documento
  useEffect(() => {
    if (documento?.metadata) {
      try {
        const metadatosParsed = typeof documento.metadata === 'string' 
          ? JSON.parse(documento.metadata) 
          : documento.metadata;
        setMetadatos(metadatosParsed);
      } catch (error) {
        console.error('Error al analizar metadatos:', error);
        setMetadatos({});
      }
    } else {
      setMetadatos({});
    }
  }, [documento]);

  // Controlar click fuera del modal para cerrarlo
  const handleClickOverlay = (e) => {
    if (e.target.id === 'modal-overlay') {
      onCerrar();
    }
  };

  // Obtener título del documento según su tipo
  const obtenerTitulo = () => {
    if (documento?.tipoDocumento === 'INFORME') {
      return metadatos.asunto || 'Informe';
    } else {
      return metadatos.concepto || 'Certificado';
    }
  };

  // Formato de fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'No especificada';
    
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return fechaString;
    }
  };

  // Renderizar detalles según el tipo de documento
  const renderizarDetalles = () => {
    if (documento?.tipoDocumento === 'INFORME') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Remitente:</p>
            <p className="font-medium">{metadatos.remitente || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Destinatario:</p>
            <p className="font-medium">{metadatos.destinatario || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha:</p>
            <p className="font-medium">{formatearFecha(metadatos.fecha)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Referencia ID:</p>
            <p className="font-medium">{documento.referenciaId || 'No especificada'}</p>
          </div>
          
          {metadatos.introduccion && (
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Introducción:</p>
              <p className="text-sm bg-gray-50 p-2 rounded">{metadatos.introduccion}</p>
            </div>
          )}
          
          {metadatos.desarrollo && (
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Desarrollo:</p>
              <p className="text-sm bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">{metadatos.desarrollo}</p>
            </div>
          )}
          
          {metadatos.conclusion && (
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Conclusión:</p>
              <p className="text-sm bg-gray-50 p-2 rounded">{metadatos.conclusion}</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Entidad Emisora:</p>
            <p className="font-medium">{metadatos.nombreEntidad || 'No especificada'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Lugar de Expedición:</p>
            <p className="font-medium">{metadatos.lugarExpedicion || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nombre de la Persona:</p>
            <p className="font-medium">{metadatos.nombrePersona || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Identificación:</p>
            <p className="font-medium">
              {metadatos.tipoIdentificacion || ''} {metadatos.numeroIdentificacion || 'No especificada'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha de Expedición:</p>
            <p className="font-medium">{formatearFecha(metadatos.fechaExpedicion)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha de Vencimiento:</p>
            <p className="font-medium">{formatearFecha(metadatos.fechaVencimiento)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Número de Referencia:</p>
            <p className="font-medium">{metadatos.numeroReferencia || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cargo del Certificante:</p>
            <p className="font-medium">{metadatos.cargoCertificante || 'No especificado'}</p>
          </div>
        </div>
      );
    }
  };

  if (!documento) return null;

  return (
    <div 
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClickOverlay}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Cabecera del modal */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold truncate">
            {obtenerTitulo()}
          </h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setMostrarDetalles(!mostrarDetalles)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              {mostrarDetalles ? 'Ocultar Detalles' : 'Mostrar Detalles'}
            </button>
            <button 
              onClick={() => {
                if (window.confirm('¿Está seguro de eliminar este documento?')) {
                  onEliminar(documento.id);
                }
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
            <button 
              onClick={onCerrar}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Detalles del documento (expandibles) */}
        {mostrarDetalles && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium mb-2">Detalles del Documento</h3>
            {renderizarDetalles()}
            <div className="text-xs text-gray-500">
              <p>ID del documento: {documento.id}</p>
              <p>Creado: {formatearFecha(documento.fechaCreacion)}</p>
            </div>
          </div>
        )}
        
        {/* Contenido del documento (iframe) */}
        <div className="flex-1 overflow-hidden">
          {documento.urlArchivo ? (
            <iframe 
              src={documento.urlArchivo} 
              className="w-full h-full border-0"
              title={obtenerTitulo()}
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <p className="text-gray-500">No se puede previsualizar este documento</p>
            </div>
          )}
        </div>
        
        {/* Pie del modal */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 text-right">
          <button 
            onClick={onCerrar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizadorDocumento;