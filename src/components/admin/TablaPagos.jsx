"use client";
import { useUsuario } from "@/context/UsuarioContext";
import { useState, useEffect, useMemo } from "react";
import LoadingScreen from "../LoadingScreen";
import NotificationModal from "../pruebas/NotificationModal";
import Paginacion from "./Paginacion";
import { usePago } from "@/context/PagosContext";
import FormularioPago from "./FormularioPago";
import DetallesPago from "./DetallesPago";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import dynamic from "next/dynamic";
import FacturaPagoModal from "./FacturaPagoModal";
import Link from "next/link";
import TransaccionDetalle from "./TablaTransacciones";

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
  const [transaccionOpen, setTransaccionOpen] = useState(false);
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [DetallePago, setDetallePago] = useState(false);
  const [nuevoPago, setNuevoPago] = useState({
    idCliente: "",
    descripcion: "",
    fechaVencimiento: "",
    montoPago: "",
    // montoPagoRealizado: "",
    // interesMora: "",
    // diasMora: "",
    // estadoMora: "",
    // metodoPago: "",
    // frecuenciaProximoPago: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
    type: "success",
  });
  const [facturaModalOpen, setFacturaModalOpen] = useState(false);

  const abrirModalFactura = (pago) => {
    setPagoSeleccionado(pago);
    setFacturaModalOpen(true);
  };

  const handleDescargarFactura = () => {
    generarPDF(pagoSeleccionado);
  };

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
        // interesMora: pago.interesMora || "",
        // diasMora: pago.diasMora || "",
        // estadoMora: pago.estadoMora || "",
        // metodoPago: pago.metodoPago || "",
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
        // montoPagoRealizado: "",
        // interesMora: "",
        // diasMora: "",
        // estadoMora: "",
        // metodoPago: "",
      });
    }
    // setDetallePago(true);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosParaEnviar = {
      idCliente: nuevoPago.idCliente,
      descripcion: nuevoPago.descripcion,
      fechaPago: nuevoPago.fechaPago,
      fechaVencimiento: nuevoPago.fechaVencimiento,
      montoPago: nuevoPago.montoPago,
      // montoPagoRealizado: nuevoPago.montoPagoRealizado,
      // interesMora: nuevoPago.interesMora,
      // diasMora: nuevoPago.diasMora,
      // estadoMora: nuevoPago.estadoMora,
      // metodoPago: nuevoPago.metodoPago,
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
          // montoPagoRealizado: "",
          // interesMora: "",
          // diasMora: "",
          // estadoMora: "",
          // metodoPago: "",
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
      // montoPagoRealizado: "",
      // interesMora: "",
      // diasMora: "",
      // estadoMora: "",
      // metodoPago: "",
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const generarPDF = async () => {
    if (!pagoSeleccionado) return;

    // Importación dinámica de jsPDF y autoTable
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    doc.setFont("helvetica");

    // URL de tu logo (ajusta según tu proyecto)
    const imgUrl = "/ArogV2.png"; // Cambia esto por la ruta de tu logo

    const img = new Image();
    img.crossOrigin = "Anonymous"; // Importante para CORS

    const addImageToPdf = () => {
      return new Promise((resolve) => {
        img.onload = () => {
          resolve();
        };
        img.src = imgUrl;
      });
    };

    const generatePdfWithImage = async () => {
      try {
        await addImageToPdf();

        const pageWidth = doc.internal.pageSize.width;
        const imgWidth = 40;
        const imgHeight = 40;
        const imgX = (pageWidth - imgWidth) / 2;

        // Añadir logo
        doc.addImage(img, "PNG", imgX, 10, imgWidth, imgHeight);

        // Encabezado centrado
        doc.setFontSize(20);
        doc.text("Resumen de Tu Factura", pageWidth / 2, 70, {
          align: "center",
        });

        // Subtítulo centrado
        doc.setFontSize(12);
        doc.text("Detalle de Transacción", pageWidth / 2, 80, {
          align: "center",
        });

        // Detalles del pago
        const startY = 100;
        const leftMargin = 20;
        const lineHeight = 7;

        doc.setFont("helvetica", "bold");
        doc.text("Información del Pago:", leftMargin, startY);

        doc.setFont("helvetica", "normal");
        doc.text(
          `Cliente: ${pagoSeleccionado.cliente.nombre} ${pagoSeleccionado.cliente.apellido}`,
          leftMargin,
          startY + lineHeight
        );

        doc.text(
          `Descripción: ${pagoSeleccionado.descripcion}`,
          leftMargin,
          startY + lineHeight * 2
        );

        doc.text(
          `Monto Total: $${pagoSeleccionado.montoPago.toLocaleString()}`,
          leftMargin,
          startY + lineHeight * 3
        );

        doc.text(
          `Fecha de Emisión: ${new Date(
            pagoSeleccionado.fechaEmision
          ).toLocaleDateString()}`,
          leftMargin,
          startY + lineHeight * 4
        );

        doc.text(
          `Fecha de Vencimiento: ${new Date(
            pagoSeleccionado.fechaVencimiento
          ).toLocaleDateString()}`,
          leftMargin,
          startY + lineHeight * 5
        );

        doc.text(
          `Estado: ${pagoSeleccionado.estadoPago}`,
          leftMargin,
          startY + lineHeight * 6
        );

        // Desglose de conceptos
        const desglose = [
          ["Concepto", "Valor"],
          ["Monto Original", `$${pagoSeleccionado.montoPago.toLocaleString()}`],
          [
            "Monto Pagado",
            `$${pagoSeleccionado.montoPagoRealizado?.toLocaleString() || "0"}`,
          ],
          ["Días de Mora", pagoSeleccionado.diasMora || "0"],
          [
            "Interés de Mora",
            `$${pagoSeleccionado.interesMora?.toLocaleString() || "0"}`,
          ],
        ];

        autoTable(doc, {
          startY: startY + lineHeight * 8,
          head: [desglose[0]],
          body: desglose.slice(1),
          theme: "grid",
          headStyles: { fillColor: [114, 170, 0] }, // Color personalizable
          styles: {
            halign: "center",
            fontSize: 12,
          },
          margin: { left: 20, right: 20 },
        });

        // Pie de página centrado
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.text(
          "Comprobante generado electrónicamente",
          pageWidth / 2,
          pageHeight - 30,
          { align: "center" }
        );
        doc.text(
          "Agradecemos su preferencia.",
          pageWidth / 2,
          pageHeight - 20,
          { align: "center" }
        );

        // Guardar el PDF
        const fileName = `Factura_${pagoSeleccionado.cliente.nombre}_${
          new Date().toISOString().split("T")[0]
        }.pdf`;
        doc.save(fileName);
      } catch (error) {
        console.error("Error generando PDF:", error);
      }
    };

    generatePdfWithImage();
  };

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
      {facturaModalOpen && (
        <FacturaPagoModal
          pago={pagoSeleccionado}
          onClose={() => {
            setFacturaModalOpen(false);
            setPagoSeleccionado(null);
          }}
          onEdit={() => {
            setFacturaModalOpen(false);
            abrirModal(pagoSeleccionado);
          }}
          onDownloadPDF={handleDescargarFactura}
        />
      )}

      {transaccionOpen && <TransaccionDetalle />}

      <nav className="bg-white border-b border-b-gray-200 flex flex-col md:flex-row items-center justify-between py-3 px-4 gap-3 h-auto md:h-[15%] xl-plus:h-1/10">
  {/* Barra de búsqueda */}
  <div className="relative w-full md:w-1/3 flex items-center">
    <i className="fa-solid left-3 text-zinc-400 absolute fa-magnifying-glass"></i>
    <input
      type="search"
      placeholder="Buscar pagos..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="px-3 pl-10 py-2 border border-zinc-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
    />
  </div>
  
  {/* Grupo de botones */}
  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
    {/* Botones de filtro adaptados para mejor tacto en móvil */}
    <div className="flex items-center gap-2 w-full md:w-auto">
      <button
        className={`flex-1 md:flex-auto border py-2 px-3 md:p-2 rounded-lg text-verde-dos flex items-center justify-center gap-1 transition ${
          isPago ? "bg-white hover:bg-lime-50" : "bg-lime-600 text-white"
        }`}
        onClick={() => setisPago(false)}
      >
        <span className="font-medium text-sm md:text-base">Pagos</span>
      </button>
      <button
        className={`flex-1 md:flex-auto border py-2 px-3 md:p-2 rounded-lg flex items-center justify-center gap-1 transition ${
          !isPago
            ? "bg-white text-verde-dos hover:bg-lime-100"
            : "bg-verde text-white"
        }`}
        onClick={() => setisPago(true)}
      >
        <span className="font-medium text-sm md:text-base">Clientes</span>
      </button>
    </div>
    
    {/* Botón de añadir */}
    <button
      className="bg-lime-600 py-2 px-3 md:p-2 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-lime-700 transition w-full md:w-auto mt-1 md:mt-0"
      onClick={() => abrirModal(null)}
    >
      <span className="font-medium text-sm md:text-base">
        {isPago ? "Registrar cliente" : "Registrar pago"}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-4 h-4 fill-white"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
      </svg>
    </button>
  </div>
