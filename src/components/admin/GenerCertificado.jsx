"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";

export default function FormularioCertificado({ cerrarFormulario }) {
  const [datos, setDatos] = useState({
    nombreTrabajador: "",
    dniTrabajador: "",
    cargo: "",
    fechaInicio: "",
    fechaFin: "",
    nombreEmpresa: "",
    rucEmpresa: "",
    nombreJefe: "",
    dniJefe: "",
    subtipoCertificado: "LABORAL", // Valor por defecto
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const generarPDFLaboral = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("CERTIFICADO DE TRABAJO", 60, 20);

    doc.setFontSize(12);
    doc.text(
      `El Sr. ${datos.nombreJefe}, identificado con DNI NO ${datos.dniJefe},`,
      20,
      40
    );
    doc.text(
      `Gerente General de ${datos.nombreEmpresa}, con RUC ${datos.rucEmpresa},`,
      20,
      50
    );
    doc.text("CERTIFICA:", 90, 60);
    doc.text(
      `Que, el Sr. ${datos.nombreTrabajador}, identificado con DNI NO ${datos.dniTrabajador},`,
      20,
      70
    );
    doc.text(
      `ha laborado en nuestra empresa como ${datos.cargo.toUpperCase()},`,
      20,
      80
    );
    doc.text(
      `durante el periodo comprendido desde el ${datos.fechaInicio} hasta el ${datos.fechaFin},`,
      20,
      90
    );
    doc.text(
      `demostrando durante su permanencia responsabilidad, honestidad y`,
      20,
      100
    );
    doc.text(`dedicación en las labores que le fueron encomendadas.`, 20, 110);

    doc.text(
      `Se expide el presente certificado a solicitud del interesado`,
      20,
      130
    );
    doc.text(`para los fines que considere pertinentes.`, 20, 140);

    doc.text(`Lima, ${new Date().toLocaleDateString("es-PE")}`, 120, 160);

    doc.text(`___________________________`, 120, 180);
    doc.text(`${datos.nombreJefe}`, 130, 190);
    doc.text(`Gerente General`, 130, 200);

    return doc;
  };

  const generarPDFParticipacion = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("CERTIFICADO DE PARTICIPACIÓN CIUDADANA", 30, 20);

    doc.setFontSize(12);
    doc.text(`Por medio del presente, ${datos.nombreEmpresa},`, 20, 40);
    doc.text(
      `representada por ${datos.nombreJefe}, con DNI N° ${datos.dniJefe},`,
      20,
      50
    );
    doc.text("CERTIFICA:", 90, 60);
    doc.text(
      `Que, ${datos.nombreTrabajador}, identificado con DNI N° ${datos.dniTrabajador},`,
      20,
      70
    );
    doc.text(
      `ha participado activamente en el programa "${datos.cargo}",`,
      20,
      80
    );
    doc.text(
      `llevado a cabo desde el ${datos.fechaInicio} hasta el ${datos.fechaFin},`,
      20,
      90
    );
    doc.text(
      `demostrando compromiso, responsabilidad social y espíritu comunitario.`,
      20,
      100
    );

    doc.text(
      `Se expide el presente certificado como reconocimiento a su valiosa`,
      20,
      120
    );
    doc.text(`participación y contribución a nuestra comunidad.`, 20, 130);

    doc.text(`Lima, ${new Date().toLocaleDateString("es-PE")}`, 120, 160);

    doc.text(`___________________________`, 120, 180);
    doc.text(`${datos.nombreJefe}`, 130, 190);
    doc.text(`Director de Programas Comunitarios`, 110, 200);

    return doc;
  };

  const generarPDFConocimiento = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("CERTIFICADO DE CONOCIMIENTO", 50, 20);

    doc.setFontSize(12);
    doc.text(`${datos.nombreEmpresa}, con RUC ${datos.rucEmpresa},`, 20, 40);
    doc.text(
      `a través de su representante, ${datos.nombreJefe}, con DNI N° ${datos.dniJefe},`,
      20,
      50
    );
    doc.text("CERTIFICA:", 90, 60);
    doc.text(
      `Que, ${datos.nombreTrabajador}, identificado con DNI N° ${datos.dniTrabajador},`,
      20,
      70
    );
    doc.text(
      `ha completado satisfactoriamente el curso de "${datos.cargo}"`,
      20,
      80
    );
    doc.text(
      `realizado desde el ${datos.fechaInicio} hasta el ${datos.fechaFin},`,
      20,
      90
    );
    doc.text(`con una duración total de 40 horas académicas.`, 20, 100);

    doc.text(
      `El participante ha demostrado dominio de los contenidos`,
      20,
      120
    );
    doc.text(
      `y las competencias requeridas para la aprobación del curso.`,
      20,
      130
    );

    doc.text(`Lima, ${new Date().toLocaleDateString("es-PE")}`, 120, 160);

    doc.text(`___________________________`, 120, 180);
    doc.text(`${datos.nombreJefe}`, 130, 190);
    doc.text(`Director Académico`, 130, 200);

    return doc;
  };

  const generarPDF = () => {
    switch (datos.subtipoCertificado) {
      case "LABORAL":
        return generarPDFLaboral();
      case "PARTICIPACION":
        return generarPDFParticipacion();
      case "CONOCIMIENTO":
        return generarPDFConocimiento();
      default:
        return generarPDFLaboral();
    }
  };

  const handlePreview = () => {
    // Generar el PDF para previsualización
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

      // Crear FormData
      const formData = new FormData();

      formData.append(
        "file",
        pdfBlob,
        `certificado_${datos.subtipoCertificado.toLowerCase()}.pdf`
      );
      formData.append("tipoDocumento", "CERTIFICADO");
      formData.append("subtipoCertificado", datos.subtipoCertificado);
      formData.append("referenciaId", datos.dniTrabajador);

      // Ver lo que se está enviando (para depuración)
      console.log("Enviando datos:", {
        file: `certificado_${datos.subtipoCertificado.toLowerCase()}.pdf (${
          pdfBlob.size
        } bytes)`,
        tipoDocumento: "CERTIFICADO",
        subtipoCertificado: datos.subtipoCertificado,
        referenciaId: datos.dniTrabajador,
      });

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

      setMessage("Certificado subido exitosamente");
      cerrarFormulario();
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al subir el certificado:", error);
      let errorMsg = "Error al procesar la solicitud";

      if (error.response) {
        // Si hay una respuesta del servidor con mensaje de error
        errorMsg = error.response.data.error || errorMsg;
        console.log("Detalles del error:", error.response.data);
      }

      setMessage(`Error: ${errorMsg}`);
      cerrarFormulario();
    } finally {
      setLoading(false);
    }
  };

  // Adaptar el formulario según el tipo de certificado
  const renderFormFields = () => {
    const commonFields = (
      <>
        <input
          name="nombreTrabajador"
          onChange={handleChange}
          placeholder="Nombre del participante/trabajador"
          className="border p-2 rounded"
          required
          value={datos.nombreTrabajador}
        />
        <input
          name="dniTrabajador"
          onChange={handleChange}
          placeholder="DNI del participante/trabajador"
          className="border p-2 rounded"
          required
          value={datos.dniTrabajador}
        />
      </>
    );

    // Campo específico según el tipo de certificado
    let cargoPlaceholder = "Cargo";
    if (datos.subtipoCertificado === "PARTICIPACION") {
      cargoPlaceholder = "Nombre del programa o proyecto";
    } else if (datos.subtipoCertificado === "CONOCIMIENTO") {
      cargoPlaceholder = "Nombre del curso o capacitación";
    }

    return (
      <>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tipo de certificado
          </label>
          <select
            name="subtipoCertificado"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            value={datos.subtipoCertificado}
          >
            <option value="LABORAL">Certificado Laboral</option>
            <option value="PARTICIPACION">
              Certificado de Participación Ciudadana
            </option>
            <option value="CONOCIMIENTO">Certificado de Conocimiento</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonFields}

          <input
            name="cargo"
            onChange={handleChange}
            placeholder={cargoPlaceholder}
            className="border p-2 rounded"
            required
            value={datos.cargo}
          />

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Fecha de inicio</label>
            <input
              type="date"
              name="fechaInicio"
              onChange={handleChange}
              className="border p-2 rounded"
              required
              value={datos.fechaInicio}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Fecha de fin</label>
            <input
              type="date"
              name="fechaFin"
              onChange={handleChange}
              className="border p-2 rounded"
              required
              value={datos.fechaFin}
            />
          </div>

          <input
            name="nombreEmpresa"
            onChange={handleChange}
            placeholder="Nombre de la empresa/institución"
            className="border p-2 rounded"
            required
            value={datos.nombreEmpresa}
          />

          <input
            name="rucEmpresa"
            onChange={handleChange}
            placeholder="RUC de la empresa/institución"
            className="border p-2 rounded"
            required
            value={datos.rucEmpresa}
          />

          <input
            name="nombreJefe"
            onChange={handleChange}
            placeholder="Nombre del firmante"
            className="border p-2 rounded"
            required
            value={datos.nombreJefe}
          />

          <input
            name="dniJefe"
            onChange={handleChange}
            placeholder="DNI del firmante"
            className="border p-2 rounded"
            required
            value={datos.dniJefe}
          />
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="mx-auto p-4 bg-white rounded-lg max-h-[800px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Generar Certificados</h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          {renderFormFields()}

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={cerrarFormulario}
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Cancelar
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
