'use client'
import { useState } from 'react';
import axios from 'axios';
// import styles from './UploadForm.module.css'; // Puedes crear este archivo CSS si lo necesitas

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    setError(null);
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    // Validar tipo y tamaño de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Tipo de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG, GIF, WEBP) y videos MP4.');
      return;
    }
    
    if (selectedFile.size > maxSize) {
      setError(`El archivo es demasiado grande. El tamaño máximo permitido es 10MB.`);
      return;
    }
    
    setFile(selectedFile);
    
    // Crear vista previa
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  // Manejar subida de archivo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setLoading(true);
    setProgress(0);
    setError(null);
    
    try {
      // Crear FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Enviar archivo al servidor
      const response = await axios.post('http://localhost:3002/api/multimedia/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });
      
      // Limpiar estado
      setFile(null);
      setPreviewUrl(null);
      setProgress(0);
      
      // Mostrar mensaje de éxito
      alert('Archivo subido exitosamente');
      
    } catch (error) {
      console.error('Error al subir archivo:', error);
      setError(error.response?.data?.error || 'Error al subir el archivo. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2>Subir archivo multimedia</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="file">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Vista previa" 
                className=""
              />
            ) : (
              <div className="">
                <span>Seleccionar o arrastrar un archivo</span>
              </div>
            )}
            <input 
              type="file" 
              id="file" 
              onChange={handleFileChange}
              accept="image/*,video/mp4"
              disabled={loading}
              className="{styles.hiddenInput || 'hidden-input'}"
            />
          </label>
        </div>
        
        {error && (
          <div className="{styles.error || 'error-message'}">
            {error}
          </div>
        )}
        
        {file && (
          <div className="{styles.fileInfo || 'file-info'}">
            <p><strong>Nombre:</strong> {file.name}</p>
            <p><strong>Tamaño:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>Tipo:</strong> {file.type}</p>
          </div>
        )}
        
        {loading && (
          <div className="{styles.progressBar || 'progress-bar'}">
            <div 
              className="{styles.progress || 'progress'} "
              style={{ width: `${progress}%` }}
            ></div>
            <span>{progress}%</span>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={!file || loading}
          className="{styles.uploadButton || 'upload-button'}"
        >
          {loading ? 'Subiendo...' : 'Subir archivo'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;