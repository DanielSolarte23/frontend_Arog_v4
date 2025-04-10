'use client'
import { useState } from "react";

export default function VehiculoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ modelo: "", placa: "", marca: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://backend-arog-v4.onrender.com/api/autos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Vehículo registrado con éxito");
        setFormData({ modelo: "", placa: "", marca: "" });
        onClose();
      } else {
        alert("Error al registrar el vehículo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar los datos");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Registrar Vehículo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            value={formData.placa}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={formData.marca}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
            required
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancelar
            </button>
            <button type="submit" className="bg-verde text-white px-4 py-2 rounded-md" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}