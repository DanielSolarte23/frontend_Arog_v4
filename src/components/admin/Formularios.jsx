'use client'
import { useState, useEffect } from "react";
import FormularioTipoForm from "./FormularioTipoForm";
import FormularioInstanciaForm from "./FormularioInstanciaForm";

export default function FormularioDinamico() {
  const [mostrarFormularioTipo, setMostrarFormularioTipo] = useState(false);
  const [mostrarFormularioInstancia, setMostrarFormularioInstancia] = useState(false);
  const [tiposFormulario, setTiposFormulario] = useState([]);

  // Obtener los tipos de formulario
  useEffect(() => {
    fetch("http://localhost:3002/api/formulariosTipo")
      .then((res) => res.json())
      .then((data) => setTiposFormulario(data));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Gestión de Formularios</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setMostrarFormularioTipo(!mostrarFormularioTipo)}
          className="bg-verde-dos text-white px-4 py-2 rounded-md"
        >
          Crear Formulario
        </button>

        <button
          onClick={() => setMostrarFormularioInstancia(!mostrarFormularioInstancia)}
          className="bg-verde text-white px-4 py-2 rounded-md"
        >
          LLenar Formulario
        </button>
      </div>

      {mostrarFormularioTipo && <FormularioTipoForm />}
      {mostrarFormularioInstancia && <FormularioInstanciaForm tiposFormulario={tiposFormulario} />}
    </div>
  );
}
