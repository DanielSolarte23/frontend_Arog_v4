"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAauth } from "@/context/AauthContext";
import NotificationModal from "@/components/pruebas/NotificationModal";
import { useUsuario } from "@/context/UsuarioContext";

export default function Incidencias() {
  const { user } = useAauth();
  const { usuarios, getUsuarios } = useUsuario();

  const [modalOpen, setModalOpen] = useState(false);
  const [detalleModalOpen, setDetalleModalOpen] = useState(false);
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);

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

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Estado para el formulario
  const [formIncidencia, setFormIncidencia] = useState({
    fechaIncidencia: new Date().toISOString().split("T")[0],
    tituloIncidencia: "",
    descripcionIncidencia: "",
    tipoIncidencia: "",
    estadoIncidencia: "abierta",
    idUsuario: "",
    idUsuarioCiudadano: "",
    idUsuarioCreador: user?.id || "",
  });

  // Cargar las incidencias al montar el componente
  useEffect(() => {
    obtenerIncidencias();
  }, [currentPage]);

  // Función para obtener todas las incidencias
  const obtenerIncidencias = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://backend-arog-v4.onrender.com/api/incidencias");
      setIncidencias(response.data);

      // Actualizar paginación
      setTotalPages(Math.ceil(response.data.length / 10));

      setLoading(false);
    } catch (error) {
      console.error("Error al obtener incidencias:", error);
      setLoading(false);
    }
  };

  // Función para crear una nueva incidencia
  const crearIncidencia = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-arog-v4.onrender.com/api/incidencias",
        formIncidencia
      );

      setIncidencias([...incidencias, response.data]);
      resetForm();
      setModalOpen(false);
      obtenerIncidencias(); // Recargar incidencias
      // Mostrar notificación de éxito
      showNotification("Incidencia creada correctamente");
    } catch (error) {
      console.error("Error al crear incidencia:", error);
      alert("Error al crear la incidencia");
    }
  };

  // Función para actualizar una incidencia
  const actualizarIncidencia = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://backend-arog-v4.onrender.com/api/incidencias/${incidenciaSeleccionada.id}`,
        formIncidencia
      );

      // Actualizar la lista de incidencias
      setIncidencias(
        incidencias.map((inc) =>
          inc.id === incidenciaSeleccionada.id ? response.data : inc
        )
      );

      resetForm();
      setModalOpen(false);
      obtenerIncidencias();
      // Mostrar notificación de éxito
      showNotification("Incidencia actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar incidencia:", error);
      alert("Error al actualizar la incidencia");
    }
  };

  // Función para cambiar el estado de una incidencia
  const cambiarEstadoIncidencia = async (id, estado) => {
    try {
      await axios.patch(`https://backend-arog-v4.onrender.com/api/incidencias/${id}/status`, {
        estadoIncidencia: estado,
      });

      // Actualizar la lista de incidencias
      setIncidencias(
        incidencias.map((inc) =>
          inc.id === id ? { ...inc, estadoIncidencia: estado } : inc
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  // Función para abrir una incidencia en detalle
  const abrirDetalleIncidencia = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setDetalleModalOpen(true);

    if (incidencia.estadoIncidencia === "abierta") {
      cambiarEstadoIncidencia(incidencia.id, "en_progreso");
    }
  };

  // Función para abrir el modal de edición
  const abrirEditarIncidencia = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    getUsuarios();
    setFormIncidencia({
      fechaIncidencia: new Date(incidencia.fechaIncidencia)
        .toISOString()
        .split("T")[0],
      tituloIncidencia: incidencia.tituloIncidencia,
      descripcionIncidencia: incidencia.descripcionIncidencia,
      tipoIncidencia: incidencia.tipoIncidencia,
      estadoIncidencia: incidencia.estadoIncidencia,
      idUsuario: incidencia.idUsuario || "",
      idUsuarioCiudadano: incidencia.idUsuarioCiudadano || "",
      idUsuarioCreador: incidencia.idUsuarioCreador,
    });
    setModalOpen(true);
  };

  // Función para abrir modal de nueva incidencia
  const abrirNuevaIncidencia = () => {
    setIncidenciaSeleccionada(null);
    getUsuarios();
    resetForm();
    setModalOpen(true);
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setFormIncidencia({
      fechaIncidencia: new Date().toISOString().split("T")[0],
      tituloIncidencia: "",
      descripcionIncidencia: "",
      tipoIncidencia: "",
      estadoIncidencia: "abierta",
      idUsuario: "",
      idUsuarioCiudadano: "",
      idUsuarioCreador: user?.id || "",
    });
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormIncidencia((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filtrar incidencias por búsqueda
  const incidenciasFiltradas = incidencias.filter(
    (inc) =>
      inc.tituloIncidencia?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.descripcionIncidencia
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      inc.tipoIncidencia?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginación
  const paginatedIncidencias = incidenciasFiltradas.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <div className="relative overflow-x-auto h-full border-gray-200 rounded-lg">
      <NotificationModal
        message={notification.message}
        isVisible={notification.isVisible}
        type={notification.type}
        onClose={closeNotification}
      />
      <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-2 px-4 gap-4 h-1/10">
        <div className="relative w-full md:w-auto">
          <input
            type="search"
            className="block w-full placeholder:font-extralight text-lg text-gray-900 border border-gray-200 rounded-lg bg-white px-4 py-2"
            placeholder="Buscar incidencias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2 md:w-auto">
          <button className="hidden items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition w-full md:w-auto justify-center">
            <span className="text-gray-700 font-medium">Filtrar Por</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-gray-400"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          </button>
          <button
            className="bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition w-full md:w-auto justify-center"
            onClick={abrirNuevaIncidencia}
          >
            <span className="font-medium">Nueva incidencia</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-5 h-5 fill-white"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="overflow-x-auto h-8/10 w-full p-4 md:p-10">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-lime-600"></div>
          </div>
        ) : (
          <>
            {/* Vista de tabla para pantallas medianas y grandes */}
            <div className="hidden md:block">
              <table className="text-sm text-left text-gray-500 border-gray-200 rounded-lg w-full border">
                <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-200 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 md:px-6 md:py-4">Título</th>
                    <th className="px-4 py-3 md:px-6 md:py-4">Fecha</th>
                    <th className="px-4 py-3 md:px-6 md:py-4">Tipo</th>
                    <th className="px-4 py-3 md:px-6 md:py-4">Estado</th>
                    <th className="px-4 py-3 md:px-6 md:py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="rounded-lg">
                  {paginatedIncidencias.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No se encontraron incidencias
                      </td>
                    </tr>
                  ) : (
                    paginatedIncidencias.map((incidencia) => (
                      <tr
                        key={incidencia.id}
                        className="bg-white border-b border-gray-200"
                      >
                        <td className="px-4 py-2 md:px-6 md:py-4 font-medium">
                          {incidencia.tituloIncidencia}
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4">
                          {new Date(
                            incidencia.fechaIncidencia
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4">
                          {incidencia.tipoIncidencia}
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              incidencia.estadoIncidencia === "abierta"
                                ? "bg-red-100 text-red-800"
                                : incidencia.estadoIncidencia === "en_progreso"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {incidencia.estadoIncidencia === "en_progreso"
                              ? "En revision"
                              : `${incidencia.estadoIncidencia}`}
                          </span>
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4 flex gap-2">
                          <button
                            onClick={() => abrirDetalleIncidencia(incidencia)}
                            className="text-gray-500 hover:text-lime-600"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button
                            onClick={() => abrirEditarIncidencia(incidencia)}
                            className="text-gray-500 hover:text-lime-600"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Vista de tarjetas para móviles */}
            <div className="md:hidden space-y-4">
              {paginatedIncidencias.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron incidencias
                </div>
              ) : (
                paginatedIncidencias.map((incidencia) => (
                  <div
                    key={incidencia.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-900">
                        {incidencia.tituloIncidencia}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          incidencia.estadoIncidencia === "abierta"
                            ? "bg-red-100 text-red-800"
                            : incidencia.estadoIncidencia === "revisión"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {incidencia.estadoIncidencia}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Fecha:</span>
                        <span className="col-span-2 text-gray-600">
                          {new Date(
                            incidencia.fechaIncidencia
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Tipo:</span>
                        <span className="col-span-2 text-gray-600">
                          {incidencia.tipoIncidencia}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end gap-2">
                      <button
                        onClick={() => abrirDetalleIncidencia(incidencia)}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 text-sm flex items-center gap-1"
                      >
                        <i className="fa-solid fa-eye text-xs"></i>
                        <span>Ver</span>
                      </button>

                      <button
                        onClick={() => abrirEditarIncidencia(incidencia)}
                        className="bg-verde-dos px-3 py-1 rounded text-white text-sm flex items-center gap-1"
                      >
                        <i className="fa-solid fa-pen-to-square text-xs"></i>
                        <span>Editar</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Paginación */}
      <nav className="bg-white border-t rounded-b-md h-1/10 flex flex-col md:flex-row items-center justify-between p-2 gap-4">
        <button
          className={`flex items-center gap-2 border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition order-1 md:order-none w-full md:w-auto justify-center ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-gray-400"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          <span className="text-gray-700 font-medium">Anterior</span>
        </button>

        <ul className="flex items-center -space-x-px h-8 text-sm flex-wrap justify-center order-3 md:order-none">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center px-3 py-1 mx-1 rounded-md ${
                  currentPage === page
                    ? "bg-lime-600 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition order-2 md:order-none w-full md:w-auto justify-center ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <span className="text-gray-700 font-medium">Siguiente</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-gray-400"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </nav>

      {/* Modal para crear/editar incidencia */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[600px]">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
              {incidenciaSeleccionada
                ? "Editar incidencia"
                : "Agregar nueva incidencia"}
            </h2>
            <form
              onSubmit={
                incidenciaSeleccionada ? actualizarIncidencia : crearIncidencia
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título de la incidencia
                  </label>
                  <input
                    type="text"
                    name="tituloIncidencia"
                    value={formIncidencia.tituloIncidencia}
                    onChange={handleInputChange}
                    placeholder="Título descriptivo"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de incidencia
                  </label>
                  <input
                    type="date"
                    name="fechaIncidencia"
                    value={formIncidencia.fechaIncidencia}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de incidencia
                  </label>
                  <select
                    name="tipoIncidencia"
                    value={formIncidencia.tipoIncidencia}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="noRecoleccion">
                      No se realizó la recolección
                    </option>
                    <option value="recoleccionTardia">
                      Recolección tardía
                    </option>
                    <option value="residuosDerramados">
                      Residuos derramados
                    </option>
                    <option value="malOlor">Mal olor excesivo</option>
                    <option value="contenedorDañado">Contenedor dañado</option>
                    <option value="vehiculoConProblemas">
                      Problemas con el vehículo recolector
                    </option>
                    <option value="personalInadecuado">
                      Actitud inadecuada del personal
                    </option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destinado a
                </label>

                <select
                  name="idUsuario"
                  value={formIncidencia.idUsuario}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                >
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nombres} {usuario.apellidos}
                    </option>
                  ))}
                </select>

                {/* <input
                  type="number"
                  name="idUsuario"
                  value={formIncidencia.idUsuario}
                  onChange={handleInputChange}
                  placeholder="Usuario de destino"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                /> */}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción detallada
                </label>
                <textarea
                  name="descripcionIncidencia"
                  value={formIncidencia.descripcionIncidencia}
                  onChange={handleInputChange}
                  placeholder="Describa la incidencia con detalle"
                  className="w-full border border-gray-300 rounded-lg p-2 min-h-[100px]"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="font-medium">Cancelar</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base"
                >
                  <span className="font-medium">
                    {incidenciaSeleccionada ? "Actualizar" : "Crear"} Incidencia
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para ver detalles de incidencia */}
      {detalleModalOpen && incidenciaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[700px]">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {incidenciaSeleccionada.tituloIncidencia}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  incidenciaSeleccionada.estadoIncidencia === "abierta"
                    ? "bg-red-100 text-red-800"
                    : incidenciaSeleccionada.estadoIncidencia === "en_progreso"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {incidenciaSeleccionada.estadoIncidencia}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border-b pb-3">
                <p className="text-sm font-semibold text-gray-600">Fecha</p>
                <p>
                  {new Date(
                    incidenciaSeleccionada.fechaIncidencia
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm font-semibold text-gray-600">
                  Tipo de incidencia
                </p>
                <p className="capitalize">
                  {incidenciaSeleccionada.tipoIncidencia}
                </p>
              </div>

              <div className="border-b pb-3 col-span-2">
                <p className="text-sm font-semibold text-gray-600">
                  Descripción
                </p>
                <p className="text-gray-800 whitespace-pre-line">
                  {incidenciaSeleccionada.descripcionIncidencia}
                </p>
              </div>

              {incidenciaSeleccionada.idUsuario && (
                <div className="border-b pb-3">
                  <p className="text-sm font-semibold text-gray-600">
                    Remitente
                  </p>
                  <p>{incidenciaSeleccionada.creador?.nombres}</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="font-semibold mb-3">Cambiar estado</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    incidenciaSeleccionada.estadoIncidencia === "abierta"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                  onClick={() =>
                    cambiarEstadoIncidencia(
                      incidenciaSeleccionada.id,
                      "abierta"
                    )
                  }
                >
                  Abierta
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    incidenciaSeleccionada.estadoIncidencia === "revisión"
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                  onClick={() =>
                    cambiarEstadoIncidencia(
                      incidenciaSeleccionada.id,
                      "en_progreso"
                    )
                  }
                >
                  En revisión
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    incidenciaSeleccionada.estadoIncidencia === "resuelta"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                  onClick={() =>
                    cambiarEstadoIncidencia(
                      incidenciaSeleccionada.id,
                      "cerrada"
                    )
                  }
                >
                  Resuelta
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => abrirEditarIncidencia(incidenciaSeleccionada)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition flex items-center gap-1"
              >
                <i className="fa-solid fa-pen-to-square text-sm"></i>
                <span>Editar</span>
              </button>
              <button
                onClick={() => setDetalleModalOpen(false)}
                className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition"
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
