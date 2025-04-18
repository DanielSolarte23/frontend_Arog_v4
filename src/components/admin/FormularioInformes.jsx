"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import { useDocumentos } from "@/context/DocumentosContext";

export default function FormularioInforme({ cerrarFormulario, getDocumentoInforme }) {

  const {
    postDocumentos
  } = useDocumentos();

  const [datos, setDatos] = useState({
    tituloInforme: "",
    fechaEmision: new Date().toISOString().split("T")[0],
    autorNombre: "",
    autorCargo: "",
    autorDni: "",
    entidad: "",
    rucEntidad: "",
    tipoInforme: "TECNICO",
    contenidoResumen: "",
    contenidoConclusion: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const generarPDFTecnico = () => {
    const doc = new jsPDF();
    const lineHeight = 7;
    let yPos = 20;

    // Encabezado
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("INFORME TÉCNICO", doc.internal.pageSize.getWidth() / 2, yPos, {
      align: "center",
    });
    yPos += lineHeight * 2;

    // Número de informe
    doc.setFontSize(12);
    doc.text(`INFORME N° ${datos.codigoInforme || "[Por asignar]"}`, 20, yPos);
    yPos += lineHeight * 2;

    // Información del informe
    doc.setFont("helvetica", "normal");
    doc.text(`A: Dirección General`, 20, yPos);
    yPos += lineHeight;

    doc.text(`DE: ${datos.autorNombre} - ${datos.autorCargo}`, 20, yPos);
    yPos += lineHeight;

    doc.text(`ASUNTO: ${datos.tituloInforme}`, 20, yPos);
    yPos += lineHeight;

    doc.text(
      `FECHA: ${new Date(datos.fechaEmision).toLocaleDateString("es-PE")}`,
      20,
      yPos
    );
    yPos += lineHeight * 2;

    // Contenido
    doc.setFont("helvetica", "bold");
    doc.text("I. RESUMEN", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    // Manejar texto largo dividiéndolo en múltiples líneas
    const resumenLines = doc.splitTextToSize(datos.contenidoResumen, 170);
    doc.text(resumenLines, 20, yPos);
    yPos += resumenLines.length * 6 + lineHeight;

    // Conclusiones
    doc.setFont("helvetica", "bold");
    doc.text("II. CONCLUSIONES", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    const conclusionLines = doc.splitTextToSize(datos.contenidoConclusion, 170);
    doc.text(conclusionLines, 20, yPos);
    yPos += conclusionLines.length * 6 + lineHeight * 2;

    // Firma
    yPos = Math.min(yPos, 240); // Asegurar que la firma no esté demasiado abajo
    doc.text("Atentamente,", 20, yPos);
    yPos += lineHeight * 3;

    doc.text("___________________________", 20, yPos);
    yPos += lineHeight;
    doc.text(`${datos.autorNombre}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`${datos.autorCargo}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`DNI: ${datos.autorDni}`, 20, yPos);

    return doc;
  };

  const generarPDFGestion = () => {
    const doc = new jsPDF();
    const lineHeight = 7;
    let yPos = 20;

    // Encabezado
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("INFORME DE GESTIÓN", doc.internal.pageSize.getWidth() / 2, yPos, {
      align: "center",
    });
    yPos += lineHeight * 2;

    // Número de informe
    doc.setFontSize(12);

    doc.text(`INFORME N° ${datos.codigoInforme || "[Por asignar]"}`, 20, yPos);
    yPos += lineHeight * 2;

    // Información del informe
    doc.setFont("helvetica", "normal");
    doc.text(`PARA: Dirección General`, 20, yPos);
    yPos += lineHeight;

    doc.text(`DE: ${datos.autorNombre}`, 20, yPos);
    yPos += lineHeight;

    doc.text(`CARGO: ${datos.autorCargo}`, 20, yPos);
    yPos += lineHeight;

    doc.text(`ASUNTO: ${datos.tituloInforme}`, 20, yPos);
    yPos += lineHeight;

    doc.text(
      `FECHA: ${new Date(datos.fechaEmision).toLocaleDateString("es-PE")}`,
      20,
      yPos
    );
    yPos += lineHeight * 2;

    // Contenido
    doc.setFont("helvetica", "bold");
    doc.text("I. RESUMEN EJECUTIVO", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    const resumenLines = doc.splitTextToSize(datos.contenidoResumen, 170);
    doc.text(resumenLines, 20, yPos);
    yPos += resumenLines.length * 6 + lineHeight;

    // Conclusiones
    doc.setFont("helvetica", "bold");
    doc.text("II. CONCLUSIONES Y RECOMENDACIONES", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    const conclusionLines = doc.splitTextToSize(datos.contenidoConclusion, 170);
    doc.text(conclusionLines, 20, yPos);
    yPos += conclusionLines.length * 6 + lineHeight * 2;

    // Firma
    yPos = Math.min(yPos, 240);
    doc.text("Atentamente,", 20, yPos);
    yPos += lineHeight * 3;

    doc.text("___________________________", 20, yPos);
    yPos += lineHeight;
    doc.text(`${datos.autorNombre}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`${datos.autorCargo}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`${datos.entidad}`, 20, yPos);

    return doc;
  };

  const generarPDFEvaluacion = () => {
    const doc = new jsPDF();
    const lineHeight = 7;
    let yPos = 20;

    // Encabezado
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(
      "INFORME DE EVALUACIÓN",
      doc.internal.pageSize.getWidth() / 2,
      yPos,
      { align: "center" }
    );
    yPos += lineHeight * 2;

    // Número y fecha
    doc.setFontSize(12);

    doc.text(`INFORME N° ${datos.codigoInforme || "[Por asignar]"}`, 20, yPos);
    yPos += lineHeight;

    doc.text(
      `FECHA: ${new Date(datos.fechaEmision).toLocaleDateString("es-PE")}`,
      20,
      yPos
    );
    yPos += lineHeight * 2;

    // Detalles del evaluador
    doc.setFont("helvetica", "bold");
    doc.text("1. DATOS DEL EVALUADOR:", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${datos.autorNombre}`, 30, yPos);
    yPos += lineHeight;

    doc.text(`Cargo: ${datos.autorCargo}`, 30, yPos);
    yPos += lineHeight;

    doc.text(`Institución: ${datos.entidad}`, 30, yPos);
    yPos += lineHeight * 2;

    // Detalles de la evaluación
    doc.setFont("helvetica", "bold");
    doc.text("2. EVALUACIÓN:", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    doc.text(`Título: ${datos.tituloInforme}`, 30, yPos);
    yPos += lineHeight * 2;

    // Contenido
    doc.setFont("helvetica", "bold");
    doc.text("3. RESUMEN DE LA EVALUACIÓN:", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    const resumenLines = doc.splitTextToSize(datos.contenidoResumen, 160);
    doc.text(resumenLines, 30, yPos);
    yPos += resumenLines.length * 6 + lineHeight;

    // Conclusiones
    doc.setFont("helvetica", "bold");
    doc.text("4. CONCLUSIONES Y RECOMENDACIONES:", 20, yPos);
    yPos += lineHeight;

    doc.setFont("helvetica", "normal");
    const conclusionLines = doc.splitTextToSize(datos.contenidoConclusion, 160);
    doc.text(conclusionLines, 30, yPos);
    yPos += conclusionLines.length * 6 + lineHeight * 2;

    // Firma
    yPos = Math.min(yPos, 240);
    doc.text("Firma del evaluador:", 20, yPos);
    yPos += lineHeight * 3;

    doc.text("___________________________", 20, yPos);
    yPos += lineHeight;
    doc.text(`${datos.autorNombre}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`DNI: ${datos.autorDni}`, 20, yPos);

    return doc;
  };

  const generarPDF = () => {
    switch (datos.tipoInforme) {
      case "TECNICO":
        return generarPDFTecnico();
      case "GESTION":
        return generarPDFGestion();
      case "EVALUACION":
        return generarPDFEvaluacion();
      default:
        return generarPDFTecnico();
    }
  };

  const handlePreview = () => {
    const pdfDoc = generarPDF();
    const pdfDataUri = pdfDoc.output("datauristring");
    setPreviewUrl(pdfDataUri);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Generar el PDF según el tipo seleccionado
      const pdfDoc = generarPDF();
      const pdfBlob = pdfDoc.output("blob");

      const formData = new FormData();

      formData.append(
        "file",
        pdfBlob,
        `informe_${datos.tipoInforme.toLowerCase()}_${Date.now()}.pdf`
      );

      formData.append("tipoDocumento", "INFORME");
      formData.append("subtipoCertificado", datos.tipoInforme);

      // Enviar con axios
      const response = await axios.post(
        "https://backend-arog-v4.onrender.com/api/documentos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Informe subido exitosamente");
      cerrarFormulario();
      setPreviewUrl(null);
      getDocumentoInforme(); // Actualizar la lista de informes
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al subir el informe:", error);
      let errorMsg = "Error al procesar la solicitud";

      if (error.response) {
        errorMsg = error.response.data.error || errorMsg;
        console.log("Detalles del error:", error.response.data);
      }

      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-white max-w-screen-md mx-auto p-4 max-h-[800px] overflow-y-auto rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Generar Informes</h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded ${message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
              }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tipo de informe
            </label>
            <select
              name="tipoInforme"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              value={datos.tipoInforme}
            >
              <option value="TECNICO">Informe Técnico</option>
              <option value="GESTION">Informe de Gestión</option>
              <option value="EVALUACION">Informe de Evaluación</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="tituloInforme"
              onChange={handleChange}
              placeholder="Título del informe"
              className="border p-2 rounded"
              required
              value={datos.tituloInforme}
            />
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Fecha de emisión</label>
              <input
                type="date"
                name="fechaEmision"
                onChange={handleChange}
                className="border p-2 rounded"
                required
                value={datos.fechaEmision}
              />
            </div>

            <input
              name="autorNombre"
              onChange={handleChange}
              placeholder="Nombre del autor"
              className="border p-2 rounded"
              required
              value={datos.autorNombre}
            />

            <input
              name="autorCargo"
              onChange={handleChange}
              placeholder="Cargo del autor"
              className="border p-2 rounded"
              required
              value={datos.autorCargo}
            />

            <input
              name="autorDni"
              onChange={handleChange}
              placeholder="Docuemento del autor"
              className="border p-2 rounded"
              required
              value={datos.autorDni}
            />

            <input
              name="entidad"
              onChange={handleChange}
              placeholder="Entidad/Empresa"
              className="border p-2 rounded"
              required
              value={datos.entidad}
            />

            <input
              name="rucEntidad"
              onChange={handleChange}
              placeholder="NIT entidad"
              className="border p-2 rounded"
              required
              value={datos.rucEntidad}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Resumen/Contenido principal
            </label>
            <textarea
              name="contenidoResumen"
              onChange={handleChange}
              placeholder="Ingrese el contenido principal del informe..."
              className="w-full border p-2 rounded h-32"
              required
              value={datos.contenidoResumen}
            ></textarea>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">
              Conclusiones/Recomendaciones
            </label>
            <textarea
              name="contenidoConclusion"
              onChange={handleChange}
              placeholder="Ingrese las conclusiones y/o recomendaciones..."
              className="w-full border p-2 rounded h-32"
              required
              value={datos.contenidoConclusion}
            ></textarea>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
              disabled={loading}
              onClick={cerrarFormulario}
            >
              cancelar
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Previsualizar PDF
            </button>

            <button
              type="submit"
              className="bg-verde text-white py-2 px-4 rounded hover:bg-verde"
              disabled={loading}
            >
              {loading ? "Subiendo..." : "Generar y subir PDF"}
            </button>
          </div>
        </form>

        {previewUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Previsualización:</h3>
            <div className="border rounded p-2">
              <iframe
                src={previewUrl}
                style={{ width: "100%", height: "500px" }}
                title="Vista previa del PDF"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
