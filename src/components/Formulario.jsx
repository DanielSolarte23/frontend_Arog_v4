"use client";
import { useState, useEffect } from "react";

export default function Formulario() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(2); // Comenzamos en página 2 como en la imagen
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    fecha: "",
    recipiente: "",
    pesoVacio: "",
    pesoLleno: "",
    diferencia: "",
    responsable: "",
    responsableFuente: "",
    observacion: ""
  });

  // Mock data ampliada para la tabla
  const tableData = [
    { fecha: "16/10/2024", recipiente: "2", pesoVacio: "2.26", pesoLleno: "56.26", diferencia: "54.26", responsable: "Maria Anaya", responsableFuente: "Ricardo Erazo", observacion: "Ninguna" },
    { fecha: "17/10/2024", recipiente: "3", pesoVacio: "2.30", pesoLleno: "57.80", diferencia: "55.50", responsable: "Juan Morales", responsableFuente: "Ricardo Erazo", observacion: "Material húmedo" },
    { fecha: "18/10/2024", recipiente: "1", pesoVacio: "2.15", pesoLleno: "53.45", diferencia: "51.30", responsable: "Maria Anaya", responsableFuente: "Ana Pérez", observacion: "Ninguna" },
    { fecha: "19/10/2024", recipiente: "4", pesoVacio: "2.40", pesoLleno: "59.10", diferencia: "56.70", responsable: "Pedro Gómez", responsableFuente: "Ricardo Erazo", observacion: "Contaminación cruzada" },
    { fecha: "20/10/2024", recipiente: "2", pesoVacio: "2.26", pesoLleno: "55.80", diferencia: "53.54", responsable: "Ana Pérez", responsableFuente: "Juan Morales", observacion: "Ninguna" },
    { fecha: "21/10/2024", recipiente: "5", pesoVacio: "2.50", pesoLleno: "60.20", diferencia: "57.70", responsable: "Maria Anaya", responsableFuente: "Ricardo Erazo", observacion: "Pesaje verificado" },
    { fecha: "22/10/2024", recipiente: "3", pesoVacio: "2.30", pesoLleno: "58.40", diferencia: "56.10", responsable: "Juan Morales", responsableFuente: "Pedro Gómez", observacion: "Ninguna" },
    { fecha: "23/10/2024", recipiente: "1", pesoVacio: "2.15", pesoLleno: "54.25", diferencia: "52.10", responsable: "Pedro Gómez", responsableFuente: "Maria Anaya", observacion: "Material seco" },
    { fecha: "24/10/2024", recipiente: "4", pesoVacio: "2.40", pesoLleno: "58.90", diferencia: "56.50", responsable: "Ana Pérez", responsableFuente: "Ricardo Erazo", observacion: "Ninguna" },
    { fecha: "25/10/2024", recipiente: "2", pesoVacio: "2.26", pesoLleno: "56.30", diferencia: "54.04", responsable: "Maria Anaya", responsableFuente: "Juan Morales", observacion: "Verificación doble" },
    { fecha: "26/10/2024", recipiente: "5", pesoVacio: "2.50", pesoLleno: "59.80", diferencia: "57.30", responsable: "Juan Morales", responsableFuente: "Ricardo Erazo", observacion: "Ninguna" },
    { fecha: "27/10/2024", recipiente: "3", pesoVacio: "2.30", pesoLleno: "57.60", diferencia: "55.30", responsable: "Pedro Gómez", responsableFuente: "Ana Pérez", observacion: "Peso estable" },
    { fecha: "28/10/2024", recipiente: "1", pesoVacio: "2.15", pesoLleno: "53.85", diferencia: "51.70", responsable: "Maria Anaya", responsableFuente: "Ricardo Erazo", observacion: "Ninguna" },
    { fecha: "29/10/2024", recipiente: "4", pesoVacio: "2.40", pesoLleno: "58.50", diferencia: "56.10", responsable: "Ana Pérez", responsableFuente: "Juan Morales", observacion: "Muestra representativa" },
    { fecha: "30/10/2024", recipiente: "2", pesoVacio: "2.26", pesoLleno: "56.00", diferencia: "53.74", responsable: "Pedro Gómez", responsableFuente: "Ricardo Erazo", observacion: "Ninguna" },
  ];

  const operarios = ["Maria Anaya", "Juan Morales", "Ana Pérez", "Pedro Gómez"];
  const operariosCompletos = [...operarios, "Ricardo Erazo"];

  // Filtrar datos cuando cambia el término de búsqueda
  useEffect(() => {
    const filtered = tableData.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  // Inicializar filteredData con todos los datos
  useEffect(() => {
    setFilteredData(tableData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Obtener los datos para la página actual
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  // Manejar cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Función para generar números de página
  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 7; // Mostramos máximo 7 números de página
    
    if (totalPages <= maxVisiblePages) {
      // Si hay 7 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar la primera página
      pages.push(1);
      
      // Calcular el rango de páginas a mostrar alrededor de la página actual
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
      
      // Ajustar si estamos cerca del inicio
      if (currentPage < 4) {
        endPage = Math.min(5, totalPages - 1);
      }
      
      // Ajustar si estamos cerca del final
      if (currentPage > totalPages - 3) {
        startPage = Math.max(totalPages - 4, 2);
      }
      
      // Añadir puntos suspensivos después de la página 1 si es necesario
      if (startPage > 2) {
        pages.push("...");
      }
      
      // Añadir páginas intermedias
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Añadir puntos suspensivos antes de la última página si es necesario
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      
      // Siempre mostrar la última página
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="relative overflow-x-auto border-2 border-gray-300 shadow-lg mx-2 md:m-4 lg:m-8 rounded-lg">
      <nav className="bg-white border-2 border-b-gray-300 flex flex-col md:flex-row items-center justify-between p-2 gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
            placeholder="Buscar registros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-lime-600 px-4 py-2 rounded text-white">
          Agregar Registro
        </button>
      </nav>

      {/* Tabla de registros */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Recipiente</th>
              <th className="px-6 py-3">PVacío(kg)</th>
              <th className="px-6 py-3">PLleno(kg)</th>
              <th className="px-6 py-3">Diferencia(kg)</th>
              <th className="px-6 py-3">Responsable</th>
              <th className="px-6 py-3">Responsable fuente</th>
              <th className="px-6 py-3">Observación</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((row, index) => (
              <tr 
                key={index} 
                className={` border-b  `}
              >
                <td className="px-6 py-4">{row.fecha}</td>
                <td className="px-6 py-4">{row.recipiente}</td>
                <td className="px-6 py-4">{row.pesoVacio}</td>
                <td className="px-6 py-4">{row.pesoLleno}</td>
                <td className="px-6 py-4">{row.diferencia}</td>
                <td className="px-6 py-4">{row.responsable}</td>
                <td className="px-6 py-4">{row.responsableFuente}</td>
                <td className="px-6 py-4">{row.observacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className={`flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <div className="flex items-center space-x-2">
          {getPageNumbers().map((page, index) => (
            <span 
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              className={`px-3 py-1 text-sm ${
                page === currentPage 
                  ? 'text-white bg-lime-600 rounded-lg cursor-default' 
                  : page === '...' 
                    ? 'text-gray-700 cursor-default' 
                    : 'text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer'
              }`}
            >
              {page}
            </span>
          ))}
        </div>
        <button 
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          className={`flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-lg font-bold mb-4">Agregar nuevo registro</h2>
            <div className="grid grid-cols-4 gap-3">
              <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="text" name="recipiente" placeholder="Recipiente" value={formData.recipiente} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="number" name="pesoVacio" placeholder="P. Vacío (kg)" value={formData.pesoVacio} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="number" name="pesoLleno" placeholder="P. Lleno (kg)" value={formData.pesoLleno} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="number" name="diferencia" placeholder="Diferencia (kg)" value={formData.diferencia} onChange={handleChange} className="border p-2 rounded col-span-2" />
              <select name="responsable" value={formData.responsable} onChange={handleChange} className="border p-2 rounded col-span-1">
                <option value="">Responsable</option>
                {operariosCompletos.map((operario, index) => (
                  <option key={index} value={operario}>{operario}</option>
                ))}
              </select>
              <select name="responsableFuente" value={formData.responsableFuente} onChange={handleChange} className="border p-2 rounded col-span-1">
                <option value="">Responsable fuente</option>
                {operariosCompletos.map((operario, index) => (
                  <option key={index} value={operario}>{operario}</option>
                ))}
              </select>
              <textarea name="observacion" placeholder="Observación" value={formData.observacion} onChange={handleChange} className="border p-2 rounded col-span-4 h-20 resize-none" />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-500" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
              <button className="bg-lime-600 px-4 py-2 rounded text-white hover:bg-lime-700">Crear Registro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}