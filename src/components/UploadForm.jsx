"use client";
import { useState } from "react";
import axios from "axios";
// import styles from './UploadForm.module.css'; // Puedes crear este archivo CSS si lo necesitas

const UploadForm = ({ setModalOpen, loadMedia }) => {
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
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(selectedFile.type)) {
      setError(
        "Tipo de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG, GIF, WEBP) y videos MP4."
      );
      return;
    }

    if (selectedFile.size > maxSize) {
      setError(
        `El archivo es demasiado grande. El tamaño máximo permitido es 10MB.`
      );
      return;
    }

    setFile(selectedFile);

    // Crear vista previa
    if (selectedFile.type.startsWith("image/")) {
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
      formData.append("file", file);

      // Enviar archivo al servidor
      const response = await axios.post(
        "http://localhost:3002/api/multimedia/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      // Limpiar estado
      setFile(null);
      setPreviewUrl(null);
      setProgress(0);

      // Mostrar mensaje de éxito
      // alert("Archivo subido exitosamente");
      setModalOpen(false);
      loadMedia();
    } catch (error) {
      console.error("Error al subir archivo:", error);
      setError(
        error.response?.data?.error ||
          "Error al subir el archivo. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Subir archivo multimedia
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative border-dashed border-2 border-gray-400 rounded-lg p-6 flex justify-center items-center cursor-pointer">
          <label
            htmlFor="file"
            className="w-full h-full flex justify-center items-center"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Vista previa"
                className="max-w-full max-h-48 rounded-lg"
              />
            ) : (
              <div className="text-center">
                <span className="text-gray-600">
                  Seleccionar o arrastrar un archivo
                </span>
              </div>
            )}
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept="image/*,video/mp4"
              disabled={loading}
              className="hidden" // Ocultamos el input original
            />
          </label>
        </div>

        {error && (
          <div className="text-red-500 bg-red-100 border border-red-400 rounded-md p-2 text-sm">
            {error}
          </div>
        )}

        {file && (
          <div className="bg-gray-100 rounded-md p-4">
            <p>
              <strong className="font-semibold">Nombre:</strong> {file.name}
            </p>
            <p>
              <strong className="font-semibold">Tamaño:</strong>{" "}
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p>
              <strong className="font-semibold">Tipo:</strong> {file.type}
            </p>
          </div>
        )}

        {loading && (
          <div className="bg-gray-200 rounded-full h-8 overflow-hidden relative">
            <div
              className="bg-verde h-full transition-width duration-300"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-white">
              {progress}%
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading || !file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-verde-dos"
          }`}
        >
          {loading ? "Subiendo..." : "Subir archivo"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
