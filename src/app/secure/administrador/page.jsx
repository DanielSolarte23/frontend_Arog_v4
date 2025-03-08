"use client";

import { useState } from "react";
import { FaCheckCircle, FaPencilAlt } from "react-icons/fa";

const EditarC = () => {
  const [nuevacontraseña, setnuevacontraseña] = useState("");
  const [editarcontraseña, seteditarcontraseña] = useState(false);

  // Función para manejar el cambio de contraseña
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contraseña cambiada:", nuevacontraseña);
  };

  return (
    <div>
      <div className="h-60 border-2 border-gray-300 rounded-md m-8">
        <h2 className="text-4xl pl-8 py-6">Configuración de privacidad</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-xl pl-8 py-2">Contraseña</label>
          <div className="flex items-center">
            <input
              type="password"
              name="password"
              value={nuevacontraseña}
              onChange={(e) => setnuevacontraseña(e.target.value)}
              readOnly={!editarcontraseña} // Se habilita solo si está en modo edición
              className={`w-8/12 border-green-500 border-b-2 rounded-md h-10 ml-12 ${
                editarcontraseña ? "bg-white" : "bg-gray-100"
              }`}
            />

            {/* Botón de Editar (No desaparece, solo cambia estado) */}
            <button
              className="ml-6 h-14 w-1/6 rounded-md border hover:bg-gray-200 border-gray-300 flex items-center justify-center gap-2"
              type="button"
              onClick={() => seteditarcontraseña(!editarcontraseña)}
            >
              <FaPencilAlt /> Editar
            </button>
          </div>
        </form>
      </div>

      {/* Sección de Notificaciones */}
      <div className="h-96 border-2 border-gray-300 rounded-md m-8">
        <h2 className="text-4xl pl-8 py-6">Notificaciones</h2>
        <ul className="text-xl py-6 pl-14 list-none">
          <li className="flex">
            <FaCheckCircle className="text-green-400" />
            Administrar tus configuraciones
          </li>
          <br />
          <li className="flex">
            <FaCheckCircle className="text-green-400" />
            Notificaciones de correo: Reciba notificaciones por correo electrónico de actualizaciones importantes
          </li>
          <br />
          <li className="flex">
            <FaCheckCircle className="text-green-400" />
            Notificaciones importantes: Reciba notificaciones automáticas de actualizaciones importantes
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditarC;