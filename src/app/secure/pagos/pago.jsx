"use client";
import { useState, useEffect } from "react";

export default function Pago() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(2); // Comenzamos en página 2 como en la imagen
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    item: "",
    Bahia: "",
    NroVivienda: "",
    Usuario: "",
    Total_Pagado: "",
    Fecha: "",
    Observaciones: ""
    
  });

  // Mock data ampliada para la tabla
  const tableData = [
    { item: "1", Bahia: "2", NroVivienda: "2.26", Usuario: "Maria Anaya",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "ayer pase por tu casa "}, 
    { item: "1", Bahia: "3", NroVivienda: "2.30", Usuario: "Juan Morales", Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "tiqui"},
    { item: "1", Bahia: "1", NroVivienda: "2.15", Usuario: "Maria Anaya",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "tan "}, 
    { item: "1", Bahia: "4", NroVivienda: "2.40", Usuario: "Pedro Gómez",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Arroz"}, 
    { item: "1", Bahia: "2", NroVivienda: "2.26", Usuario: "Ana Pérez",    Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Juan Morales"}, 
    { item: "1", Bahia: "5", NroVivienda: "2.50", Usuario: "Maria Anaya",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Ricardo Erazo"}, 
    { item: "1", Bahia: "3", NroVivienda: "2.30", Usuario: "Juan Morales", Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Pedro Gómez"}, 
    { item: "1", Bahia: "1", NroVivienda: "2.15", Usuario: "Maria Anaya",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Maria Anaya"}, 
    { item: "1", Bahia: "4", NroVivienda: "2.40", Usuario: "Pedro Gómez",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Ricardo Erazo"}, 
    { item: "1", Bahia: "2", NroVivienda: "2.26", Usuario: "Ana Pérez",    Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Juan Morales"}, 
    { item: "1", Bahia: "5", NroVivienda: "2.50", Usuario: "Maria Anaya",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Ricardo Erazo"}, 
    { item: "1", Bahia: "3", NroVivienda: "2.30", Usuario: "Juan Morales", Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Ana Pérez"}, 
    { item: "1", Bahia: "1", NroVivienda: "2.15", Usuario: "Maria Anaya",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Ricardo Erazo"}, 
    { item: "1", Bahia: "4", NroVivienda: "2.40", Usuario: "Pedro Gómez",  Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Juan Morales"}, 
    { item: "1", Bahia: "2", NroVivienda: "2.26", Usuario: "Ana Pérez",    Total_Pagado: "200.000", Fecha: "07/21/2025", Observaciones: "Ricardo Erazo"}, 
  ];



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
          Agregar Pagos
        </button>
      </nav>

      {/* Tabla de registros */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th className="px-6 py-3">item</th>
              <th className="px-6 py-3">Bahia</th>
              <th className="px-6 py-3">NroVivienda</th>
              <th className="px-6 py-3">Usuario</th>
              <th className="px-6 py-3">Total_Pagado</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((row, index) => (
              <tr 
                key={index} 
                className={` border-b  `}
              >
                <td className="px-6 py-4">{row.item}</td>
                <td className="px-6 py-4">{row.Bahia}</td>
                <td className="px-6 py-4">{row.NroVivienda}</td>
                <td className="px-6 py-4">{row.Usuario}</td>
                <td className="px-6 py-4">{row.Total_Pagado}</td>
                <td className="px-6 py-4">{row.Fecha}</td>
                <td className="px-6 py-4">{row.Observaciones}</td>
      
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
            <h2 className="text-lg font-bold mb-4">Agregar pago</h2>
            <div className="grid grid-cols-4 gap-3">
              
              <input type="number" name="item" placeholder="item" value={formData.item} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="number" name="Bahia" placeholder="Bahia" value={formData.Bahia} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="number" name="NroVivienda" placeholder="NroVivienda" value={formData.NroVivienda} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="text" name="usuario" placeholder="Usuario" value={formData.Usuario} onChange={handleChange} className="border p-2 rounded col-span-2" />
              <input type="number" name="Total_Pagos" placeholder="Total_Pagos" value={formData.Total_Pagado} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <input type="date" name="fecha" value={formData.Fecha} onChange={handleChange} className="border p-2 rounded col-span-1" />
              <textarea name="Observacion" placeholder="Observación" value={formData.Observaciones} onChange={handleChange} className="border p-2 rounded col-span-4 h-20 resize-none" />
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