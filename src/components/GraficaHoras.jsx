"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Definición de las programaciones
const programaciones = [
  { nombre: "CPI-681 Barrio Bolívar", conductor: "Cristian Montenegro", color: "#ca8a04", duraciones: [30, 15, 45] },
  { nombre: "CPI-682 Los Robles", conductor: "Alfredo Gutierrez", color: "#a855f7", duraciones: [45, 30, 15] },
  { nombre: "CPI-683 Santa María", conductor: "Veggeta Andres", color: "#f43f5e", duraciones: [60, 45] },
  { nombre: "CPI-681 Galería la Esmeralda", conductor: "Joshua Montealegre", color: "#38bdf8", duraciones: [60, 30] },
];

// Generamos los datos para la gráfica sumando los tiempos de duración
const chartData = programaciones.map((prog) => ({
  nombre: prog.nombre,
  minutos: prog.duraciones.reduce((acc, dur) => acc + dur, 0),
  color: prog.color,
  duraciones: prog.duraciones,
}));

const GraficaHoras = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      {programaciones.map((prog, index) => (
        <div key={index} className="mb-6 border rounded-lg p-4 shadow-md relative">
          <h2 className="font-bold text-lg">{prog.nombre}</h2>
          <p className="text-sm text-gray-600">{prog.conductor}</p>

          <div className="relative mt-10 flex items-center w-full">
            <FontAwesomeIcon icon={faHome} className="text-gray-600 mr-3" />
            <div className="relative w-full">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={[chartData[index]]} layout="vertical" barSize={25}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="nombre" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="minutos">
                    <Cell fill={prog.color} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {/* Contenedor de los tiempos de duración */}
              <div className="absolute top-0 left-60 space-x-25 w-full h-full flex items-center pl-10">
                {prog.duraciones.map((dur, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 text-xs font-bold text-black border border-black rounded-md shadow-sm mr-1"
                    style={{ backgroundColor: prog.color }}
                  >
                    {dur} min
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GraficaHoras;
