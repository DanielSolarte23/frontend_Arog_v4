"use client";
import { useState, useEffect, useMemo } from "react";
import LoadingScreen from "../LoadingScreen";
import NotificationModal from "../pruebas/NotificationModal";
import Paginacion from "./Paginacion";
import { useCliente } from "@/context/ClienteContext";
import FormularioMultiPaso from "./FormCliente"; // Importamos el componente corregido

export default function ClientesTabla({ isPago, setisPago }) {
  const {
    clientes,
    getClientes,
    updateCliente,
    deleteCliente,
    getcliente,
    createCliente,
    error,
    loading,
  } = useCliente();

  const [modalOpen, setModalOpen] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  // Estado para plan de pago
  const [tienePlan, setTienePlan] = useState(false);
  const [planPago, setPlanPago] = useState({
    descripcion: "",
    montoPeriodico: "",
    diaPago: "",
    periodicidad: "",
    fechaInicio: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
    type: "success",
  });

  useEffect(() => {
    // Verificamos que estamos en el cliente
    if (typeof window !== 'undefined') {
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
  
      // Limpiar el event listener cuando el componente se desmonte
      return () => window.removeEventListener("resize", updateItemsPerPage);
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta
  

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

  useEffect(() => {
    getClientes();
  }, []);

  const filterClientes = useMemo(() => {
    if (!searchQuery) return clientes || [];
    if (!clientes) return [];

    const lowercaseQuery = searchQuery.toLowerCase();

    return clientes.filter((cliente) => {
      if (!cliente) return false;

      const nombreCompleto =
        `${cliente.nombre} ${cliente.apellido}`.toLowerCase();
      const nombreCliente = cliente.nombre?.toLowerCase() || "";
      const apellidoCliente = cliente.apellido?.toLowerCase() || "";
      const correoCliente = cliente.correo?.toLowerCase() || "";
      const telefonoCliente = cliente.telefono?.toLowerCase() || "";
      const direccionCliente = cliente.direccion?.toLowerCase() || "";

      return (
        nombreCompleto.includes(lowercaseQuery) ||
        nombreCliente.includes(lowercaseQuery) ||
        apellidoCliente.includes(lowercaseQuery) ||
        correoCliente.includes(lowercaseQuery) ||
        telefonoCliente.includes(lowercaseQuery) ||
        direccionCliente.includes(lowercaseQuery)
      );
    });
  }, [searchQuery, clientes]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterClientes.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular total de páginas
  const totalPages = Math.ceil(filterClientes.length / itemsPerPage);

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
    setNuevoCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar cambios en el plan de pago
  const handleChangePlan = (e) => {
    const { name, value } = e.target;
    setPlanPago((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar cambio del checkbox
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setTienePlan(checked);
  };

  const abrirModal = (cliente) => {
    if (cliente) {
      setClienteSeleccionado(cliente);
      setNuevoCliente({
        nombre: cliente.nombre || "",
        apellido: cliente.apellido || "",
        correo: cliente.correo || "",
        telefono: cliente.telefono || "",
        direccion: cliente.direccion || "",
      });

      // Verificar si el cliente tiene plan de pago
      if (cliente.planPago) {
        setTienePlan(true);
        setPlanPago({
          descripcion: cliente.planPago.descripcion || "",
          montoPeriodico: cliente.planPago.montoPeriodico || "",
          diaPago: cliente.planPago.diaPago || "",
          periodicidad: cliente.planPago.periodicidad || "",
          fechaInicio: cliente.planPago.fechaInicio || "",
        });
      } else {
        setTienePlan(false);
        setPlanPago({
          descripcion: "",
          montoPeriodico: "",
          diaPago: "",
          periodicidad: "",
          fechaInicio: "",
        });
      }

      console.log(cliente);
    } else {
      setClienteSeleccionado(null);
      setNuevoCliente({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        direccion: "",
      });
      setTienePlan(false);
      setPlanPago({
        descripcion: "",
        montoPeriodico: "",
        diaPago: "",
        periodicidad: "",
        fechaInicio: "",
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const datosParaEnviar = {
        nombre: nuevoCliente.nombre,
        apellido: nuevoCliente.apellido,
        correo: nuevoCliente.correo,
        telefono: nuevoCliente.telefono,
        direccion: nuevoCliente.direccion,
      };
      if (tienePlan) {
        // Formatear la fecha del plan si existe
        let planFechaISO = "";
        if (planPago.fechaInicio) {
          const planFecha = new Date(planPago.fechaInicio);
          planFechaISO = planFecha.toISOString().slice(0, 19) + ".000Z";
        }

        datosParaEnviar.planPago = {
          descripcion: planPago.descripcion,
          montoPeriodico: planPago.montoPeriodico,
          diaPago: planPago.diaPago,
          periodicidad: planPago.periodicidad,
          fechaInicio: planFechaISO,
        };
      }

      console.log("Datos a enviar:", datosParaEnviar);

      const resultado = clienteSeleccionado
        ? await updateCliente(clienteSeleccionado.id, datosParaEnviar)
        : await createCliente(datosParaEnviar);

      if (
        resultado &&
        (resultado.success ||
          resultado.status === 200 ||
          resultado.status === 201)
      ) {
        setModalOpen(false);
        setClienteSeleccionado(null);
        setNuevoCliente({
          nombre: "",
          apellido: "",
          correo: "",
          telefono: "",
          direccion: "",
        });
        setPlanPago({
          descripcion: "",
          montoPeriodico: "",
          diaPago: "",
          periodicidad: "",
          fechaInicio: "",
        });
        setTienePlan(false);
        showNotification(
          clienteSeleccionado
            ? "Cliente actualizado exitosamente"
            : "Cliente registrado exitosamente"
        );
        console.log("Resultado de la API:", resultado);
        getClientes();
      } else {
        console.log("Resultado de la API:", resultado);
        console.log("Error al enviar datos");
        showNotification("Error al guardar cliente", "error");
      }
    } catch (error) {
      console.log(error);
      showNotification("Error al guardar cliente", "error");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setClienteSeleccionado(null);
    setNuevoCliente({
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
    });
    setPlanPago({
      descripcion: "",
      montoPeriodico: "",
      diaPago: "",
      periodicidad: "",
      fechaInicio: "",
    });
    setTienePlan(false);
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
            className="px-3 pl-10 py-2 border border-zinc-300 rounded-md w-full focus:outline-none  focus:ring-zinc-300"
          />
        </div>
        <div className="flex items-center gap-2 md:w-auto">
          <button
            className={` border p-2 rounded-lg text-verde-dos flex items-center gap-2  transition w-full md:w-auto justify-center px-4 ${
              isPago ? "bg-white hover:bg-lime-50" : "bg-lime-600 text-white"
            }`}
            onClick={() => setisPago(false)}
          >
            Pagos
          </button>
          <button
            className={`border p-2 rounded-lg text-verde-dos flex items-center gap-2 transition w-full md:w-auto justify-center px-4 ${
              !isPago
                ? "bg-white-600 text-verde-dos hover:bg-lime-100"
                : "bg-verde text-white"
            }`}
            onClick={() => setisPago(true)}
          >
            Clientes
          </button>
          <button
            className="bg-lime-600 p-2 rounded-lg text-white flex items-center gap-2 hover:bg-lime-700 transition w-full md:w-auto justify-center"
            onClick={() => abrirModal(null)}
          >
            <span className="font-medium">
              {isPago ? "Registrar cliente" : "Registrar cliente"}
            </span>
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
                <th className="px-4 py-3 md:px-6 md:py-4">Correo</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Telefono</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Direccion</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Estado Pago</th>
                {/* <th className="px-4 py-3 md:px-6 md:py-4">Fecha Pago</th> */}
                <th className="px-4 py-3 md:px-6 md:py-4 text-center">
                  Detalles
                </th>
              </tr>
            </thead>

            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((cliente) => (
                <tr
                  className="bg-white border-b border-gray-200"
                  key={cliente.id}
                >
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {`${cliente.nombre} ${cliente.apellido}` || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {cliente.correo || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {cliente.telefono || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {cliente.direccion || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {cliente.pagos?.saldoPendiente || "sin pagos pendientes"}
                  </td>
                  {/* <td className="px-4 py-2 md:px-6 md:py-4">{cliente.pagos?.estadoMora === true ? (<span className="bg-red-200 p-1 rounded-lg">En mora</span>) : (<span className="bg-green-200 p-1 rounded-lg">Al dia</span>) || "Sin pagos"}</td> */}

                  <td className="px-4 py-1 text-center">
                    <button
                      onClick={() => abrirModal(cliente)}
                      className="font-bold py-1 px-3 rounded"
                      aria-label="Editar Usuario"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <FormularioMultiPaso
              cliente={nuevoCliente}
              setCliente={setNuevoCliente}
              tienePlan={tienePlan}
              setTienePlan={setTienePlan}
              planPago={planPago}
              setPlanPago={setPlanPago}
              onClose={handleCloseModal}
              onSubmit={handleSubmit}
              isEditing={!!clienteSeleccionado}
            />
          </div>
        </div>
      )}
    </div>
  );
}
