"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "../UploadForm";

export default function GaleriaC() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

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
    try {
      await axios.delete(`http://localhost:3002/api/multimedia/${id}`);
      // Actualizar la lista tras eliminar
      setMedia(media.filter((item) => item.id !== id));
      setModalDelete(false);
      setModalCard(false);
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
          className="w-full h-full object-cover rounded-lg"
        />
      );
    } else if (item.tipoArchivo.startsWith("video/")) {
      return <video src={item.url} controls className="w-full h-full object-cover rounded-lg" />;
    } else {
      return (
        <div className="file-icon flex flex-col items-center justify-center h-full p-4 rounded-lg bg-gray-100">
          <span className="text-sm text-gray-600">{item.tipoArchivo}</span>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Descargar
          </a>
        </div>
      );
    }
  };

  // Abrir modal con detalles del archivo
  const openDetailModal = (item, index) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setModalCard(true);
  };

  // Ir a imagen anterior en modal
  const goToPreviousImage = () => {
    const newIndex = (currentIndex - 1 + media.length) % media.length;
    setCurrentIndex(newIndex);
    setSelectedItem(media[newIndex]);
  };

  // Ir a imagen siguiente en modal
  const goToNextImage = () => {
    const newIndex = (currentIndex + 1) % media.length;
    setCurrentIndex(newIndex);
    setSelectedItem(media[newIndex]);
  };

  // Calcular paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = media.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(media.length / itemsPerPage);

  // Cambiar página
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // Renderizar detalles del archivo seleccionado
  const renderDetailContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.tipoArchivo.startsWith("image/")) {
      return (
        <img
          src={selectedItem.url}
          alt={selectedItem.nombreArchivo}
          className="w-full h-auto rounded-lg max-h-[60vh] object-contain"
        />
      );
    } else if (selectedItem.tipoArchivo.startsWith("video/")) {
      return <video src={selectedItem.url} controls className="w-full max-h-[60vh] rounded-lg" />;
    } else {
      return (
        <div className="file-icon flex flex-col items-center justify-center p-8 rounded-lg bg-gray-100">
          <span className="text-xl text-gray-600 mb-2">{selectedItem.nombreArchivo}</span>
          <span className="text-sm text-gray-500 mb-4">{selectedItem.tipoArchivo}</span>
          <a 
            href={selectedItem.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Descargar archivo
          </a>
        </div>
      );
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full p-8">Cargando archivos...</div>;
  if (error) return <div className="error text-red-500 p-8">{error}</div>;

  return (
    <>
      <header className="border bg-white border-gray-200 rounded-lg h-full">
        <div className="h-full flex flex-col">
          <nav className="p-2 md:p-4 rounded-t-lg border-b border-gray-200 flex items-center w-full flex-wrap gap-2">
            <h3 className="text-lg md:text-xl font-medium text-black">
              Galería
            </h3>
            <button
              className="ml-auto bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition flex-shrink-0"
              onClick={() => setModalOpen(true)}
            >
              <span className="font-medium text-sm md:text-base">
                Agregar imagen
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 md:w-5 md:h-5 fill-white"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
            </button>
          </nav>
          
          <div className="flex-grow p-4 overflow-y-auto">
            {currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No hay archivos para mostrar
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 h-full">
                {currentItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => openDetailModal(item, indexOfFirstItem + index)}
                    className="cursor-pointer relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition"
                  >
                    <div className="w-full h-full">
                      {renderMediaItem(item)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 truncate">
                      {item.nombreArchivo}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {media.length > itemsPerPage && (
            <div className="flex flex-col md:flex-row justify-between w-full gap-4 border-t py-3 px-4">
              <button 
                className="flex items-center justify-center gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-white hover:bg-gray-100 transition w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 md:w-5 md:h-5 fill-gray-600"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
                <span className="text-sm md:text-base text-gray-700 font-medium">
                  Anterior
                </span>
              </button>

              <div className="flex items-center justify-center">
                <span className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>
              </div>

              <button 
                className="flex items-center justify-center gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-white hover:bg-gray-100 transition w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <span className="text-sm md:text-base text-gray-700 font-medium">
                  Siguiente
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 md:w-5 md:h-5 fill-gray-600"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Modal para subir archivos */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-black"
              >
                <path d="M6.225 4.811a1.5 1.5 0 0 0-2.121 2.122L9.878 12l-5.774 5.067a1.5 1.5 0 1 0 2.122 2.122L12 14.122l5.067 5.067a1.5 1.5 0 1 0 2.122-2.122L14.122 12l5.067-5.067a1.5 1.5 0 1 0-2.122-2.122L12 9.878 6.225 4.811z" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">Subir nuevo archivo</h2>
            <UploadForm setModalOpen={setModalOpen} loadMedia={loadMedia}  onSuccessUpload={() => {
              setModalOpen(false);
              loadMedia();
            }}/>
          </div>
        </div>
      )}

      {/* Modal para ver imagen/archivo en detalle con navegación */}
      {modalCard && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
            <div className="max-h-[80vh] overflow-auto">
              {renderDetailContent()}
            </div>
            
            <div className="absolute top-72 left-2 right-2 flex justify-between">
              <button 
                onClick={goToPreviousImage}
                className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition "
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={() => setModalCard(false)}
                className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-white"
                >
                  <path d="M6.225 4.811a1.5 1.5 0 0 0-2.121 2.122L9.878 12l-5.774 5.067a1.5 1.5 0 1 0 2.122 2.122L12 14.122l5.067 5.067a1.5 1.5 0 1 0 2.122-2.122L14.122 12l5.067-5.067a1.5 1.5 0 1 0-2.122-2.122L12 9.878 6.225 4.811z" />
                </svg>
              </button>

              <button 
                onClick={goToNextImage}
                className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">{selectedItem.nombreArchivo}</h3>
              <p className="text-sm text-gray-500">{selectedItem.tipoArchivo}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <div className="flex justify-between w-full">
                <button 
                  className="flex items-center px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  onClick={() => window.open(selectedItem.url, '_blank')}
                >
                  <span className="font-medium text-black">Descargar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-black ml-2"
                  >
                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                  </svg>
                </button>

                <button
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => setModalDelete(true)}
                >
                  <span className="font-medium">Eliminar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-5 h-5 fill-white ml-2"
                  >
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              {currentIndex + 1} de {media.length}
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {modalDelete && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] relative">
            <button
              onClick={() => setModalDelete(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-black"
              >
                <path d="M6.225 4.811a1.5 1.5 0 0 0-2.121 2.122L9.878 12l-5.774 5.067a1.5 1.5 0 1 0 2.122 2.122L12 14.122l5.067 5.067a1.5 1.5 0 1 0 2.122-2.122L14.122 12l5.067-5.067a1.5 1.5 0 1 0-2.122-2.122L12 9.878 6.225 4.811z" />
              </svg>
            </button>

            <h1 className="font-semibold text-center mb-2">Eliminar archivo</h1>
            <h5 className="font-medium text-center mb-6">
              ¿Estás seguro de eliminar "{selectedItem.nombreArchivo}"?
            </h5>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setModalDelete(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              
              <button 
                onClick={() => handleDelete(selectedItem.id)}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                <span className="font-medium">Eliminar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-5 h-5 fill-white ml-2"
                >
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}