</nav>

      <div className="overflow-x-auto h-[70%] xl-plus:h-8/10 w-full p-6 xl-plus:p-10">
        {/* Vista de tabla para pantallas medianas y grandes */}
        <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
          <table className="text-left text-gray-500 w-full">
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
                <th className="px-4 py-3 md:px-6 md:py-4 text-center">
                  transacciones
                </th>
              </tr>
            </thead>
            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200 text-xs xl-plus:text-base">
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
                          <span className="bg-yellow-200 p-2 rounded-md whitespace-nowrap">
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
                  <td className="px-4 py-1 text-center space-x-2">
                    <button
                      onClick={() => abrirModalFactura(pago)}
                      className="font-bold py-1 px-3 rounded"
                      aria-label="Ver Factura"
                    >
                      <i className="fa-solid fa-file-invoice"></i>
                    </button>
                  </td>
                  <td className="px-4 py-1 text-center space-x-2">
                    <button className="font-bold py-1 px-3 rounded">
                      <i className="fa-solid fa-right-left"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista de tarjetas para móviles */}
        <div className="md:hidden space-y-4">
          {currentItems.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No se encontraron pagos
            </div>
          ) : (
            currentItems.map((pago) => (
              <div
                key={pago.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">
                    {`${pago.cliente?.nombre} ${pago.cliente?.apellido}` ||
                      "Sin cliente"}
                  </h3>
                  {(() => {
                    if (pago.estadoPago === "pendiente") {
                      return (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md">
                          Pendiente
                        </span>
                      );
                    } else if (pago.estadoPago === "pagadoParcial") {
                      return (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                          Pago parcial
                        </span>
                      );
                    } else if (pago.estadoPago === "pagadoTotal") {
                      return (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">
                          Pago total
                        </span>
                      );
                    }
                  })()}
                </div>

                <div className="space-y-2 text-sm">
                  {pago.descripcion && (
                    <div className="text-gray-600 mb-2">{pago.descripcion}</div>
                  )}

                  <div className="grid grid-cols-3 gap-1">
                    <span className="font-medium">Emisión:</span>
                    <span className="col-span-2 text-gray-600">
                      {new Intl.DateTimeFormat("es-CO", {
                        dateStyle: "medium",
                      }).format(new Date(pago.fechaEmision))}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <span className="font-medium">Vencimiento:</span>
                    <span className="col-span-2 text-gray-600">
                      {new Intl.DateTimeFormat("es-CO", {
                        dateStyle: "medium",
                      }).format(new Date(pago.fechaVencimiento))}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <span className="font-medium">Monto:</span>
                    <span className="col-span-2 text-gray-600">
                      ${pago.montoPago?.toLocaleString() || "0"}
                    </span>
                  </div>

                  {pago.diasMora > 0 && (
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-medium">Días mora:</span>
                      <span className="col-span-2 text-red-600 font-medium">
                        {pago.diasMora}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    onClick={() => abrirModalFactura(pago)}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 text-sm flex items-center gap-1"
                  >
                    <i className="fa-solid fa-file-invoice text-xs"></i>
                    <span>Factura</span>
                  </button>
                  <button className="bg-verde-dos px-3 py-1 rounded text-white text-sm flex items-center gap-1">
                    <i className="fa-solid fa-right-left text-xs"></i>
                    <span>Transacciones</span>
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
