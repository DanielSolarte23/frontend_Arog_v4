"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faMoon, faSun, faBell, faUser } from "@fortawesome/free-solid-svg-icons";

function BarraHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      {/* Barra de Navegación */}
      <nav className={`p-3 flex items-center justify-between shadow-md border-b ${darkMode ? "bg-gray-100" : "bg-white"}`}>
        {/* Menú y Búsqueda */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={faBars} size="lg" className={darkMode ? "text-white" : "text-gray-500"} />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`border rounded pl-8 pr-4 py-1.5 focus:outline-none ${
                darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-600 border-gray-300"
              }`}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className={`absolute left-3 top-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}
            />
          </div>
        </div>

        {/* Íconos de acciones */}
        <div className="flex items-center gap-4">
          {/* Botón de modo oscuro */}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" className={darkMode ? "text-yellow-400" : "text-gray-400"} />
          </button>

          {/* Campana de notificaciones */}
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={faBell} size="lg" className={darkMode ? "text-gray-300" : "text-gray-400"} />
          </button>

          {/* Perfil */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </div>
            <span className={`text-sm ${darkMode ? "text-white" : "text-gray-700"}`}>Nombre ejemplo ▼</span>
          </div>
        </div>
      </nav>

      {/* Contenido de la página */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">{searchTerm ? `Resultados para: "${searchTerm}"` : "BarraHeader"}</h1>
      </div>
    </div>
  );
}

export default BarraHeader;
