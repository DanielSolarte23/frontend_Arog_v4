'use client'
import React, { useState } from 'react';

const FormularioInforme = ({ onCreacionExitosa }) => {
  const [cargando, setCargando] = useState(false);
  const [archivoPdf, setArchivoPdf] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formulario, setFormulario] = useState({
    remitente: '',
    destinatario: '',
    asunto: '',
    fecha: '',
    introduccion: '',
    desarrollo: '',
    conclusion: '',
    referencia: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const handleArchivoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type === 'application/pdf') {
      setArchivoPdf(archivo);
      // Crear URL para previsualización
      const fileUrl = URL.createObjectURL(archivo);
      setPreviewUrl(fileUrl);
    } else if (archivo) {
      alert('Solo se permiten archivos PDF');
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!archivoPdf) {
      alert('Por favor, seleccione un archivo PDF');
      return;
    }

    setCargando(true);
    
    try {
      // Preparar datos para la API
      const formData = new FormData();
      formData.append('file', archivoPdf);
      formData.append('tipoDocumento', 'INFORME');
      formData.append('referenciaId', formulario.referencia || '');
      
      // También podemos guardar los metadatos adicionales como un campo adicional
      const metadatosJSON = JSON.stringify({
        remitente: formulario.remitente,
        destinatario: formulario.destinatario,
        asunto: formulario.asunto,
        fecha: formulario.fecha,
        introduccion: formulario.introduccion,
        desarrollo: formulario.desarrollo,
        conclusion: formulario.conclusion
      });
      
      formData.append('metadata', metadatosJSON);
      
      const response = await fetch('http://localhost:3002/api/documentos', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        alert('Informe creado exitosamente');
        // Reiniciar formulario
        setFormulario({
          remitente: '',
          destinatario: '',
          asunto: '',
          fecha: '',
          introduccion: '',
          desarrollo: '',
          conclusion: '',
          referencia: ''
        });
        setArchivoPdf(null);
        setPreviewUrl(null);
        // Notificar al componente padre
        onCreacionExitosa();
      } else {
        const data = await response.json();
        alert(`Error al crear el informe: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al crear el informe:', error);
      alert('Error al crear el informe');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crear Nuevo Informe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remitente
            </label>
            <input
              type="text"
              name="remitente"
              value={formulario.remitente}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destinatario
            </label>
            <input
              type="text"
              name="destinatario"
              value={formulario.destinatario}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asunto
            </label>
            <input
              type="text"
              name="asunto"
              value={formulario.asunto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formulario.fecha}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Introducción
          </label>
          <textarea
            name="introduccion"
            value={formulario.introduccion}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desarrollo
          </label>
          <textarea
            name="desarrollo"
            value={formulario.desarrollo}
            onChange={handleInputChange}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Conclusión
          </label>
          <textarea
            name="conclusion"
            value={formulario.conclusion}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID de Referencia (opcional)
          </label>
          <input
            type="number"
            name="referencia"
            value={formulario.referencia}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Archivo PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleArchivoChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Solo archivos PDF (máx. 10MB)</p>
        </div>
        
        {previewUrl && (
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium mb-2">Vista previa:</h3>
            <iframe 
              src={previewUrl} 
              className="w-full h-64 border"
              title="Vista previa del PDF"
            ></iframe>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={cargando}
            className={`px-4 py-2 rounded-md text-white font-medium 
              ${cargando ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {cargando ? 'Procesando...' : 'Crear Informe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioInforme;