'use client'
import Usuario from "@/components/admin/tablaUsuarios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faArrowLeft, faArrowAltCircleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Usuarios({ modalOpen }) {
  // const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-white h-full rounded-lg">
      <div className="h-1/10 rounded-t-lg">
        <div className="flex  p-4 border-b">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Buscar usuarios"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          <div className="flex ml-auto">
            <button className="border border-gray-400 rounded px-4 py-2 flex items-center gap-2">
              Filtrar por <FontAwesomeIcon icon={faFilter} />
            </button>
            <button
              className="ml-4 border bg-verde text-white rounded-lg px-4 py-2"
              // onClick={() => setModalOpen(true)}
            >
              Agregar usuario
            </button>
          </div>
        </div>
      </div>
      <div className="h-9/10 p-1">
        <Usuario 
        // modalOpen={modalOpen} 
        />
      </div>
    </div>
  );
}

export default Usuarios;
