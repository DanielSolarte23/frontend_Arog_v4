"use client";
import { useState } from "react";

export default function FormularioTipoForm({
  setMostrarFormularioTipo,
  getFormulariosTipo,
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [campos, setCampos] = useState([]);

  const agregarCampo = () => {
    setCampos([
      ...campos,
      { nombre: "", descripcion: "", tipo: "texto", requerido: false },
    ]);
  };

  const actualizarCampo = (index, campo, valor) => {
    const nuevosCampos = [...campos];
    nuevosCampos[index][campo] = valor;
    setCampos(nuevosCampos);
  };

  const enviarFormulario = async () => {
    const data = { nombre, descripcion, creadorId: 1, campos };
    await fetch("http://localhost:3002/api/formulariosTipo", {
      // await fetch("https://backend-arog-v4.onrender.com/api/formulariosTipo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getFormulariosTipo();
    setMostrarFormularioTipo(false);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black z-50 flex justify-center items-center overflow-y-auto py-5">
      <div className="mt-6 p-4 border rounded-md bg-white max-h-[600px] overflow-y-auto scroll-custom">
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
          <div key={index} className="border p-2 mt-2 rounded-md">
            <input
              type="text"
              placeholder="Nombre del campo"
              className="border p-2 w-full rounded-md "
              value={campo.nombre}
              onChange={(e) => actualizarCampo(index, "nombre", e.target.value)}
            />
            <select
              className="border p-2 w-full mt-1 rounded-md"
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
                onChange={(e) =>
                  actualizarCampo(index, "requerido", e.target.checked)
                }
              />
              <span className="ml-2">Requerido</span>
            </label>
          </div>
        ))}

        <div className="w-full flex justify-between">
          <button
            onClick={agregarCampo}
            className="bg-verde-dos text-white px-3 py-2 mt-2 rounded-md"
          >
            + Agregar Campo
          </button>
          <div>
            <button
              onClick={() => {
                setMostrarFormularioTipo(false);
              }}
              className="bg-gray-400 text-white px-3 py-2 ml-2 mt-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={enviarFormulario}
              className="bg-verde text-white px-3 py-2 ml-2 mt-2 rounded-md"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
