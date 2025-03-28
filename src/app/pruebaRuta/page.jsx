"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar los archivos
  const loadMedia = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3002/api/multimedia");
      setMedia(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar archivos:", err);
      setError("No se pudieron cargar los archivos");
    } finally {
      setLoading(false);
    }
  };

  // Cargar archivos al montar el componente
  useEffect(() => {
    loadMedia();
  }, []);

  // Función para eliminar un archivo
  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este archivo?")) return;

    try {
      await axios.delete(`http://localhost:3002/api/multimedia/${id}`);
      // Actualizar la lista tras eliminar
      setMedia(media.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error al eliminar archivo:", err);
      alert("Error al eliminar el archivo");
    }
  };

  // Función para renderizar el archivo según su tipo
  const renderMediaItem = (item) => {
    if (item.tipoArchivo.startsWith("image/")) {
      return (
        <img
          src={item.url}
          alt={item.nombreArchivo}
          loading="lazy"
          width={item.ancho > 300 ? 300 : item.ancho}
        />
      );
    } else if (item.tipoArchivo.startsWith("video/")) {
      return <video src={item.url} controls width="300" />;
    } else {
      return (
        <div className="file-icon">
          <span>{item.tipoArchivo}</span>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Descargar
          </a>
        </div>
      );
    }
  };

  if (loading) return <div>Cargando archivos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gallery">
      <h2>Galería de archivos</h2>

      {media.length === 0 ? (
        <p>No hay archivos para mostrar</p>
      ) : (
        <div className="media-grid">
          {media.map((item) => (
            <div key={item.id} className="media-item">
              <div className="media-content">{renderMediaItem(item)}</div>
              <div className="media-info">
                <h3>{item.nombreArchivo}</h3>
                <p>
                  Subido el: {new Date(item.fechaSubida).toLocaleDateString()}
                </p>
                <p>
                  Tamaño:{" "}
                  {typeof item.tamanoArchivo === "string" &&
                  !isNaN(parseFloat(item.tamanoArchivo))
                    ? parseFloat(item.tamanoArchivo).toFixed(2)
                    : "N/A"}{" "}
                  KB
                </p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
