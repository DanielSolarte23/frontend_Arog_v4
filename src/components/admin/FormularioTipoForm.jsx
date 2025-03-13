'use client'
import { useState } from "react";

export default function FormularioTipoForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [campos, setCampos] = useState([]);

  const agregarCampo = () => {
    setCampos([...campos, { nombre: "", descripcion: "", tipo: "texto", requerido: false }]);
  };

  const actualizarCampo = (index, campo, valor) => {
    const nuevosCampos = [...campos];
    nuevosCampos[index][campo] = valor;
    setCampos(nuevosCampos);
  };

  const enviarFormulario = async () => {
    const data = { nombre, descripcion, creadorId: 1, campos };
    await fetch("http://localhost:3002/api/formulariosTipo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Tipo de formulario creado.");
  };

  return (
    <div className="mt-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Crear Formulario</h2>
      <input
        type="text"
        placeholder="Nombre"
        className="border p-2 w-full mt-2 rounded-md"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        className="border p-2 w-full mt-2 rounded-md"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      
      <h3 className="mt-4 font-semibold">Campos:</h3>
      {campos.map((campo, index) => (
        <div key={index} className="border p-2 mt-2">
          <input
            type="text"
            placeholder="Nombre del campo"
            className="border p-1 w-full rounded-md "
            value={campo.nombre}
            onChange={(e) => actualizarCampo(index, "nombre", e.target.value)}
          />
          <select
            className="border p-1 w-full mt-1 rounded-md"
            value={campo.tipo}
            onChange={(e) => actualizarCampo(index, "tipo", e.target.value)}
          >
            <option value="texto">Texto</option>
            <option value="numero">Número</option>
            <option value="fecha_hora">Fecha y Hora</option>
            <option value="decimal">Decimal</option>
          </select>
          <label className="flex items-center mt-1">
            <input
              type="checkbox"
              checked={campo.requerido}
              onChange={(e) => actualizarCampo(index, "requerido", e.target.checked)}
            />
            <span className="ml-2">Requerido</span>
          </label>
        </div>
      ))}

      <button onClick={agregarCampo} className="bg-verde-dos text-white px-3 py-1 mt-2">
        + Agregar Campo
      </button>
      <button onClick={enviarFormulario} className="bg-verde text-white px-3 py-1 ml-2 mt-2">
        Guardar
      </button>
    </div>
  );
}
