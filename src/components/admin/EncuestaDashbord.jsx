"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Eye, Edit, Trash2, BarChart2 } from "lucide-react";
import EncuestaForm from "./FormularioEncuesta";
import EncuestaDetail from "./DetalleEncuesta";
import ResponderEncuesta from "./ResponderEncuestas";
import EncuestaResultados from "./ResultadoEncuesta";
import LoadingScreen from "../LoadingScreen";
import Paginacion from "./Paginacion";

export default function EncuestasDashboard() {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("list");
  const [selectedEncuesta, setSelectedEncuesta] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
    type: "success",
  });

  // Función para mostrar notificaciones
  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      isVisible: true,
      type,
    });

    // Ocultar la notificación después de 5000ms
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  // Función para cerrar notificación manualmente
  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  // Cargar todas las encuestas
  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3002/api/encuestas");
        setEncuestas(response.data);
        setError(null);
      } catch (err) {
        setError("Error al cargar las encuestas: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEncuestas();
  }, []);

  const handleDelete = async (id) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("¿Estás seguro de que deseas eliminar esta encuesta?")
    ) {
      try {
        await axios.delete(`http://localhost:3002/api/encuestas/${id}`);
        setEncuestas(encuestas.filter((enc) => enc.id !== id));
      } catch (err) {
        setError("Error al eliminar la encuesta: " + err.message);
      }
    }
  };

  const changeView = async (view, encuesta = null) => {
    setActiveView(view);
    if (view === "edit" && encuesta) {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3002/api/encuestas/${encuesta.id}`
        );
        setSelectedEncuesta(response.data); // Obtener la encuesta con las preguntas
      } catch (err) {
        setError("Error al cargar los detalles de la encuesta: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedEncuesta(encuesta);
    }
  };

  if (loading) return <LoadingScreen />;

  const renderActiveView = () => {
    switch (activeView) {
      case "list":
        return (
          <EncuestasList
            encuestas={encuestas}
            onView={(encuesta) => changeView("view", encuesta)}
            onEdit={(encuesta) => changeView("edit", encuesta)}
            onDelete={handleDelete}
            onResults={(encuesta) => changeView("results", encuesta)}
            onNew={() => changeView("new")}
          />
        );
      case "view":
        return (
          <EncuestaDetail
            encuestaId={selectedEncuesta.id}
            onBack={() => changeView("list")}
            onResponder={() => changeView("responder", selectedEncuesta)}
          />
        );
      case "new":
        return (
          <EncuestaForm
            onBack={() => changeView("list")}
            onSuccess={(newEncuesta) => {
              setEncuestas([...encuestas, newEncuesta]);
              changeView("list");
            }}
          />
        );
      case "edit":
        return (
          <EncuestaForm
            encuesta={selectedEncuesta}
            onBack={() => changeView("list")}
            onSuccess={(updatedEncuesta) => {
              setEncuestas(
                encuestas.map((e) =>
                  e.id === updatedEncuesta.id ? updatedEncuesta : e
                )
              );
              changeView("list");
            }}
          />
        );
      case "responder":
        return (
          <ResponderEncuesta
            encuestaId={selectedEncuesta.id}
            onBack={() => changeView("view", selectedEncuesta)}
            onSuccess={() => changeView("list")}
          />
        );
      case "results":
        return (
          <EncuestaResultados
            encuestaId={selectedEncuesta.id}
            onBack={() => changeView("list")}
          />
        );
      default:
        return <div>Vista no disponible</div>;
    }
  };

  return (
    <div className=" h-full mx-auto border rounded-lg">
      {renderActiveView()}
    </div>
  );
}

// Componente para listar todas las encuestas
function EncuestasList({
  encuestas,
  onView,
  onEdit,
  onDelete,
  onResults,
  onNew,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  //   const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Verificamos que estamos en el cliente
    if (typeof window !== "undefined") {
      const updateItemsPerPage = () => {
        if (window.innerWidth >= 1536) {
          // 2xl en Tailwind (1536px)
          setItemsPerPage(10);
        } else if (window.innerWidth >= 640) {
          // sm en Tailwind (640px)
          setItemsPerPage(5);
        } else {
          setItemsPerPage(3); // Opcional para pantallas más pequeñas
        }
      };

      updateItemsPerPage(); // Llamar una vez para establecer el valor inicial
      window.addEventListener("resize", updateItemsPerPage);

      // Limpiar el event listener cuando el componente se desmonte
      return () => window.removeEventListener("resize", updateItemsPerPage);
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = encuestas.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular total de páginas
  const totalPages = Math.ceil(encuestas.length / itemsPerPage);

  // Ajustar la página actual si el número total de páginas cambia
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, currentPage]);

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Obtener los números de página con lógica adaptable
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5; // Máximo de páginas a mostrar

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="relative overflow-x-auto bg-white h-full border-gray-200 rounded-lg">
      {/* {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          isVisible={notification.isVisible}
          type={notification.type}
          onClose={closeNotification}
        />
      )} */}

      <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-3 px-4 gap-3 h-auto md:h-[15%] xl-plus:h-1/10">
        <div className="flex items-center w-full md:w-auto justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Encuestas</h1>
          <div className="md:hidden">
            <span className="text-sm text-gray-500">
              {encuestas.length} encuestas
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onNew}
            className="bg-verde text-white px-3 py-2 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center hover:bg-verde-dos transition"
          >
            <Plus size={18} />
            <span className="font-medium">Nueva Encuesta</span>
          </button>
        </div>
      </nav>

      <div className="overflow-x-auto h-[70%] xl-plus:h-8/10 w-full p-4 md:p-6 xl-plus:p-10">
        {/* Vista de tabla para pantallas medianas y grandes */}
        <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
          <table className="text-sm text-left text-gray-500 w-full">
            {/* Encabezado */}
            <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4">Título</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Creador</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Preguntas</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Respuestas</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Acciones</th>
              </tr>
            </thead>

            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-2 md:px-6 md:py-4">
                    No hay encuestas disponibles
                  </td>
                </tr>
              ) : (
                currentItems.map((encuesta) => (
                  <tr key={encuesta.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {encuesta.titulo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {encuesta.descripcion?.substring(0, 50)}
                        {encuesta.descripcion?.length > 50 ? "..." : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {encuesta.creador?.nombres}{" "}
                      {encuesta.creador?.apellidos || ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {encuesta._count?.preguntas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {encuesta._count?.respuestas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onView(encuesta)}
                          className="text-verde-dos hover:text-verde-dos"
                          title="Ver detalles"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit(encuesta)}
                          className="text-verde-dos hover:text-verde-dos"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(encuesta.id)}
                          className="text-verde-dos hover:text-verde-dos"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => onResults(encuesta)}
                          className="text-verde-dos hover:text-verde-dos"
                          title="Ver resultados"
                        >
                          <BarChart2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Vista de tarjetas para móviles */}
        <div className="md:hidden space-y-4">
          {currentItems.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No hay encuestas disponibles
            </div>
          ) : (
            currentItems.map((encuesta) => (
              <div
                key={encuesta.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {encuesta.titulo}
                  </h3>
                  {encuesta.descripcion && (
                    <p className="text-sm text-gray-600">
                      {encuesta.descripcion.substring(0, 100)}
                      {encuesta.descripcion.length > 100 ? "..." : ""}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="font-medium text-gray-700">Creador:</span>
                    <p className="text-gray-600">
                      {encuesta.creador?.nombres} {encuesta.creador?.apellidos}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <span className="font-medium text-gray-700">
                        Preguntas:
                      </span>
                      <p className="text-gray-600">
                        {encuesta._count?.preguntas}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">
                        Respuestas:
                      </span>
                      <p className="text-gray-600">
                        {encuesta._count?.respuestas}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    onClick={() => onView(encuesta)}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 text-sm flex items-center gap-1"
                    title="Ver detalles"
                  >
                    <Eye size={14} />
                    <span>Ver</span>
                  </button>

                  <button
                    onClick={() => onEdit(encuesta)}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 text-sm flex items-center gap-1"
                    title="Editar"
                  >
                    <Edit size={14} />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => onResults(encuesta)}
                    className="bg-verde-dos px-3 py-1 rounded text-white text-sm flex items-center gap-1"
                    title="Ver resultados"
                  >
                    <BarChart2 size={14} />
                    <span>Resultados</span>
                  </button>

                  <button
                    onClick={() => onDelete(encuesta.id)}
                    className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded text-sm flex items-center gap-1"
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white border-t rounded-b-md h-[15%] xl-plus:h-1/10 flex flex-col md:flex-row items-center justify-center p-2 gap-4 px-4">
        <Paginacion
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          getPageNumbers={getPageNumbers}
        />
      </div>
    </div>
  );
}
