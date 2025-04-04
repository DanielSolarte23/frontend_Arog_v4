"use client";
import { useUsuario } from "@/context/UsuarioContext";
import { useState, useEffect, useMemo } from "react";
import LoadingScreen from "../LoadingScreen";
import NotificationModal from "../pruebas/NotificationModal";
import Paginacion from "./Paginacion";
import { usePago } from "@/context/PagosContext";
import FormularioPago from "./FormularioPago";
import DetallesPago from "./DetallesPago";

export default function PagosTabla({ isPago, setisPago }) {
  const {
    pagos,
    getPagos,
    updatePago,
    deletePago,
    getPago,
    createPago,
    error,
    loading,
  } = usePago();

  const [modalOpen, setModalOpen] = useState(false);
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [DetallePago, setDetallePago] = useState(false);
  const [nuevoPago, setNuevoPago] = useState({
    idCliente: "",
    descripcion: "",
    fechaPago: "",
    fechaVencimiento: "",
    montoPago: "",
    montoPagoRealizado: "",
    interesMora: "",
    diasMora: "",
    estadoMora: "",
    metodoPago: "",
    frecuenciaProximoPago: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
    type: "success",
  });

  useEffect(() => {
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

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

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
    getPagos();
  }, []);

  const safeToLowerCase = (value) => {
    return value ? value.toLowerCase() : "";
  };

  const filterPagos = useMemo(() => {
    if (!searchQuery) return pagos || [];
    if (!pagos) return [];

    const lowercaseQuery = searchQuery.toLowerCase();

    return pagos.filter((pago) => {
      if (!pago) return false;

      // Verificar explícitamente si cliente existe y tiene las propiedades nombre y apellido
      const nombreCliente =
        pago.cliente && pago.cliente.nombre
          ? pago.cliente.nombre.toLowerCase()
          : "";
      const apellidoCliente =
        pago.cliente && pago.cliente.apellido
          ? pago.cliente.apellido.toLowerCase()
          : "";
      const nombreCompleto = `${nombreCliente} ${apellidoCliente}`.trim();

      // Convertir valores no string a string antes de buscar
      const descripcion = (pago.descripcion || "").toLowerCase();
      const montoPago = (pago.montoPago || "").toString().toLowerCase();

      return (
        nombreCompleto.includes(lowercaseQuery) ||
        nombreCliente.includes(lowercaseQuery) ||
        apellidoCliente.includes(lowercaseQuery) ||
        descripcion.includes(lowercaseQuery) ||
        montoPago.includes(lowercaseQuery)
      );
    });
  }, [searchQuery, pagos]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterPagos.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular total de páginas
  const totalPages = Math.ceil(filterPagos.length / itemsPerPage);

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
    let processedValue = value;

    if (name === "estadoMora") {
      processedValue = value === "true";
    }

    setNuevoPago((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const abrirModal = (pago) => {
    if (pago) {
      setPagoSeleccionado(pago);
      setNuevoPago({
        idCliente: pago.idCliente || "",
        descripcion: pago.descripcion || "",
        fechaPago: pago.fechaPago || "",
        montoPago: pago.montoPago || "",
        montoPagoRealizado: pago.montoPagoRealizado || "",
        interesMora: pago.interesMora || "",
        diasMora: pago.diasMora || "",
        estadoMora: pago.estadoMora || "",
        metodoPago: pago.metodoPago || "",
      });
      console.log(pago);
    } else {
      setPagoSeleccionado(null);
      setNuevoPago({
        idCliente: "",
        descripcion: "",
        fechaPago: "",
        fechaVencimiento: "",
        montoPago: "",
        montoPagoRealizado: "",
        interesMora: "",
        diasMora: "",
        estadoMora: "",
        metodoPago: "",
      });
    }
    setDetallePago(true);
    // setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosParaEnviar = {
      idCliente: nuevoPago.idCliente,
      descripcion: nuevoPago.descripcion,
      fechaPago: nuevoPago.fechaPago,
      fechaVencimiento: nuevoPago.fechaVencimiento,
      montoPago: nuevoPago.montoPago,
      montoPagoRealizado: nuevoPago.montoPagoRealizado,
      interesMora: nuevoPago.interesMora,
      diasMora: nuevoPago.diasMora,
      estadoMora: nuevoPago.estadoMora,
      metodoPago: nuevoPago.metodoPago,
    };

    try {
      console.log("Datos a enviar:", datosParaEnviar);
      const resultado = pagoSeleccionado
        ? await updatePago(pagoSeleccionado.id, datosParaEnviar)
        : await createPago(datosParaEnviar);

      if (
        resultado &&
        (resultado.success ||
          resultado.status === 200 ||
          resultado.status === 201)
      ) {
        setModalOpen(false);
        setPagoSeleccionado(null);
        setNuevoPago({
          idCliente: "",
          descripcion: "",
          fechaPago: "",
          fechaVencimiento: "",
          montoPago: "",
          montoPagoRealizado: "",
          interesMora: "",
          diasMora: "",
          estadoMora: "",
          metodoPago: "",
        });
        showNotification("Pago registrado exitosamente");
        console.log("Resultado de la API:", resultado);
        getPagos();
      } else {
        console.log("Resultado de la API:", resultado);
        console.log("Error al enviar datos");
        showNotification("Error al guardar pago", "error");
      }
    } catch (error) {
      console.log(error);
      showNotification("Error al guardar pago", "error");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPagoSeleccionado(null);
    setNuevoPago({
      idCliente: "",
      descripcion: "",
      fechaPago: "",
      fechaVencimiento: "",
      montoPago: "",
      montoPagoRealizado: "",
      interesMora: "",
      diasMora: "",
      estadoMora: "",
      metodoPago: "",
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
              {isPago ? "Registrar cliente" : "Registrar pago"}
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
                <th className="px-4 py-3 md:px-6 md:py-4">Cliente</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Descripcion</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Fecha de emision</th>
                <th className="px-4 py-3 md:px-6 md:py-4">
                  Fecha de Vencimiento
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4">Estado de pago</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-center">
                  Dias Mora
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-center">
                  Detalles
                </th>
              </tr>
            </thead>
            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((pago) => (
                <tr className="bg-white border-b border-gray-200" key={pago.id}>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {`${pago.cliente?.nombre} ${pago.cliente?.apellido}` || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {pago.descripcion || ""}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {new Intl.DateTimeFormat("es-CO", {
                      dateStyle: "medium",
                    }).format(new Date(pago.fechaEmision))}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {new Intl.DateTimeFormat("es-CO", {
                      dateStyle: "medium",
                    }).format(new Date(pago.fechaVencimiento))}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    {(() => {
                      if (pago.estadoPago === "pendiente") {
                        return (
                          <span className="bg-red-200 p-2 rounded-md">
                            Pendiente
                          </span>
                        );
                      } else if (pago.estadoPago === "pagadoParcial") {
                        return (
                          <span className="bg-yellow-200 p-2 rounded-md">
                            Pago parcial
                          </span>
                        );
                      } else if (pago.estadoPago === "pagadoTotal") {
                        return (
                          <span className="bg-green-200 p-2 rounded-md  ">
                            Pago total
                          </span>
                        );
                      }
                    })()}
                  </td>

                  <td className="px-4 py-2 md:px-6 md:py-4 text-center">
                    {pago.diasMora}
                  </td>
                  <td className="px-4 py-1 text-center">
                    <button
                      onClick={() => abrirModal(pago)}
                      className="font-bold py-1 px-3 rounded"
                      aria-label="Editar Pago"
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
        <Paginacion
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          getPageNumbers={getPageNumbers}
        />
      </div>

      {DetallePago && (
        <DetallesPago
          handleCloseModal={handleCloseModal}
          pagoSeleccionado={pagoSeleccionado}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          nuevoPago={nuevoPago}
          setDetallePago={setDetallePago}
        />
      )}

      {modalOpen && (
        <FormularioPago
          handleCloseModal={handleCloseModal}
          pagoSeleccionado={pagoSeleccionado}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          nuevoPago={nuevoPago}
        />
      )}
    </div>
  );
}
