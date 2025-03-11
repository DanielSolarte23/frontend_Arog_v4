'use client'
import { useState } from "react";

const RutaDetalle = ({ ruta, onClose }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({ ...ruta });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/rutas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Ruta actualizada correctamente");
        setEditable(false);
        onClose(); // Cerrar el modal después de guardar
      } else {
        alert("Error al actualizar la ruta");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{editable ? "Editar Ruta" : "Detalles de la Ruta"}</h2>
      
      <div className="grid gap-4">
        <input 
          type="text" 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleChange} 
          disabled={!editable} 
          className="border p-2 w-full"
        />
        
        <input 
          type="color" 
          name="color" 
          value={formData.color} 
          onChange={handleChange} 
          disabled={!editable} 
          className="border p-2 w-full"
        />
        
        <input 
          type="datetime-local" 
          name="horaInicio" 
          value={formData.horaInicio.slice(0, 16)} 
          onChange={handleChange} 
          disabled={!editable} 
          className="border p-2 w-full"
        />
        
        <input 
          type="datetime-local" 
          name="horaFin" 
          value={formData.horaFin.slice(0, 16)} 
          onChange={handleChange} 
          disabled={!editable} 
          className="border p-2 w-full"
        />
        
        <input 
          type="number" 
          name="usuarioAsignadoId" 
          value={formData.usuarioAsignadoId} 
          onChange={handleChange} 
          disabled={!editable} 
          className="border p-2 w-full"
        />
      </div>

      <div className="flex justify-between mt-4">
        {!editable ? (
          <button onClick={() => setEditable(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Editar</button>
        ) : (
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        )}
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cerrar</button>
      </div>
    </div>
  );
};

export default RutaDetalle;
