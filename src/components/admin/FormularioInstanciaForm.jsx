"use client";
import { useState } from "react";

export default function FormularioInstanciaForm({ formularioTipo, setModalRespuesta }) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [valores, setValores] = useState({});

  const manejarCambio = (campoId, valor) => {
    setValores({ ...valores, [campoId]: valor });
  };

  const enviarFormulario = async () => {
    const data = {
      formularioTipoId: tipoSeleccionado.id,
      titulo: `Formulario - ${tipoSeleccionado.nombre}`,
      descripcion: "",
      creadorId: 1,
      valores: Object.keys(valores).map((id) => ({
        campoFormularioId: Number(id),
        valor: valores[id],
      })),
    };

    await fetch("http://localhost:3002/api/formularios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Formulario enviado.");
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Llenar Formulario</h2>
      <select
        className="border px-2 py-3 w-full mt-2 rounded-md outline-none"
        onChange={(e) =>
          setTipoSeleccionado(
            formularioTipo.find((tipo) => tipo.id == e.target.value)
          )
        }
      >
        <option value="">Selecciona un tipo</option>
        {formularioTipo.map((tipo) => (
          <option key={tipo.id} value={tipo.id}>
            {tipo.nombre}
          </option>
        ))}
      </select>

      {tipoSeleccionado &&
        tipoSeleccionado.campos.map((campo) => (
          <input
            key={campo.id}
            type={
              { Texto: "text", numero: "number", fecha_hora: "datetime-local" }[
                campo.tipo
              ]
            }
            placeholder={campo.nombre}
            className="border px-2 py-3 w-full mt-2 rounded-md outline-none"
            onChange={(e) => manejarCambio(campo.id, e.target.value)}
          />
        ))}

      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          onClick={() => setModalRespuesta(false)}
          className="bg-gray-500 text-white px-3 py-2  rounded-md"
        >
          Cancelar
        </button>
        <button
          onClick={enviarFormulario}
          className="bg-verde text-white px-3 py-2 rounded-md"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
