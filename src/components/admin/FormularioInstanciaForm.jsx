'use client'
import { useState } from "react";

export default function FormularioInstanciaForm({ tiposFormulario }) {
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
    <div className="mt-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Crear Formulario</h2>
      <select
        className="border p-2 w-full mt-2 rounded-md"
        onChange={(e) =>
          setTipoSeleccionado(tiposFormulario.find((tipo) => tipo.id == e.target.value))
        }
      >
        <option value="">Selecciona un tipo</option>
        {tiposFormulario.map((tipo) => (
          <option key={tipo.id} value={tipo.id}>
            {tipo.nombre}
          </option>
        ))}
      </select>

      {tipoSeleccionado &&
        tipoSeleccionado.campos.map((campo) => (
          <input
            key={campo.id}
            type="text"
            placeholder={campo.nombre}
            className="border p-2 w-full mt-2 rounded-md"
            onChange={(e) => manejarCambio(campo.id, e.target.value)}
          />
        ))}

      <button onClick={enviarFormulario} className="bg-verde text-white px-3 py-1 mt-2 rounded-md">
        Guardar
      </button>
    </div>
  );
}
