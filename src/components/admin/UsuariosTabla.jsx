"use client";
import { useUsuario } from "@/context/UsuarioContext";
import { useState, useEffect, useMemo } from "react";
import LoadingScreen from "../LoadingScreen";
import NotificationModal from "../pruebas/NotificationModal";
import RegistroUsuarioForm from "./RegistroUsuarioForm";
import Paginacion from "./Paginacion";

export default function UsuariosTabla() {
  const { usuarios, getUsuarios, updateUsuario, deleteUsuario, getUsuario, createUsuario, error, loading } =
    useUsuario();

  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombres: "",
    apellidos: "",
    correoElectronico: "",
    telefono: "",
    direccion: "",
    rol: "",
    contraseña: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
    type: "success"
  });

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1536) { // 2xl en Tailwind (1536px)
        setItemsPerPage(10);
      } else if (window.innerWidth >= 640) { // sm en Tailwind (640px)
        setItemsPerPage(5);
      } else {
        setItemsPerPage(3); // Opcional para pantallas más pequeñas
      }
    };

    updateItemsPerPage(); // Llamar una vez para establecer el valor inicial
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Función para mostrar notificaciones
  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      isVisible: true,
      type
    });

    // Ocultar la notificación después de 5000ms
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  // Función para cerrar notificación manualmente
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  // Helper function to safely convert a value to lowercase
  const safeToLowerCase = (value) => {
    return value ? value.toLowerCase() : "";
  };

  const filterUsuarios = useMemo(() => {
    if (!searchQuery) return usuarios || [];
    if (!usuarios) return [];

    const lowercaseQuery = searchQuery.toLowerCase();
    return usuarios.filter((usuario) => {
      if (!usuario) return false;

      return (
        safeToLowerCase(usuario.nombres).includes(lowercaseQuery) ||
        safeToLowerCase(usuario.apellidos).includes(lowercaseQuery) ||
        safeToLowerCase(usuario.correoElectronico).includes(lowercaseQuery) ||
        safeToLowerCase(usuario.telefono).includes(lowercaseQuery) ||
        safeToLowerCase(usuario.direccion).includes(lowercaseQuery) ||
        safeToLowerCase(usuario.rol).includes(lowercaseQuery)
      );
    });
  }, [searchQuery, usuarios]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterUsuarios.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular total de páginas
  const totalPages = Math.ceil(filterUsuarios.length / itemsPerPage);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const abrirModal = (usuario) => {
    if (usuario) {
      setUsuarioSeleccionado(usuario);
      setNuevoUsuario({
        nombres: usuario.nombres || "",
        apellidos: usuario.apellidos || "",
        correoElectronico: usuario.correoElectronico || "",
        telefono: usuario.telefono || "",
        direccion: usuario.direccion || "",
        rol: usuario.rol || "",
        contraseña: "", 
      });
      console.log(usuario);
    } else {
      setUsuarioSeleccionado(null);
      setNuevoUsuario({
        nombres: "",
        apellidos: "",
        correoElectronico: "",
        telefono: "",
        direccion: "",
        rol: "",
        contraseña: "",
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosParaEnviar = {
      nombres: nuevoUsuario.nombres,
      apellidos: nuevoUsuario.apellidos,
      correoElectronico: nuevoUsuario.correoElectronico,
      telefono: nuevoUsuario.telefono,
      direccion: nuevoUsuario.direccion,
      rol: nuevoUsuario.rol
    };


    if (nuevoUsuario.contraseña) {
      datosParaEnviar.contraseña = nuevoUsuario.contraseña;
    }

    try {
      console.log("Datos a enviar:", datosParaEnviar);
      const resultado = usuarioSeleccionado
        ? await updateUsuario(usuarioSeleccionado.id, datosParaEnviar)
        : await createUsuario(datosParaEnviar);

      if (resultado && (resultado.success || resultado.status === 200 || resultado.status === 201)) {
        setModalOpen(false);
        setUsuarioSeleccionado(null);
        setNuevoUsuario({
          nombres: "",
          apellidos: "",
          correoElectronico: "",
          telefono: "",
          direccion: "",
          rol: "",
          contraseña: "",
        });
        showNotification("Usuario guardado exitosamente");
        console.log("Resultado de la API:", resultado);
        getUsuarios();
      } else {
        console.log("Resultado de la API:", resultado);
        console.log("Error al enviar datos");
        showNotification("Error al guardar usuario", "error");
      }
    } catch (error) {
      console.log(error);
      showNotification("Error al guardar usuario", "error");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setUsuarioSeleccionado(null);
    setNuevoUsuario({
      nombres: "",
      apellidos: "",
      correoElectronico: "",
      telefono: "",
      direccion: "",
      rol: "",
      contraseña: "",
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative overflow-x-auto bg-white h-full border-gray-200 rounded-lg">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          isVisible={notification.isVisible}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-2 px-4 gap-4 h-[15%] xl-plus:h-1/10">
        <div className="relative w-full md:w-1/3 flex items-center">
          <i className="fa-solid left-3 text-zinc-400 absolute fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 pl-10 py-2 border border-zinc-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-rojo"
          />
        </div>
        <div className="flex items-center gap-2 md:w-auto">
          <button
            className="bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition w-full md:w-auto justify-center"
            onClick={() => abrirModal(null)}
          >
            <span className="font-medium">Registrar Usuario</span>
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

      <div className="overflow-x-auto h-[70%] xl-plus:h-8/10 w-full p-6 xl-plus:p-10">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="text-sm text-left text-gray-500 w-full">
            {/* Encabezado */}
            <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4">Nombres</th>
                <th className="px-4 py-3 md:px-6 md:py-4">
                  Correo electronico
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4">Telefono</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Direccion</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Rol</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Accion</th>
              </tr>
            </thead>

            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((usuario) => (
                <tr
                  className="bg-white border-b border-gray-200"
                  key={usuario.id}
                >
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {usuario.nombres || ""} {usuario.apellidos || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {usuario.correoElectronico || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {usuario.telefono || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {usuario.direccion || "Sin asignar"}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">{usuario.rol || ""}</td>
                  <td className="px-4 py-1 text-center">
                    <button
                      onClick={() => abrirModal(usuario)}
                      className="font-bold py-1 px-3 rounded"
                      aria-label="Editar Usuario"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border-t rounded-b-md h-[15%] xl-plus:h-1/10 flex flex-col md:flex-row items-center justify-center p-2 gap-4 px-4">
        <Paginacion currentPage={currentPage} totalPages={totalPages} paginate={paginate} getPageNumbers={getPageNumbers} />
      </div>

      {modalOpen && (
        <RegistroUsuarioForm handleCloseModal={handleCloseModal} usuarioSeleccionado={usuarioSeleccionado} handleSubmit={handleSubmit} handleInputChange={handleInputChange} nuevoUsuario={nuevoUsuario} />
      )}
    </div>
  );
}