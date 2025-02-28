"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";

function BarraHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`h-full px-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Barra de Navegación */}
      <nav
        className={`flex items-center justify-between border-b h-full ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Menú y Búsqueda */}
        <div className="flex items-center gap-2">
          <button className="px-2 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 border">
            <i
              className={`fa-solid fa-bars ${
                darkMode ? "text-white" : "text-gray-500"
              }`}
            ></i>
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`border rounded pl-8 pr-4 py-1.5 focus:outline-none ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            />
            <i
              className={`fa-solid fa-magnifying-glass absolute left-3 top-2 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            ></i>
          </div>
        </div>

        {/* Íconos de acciones */}
        <div className="flex items-center gap-4">
          {/* Botón de modo oscuro */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <i
              className={`fa-solid fa-moon ${darkMode ? "text-yellow-400" : "text-gray-400"}`}
            ></i>
          </button>

          {/* Campana de notificaciones */}
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {/* <FontAwesomeIcon icon={faBell} size="lg" className={darkMode ? "text-gray-300" : "text-gray-400"} /> */}
          </button>

          {/* Perfil */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              {/* <FontAwesomeIcon icon={faUser} size="lg" /> */}
            </div>
            <span
              className={`text-sm ${darkMode ? "text-white" : "text-gray-700"}`}
            >
              Nombre ejemplo ▼
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BarraHeader;
