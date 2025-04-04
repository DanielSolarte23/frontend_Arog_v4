
'use client'
import React, { useState, useEffect } from 'react';

const ListadoDocumentos = ({ tipoDocumento, onVerDocumento, onEliminarDocumento, actualizarListado }) => {
  const [documentos, setDocumentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDocumentos = async () => {
      try {
        setCargando(true);
        const response = await fetch(`/api/documentos?tipo=${tipoDocumento}`);
        
        if (response.ok) {
          const data = await response.json();
          // Ordenar por fecha de creación (más reciente primero)
          const documentosOrdenados = data.sort((a, b) => 
            new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
          );
          setDocumentos(documentosOrdenados);
        } else {
          const errorData = await response.json();
          setError(`Error al cargar documentos: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error al obtener documentos:', error);
        setError('Error al obtener documentos. Por favor, intente de nuevo.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDocumentos();
  }, [tipoDocumento, actualizarListado]);

  // Función para formatear la fecha
  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para obtener título del documento basado en metadatos
  const obtenerTituloDocumento = (documento) => {
    if (!documento.metadata) return 'Documento sin título';
    
    try {
      const metadata = typeof documento.metadata === 'string' 
        ? JSON.parse(documento.metadata) 
        : documento.metadata;
      
      if (tipoDocumento === 'INFORME') {
        return metadata.asunto || 'Informe sin asunto';
      } else {
        return metadata.concepto || 'Certificado sin concepto';
      }
    } catch (e) {
      console.error('Error al analizar metadatos:', e);
      return 'Error en título';
    }
  };

  // Función para obtener una descripción corta
  const obtenerDescripcionDocumento = (documento) => {
    if (!documento.metadata) return '';
    
    try {
      const metadata = typeof documento.metadata === 'string' 
        ? JSON.parse(documento.metadata) 
        : documento.metadata;
      
      if (tipoDocumento === 'INFORME') {
        return `De: ${metadata.remitente || 'No especificado'} - Para: ${metadata.destinatario || 'No especificado'}`;
      } else {
        return `${metadata.nombrePersona || 'No especificado'} - ${metadata.tipoIdentificacion || ''}: ${metadata.numeroIdentificacion || ''}`;
      }
    } catch (e) {
      console.error('Error al analizar metadatos para descripción:', e);
      return '';
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200">
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (documentos.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
        <p className="text-gray-600">No hay {tipoDocumento === 'INFORME' ? 'informes' : 'certificados'} disponibles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {tipoDocumento === 'INFORME' ? 'Listado de Informes' : 'Listado de Certificados'} ({documentos.length})
      </h3>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        {documentos.map((documento) => (
          <div 
            key={documento.id} 
            className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center p-4">
              <div className="flex-1">
                <h4 className="font-medium text-blue-700">{obtenerTituloDocumento(documento)}</h4>
                <p className="text-sm text-gray-600">{obtenerDescripcionDocumento(documento)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Creado: {formatearFecha(documento.fechaCreacion)}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => onVerDocumento(documento)}
                >
                  Ver
                </button>
                <button 
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  onClick={() => {
                    if (window.confirm('¿Está seguro de eliminar este documento?')) {
                      onEliminarDocumento(documento.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListadoDocumentos;