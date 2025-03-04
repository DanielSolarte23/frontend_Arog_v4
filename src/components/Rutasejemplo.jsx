"use client";
import React from "react";

const SelectorRutas = ({ rutas, rutaSeleccionada, setRutaSeleccionada }) => {
  return (
    <div>
      <h2>Selecciona una ruta:</h2>
      <select onChange={(e) => setRutaSeleccionada(rutas.find(r => r.id === parseInt(e.target.value)))}>
        {rutas.map((ruta) => (
          <option key={ruta.id} value={ruta.id}>
            {ruta.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorRutas;
