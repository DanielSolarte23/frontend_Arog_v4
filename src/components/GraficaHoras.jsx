"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts";

const programaciones = [
  {
    nombre: "CPI-681 Aida Lucia - Joshua Escobar",
    bloques: [
      { id: 1, color: "#84cc16", duracion: 60 },
      { id: 2, color: "#38bdf8", duracion: 30 },
      { id: 3, color: "#b8860b", duracion: 20 },
    ],
  },
  {
    nombre: "CPI-681 Galeria la Esmeralda - Joshua Escobar",
    bloques: [
      { id: 1, color: "#84cc16", duracion: 50 },
      { id: 2, color: "#38bdf8", duracion: 40 },
      { id: 3, color: "#b8860b", duracion: 20 },
    ],
  },
  {
    nombre: "CPI-681 Barrio Bolivar - Joshua Escobar",
    bloques: [
      { id: 1, color: "#84cc16", duracion: 70 },
      { id: 2, color: "#38bdf8", duracion: 30 },
      { id: 3, color: "#b8860b", duracion: 25 },
    ],
  },
];

const prepareChartData = (programaciones) => {
  return programaciones.map((prog, index) => {
    let data = { nombre: prog.nombre, index: index + 1 };
    prog.bloques.forEach((bloque, i) => {
      data[`bloque${i + 1}`] = bloque.duracion;
    });
    return data;
  });
};

const colores = ["#84cc16", "#38bdf8", "#b8860b"];
const horas = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

const HorasTimeline = () => {
  const chartData = prepareChartData(programaciones);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 150 }}>
          {/* Agrega la banda de referencia para la barra de horas */}
          <ReferenceArea x1={0} x2={300} fill="#ddd" fillOpacity={0.3} />
          <XAxis type="number" domain={[0, 300]} tickFormatter={(tick) => `${Math.floor(tick / 60) + 10}:${(tick % 60).toString().padStart(2, '0')}`} />
          <YAxis dataKey="nombre" type="category" width={200} tick={{ fill: "black", fontWeight: "bold" }} />
          <Tooltip />
          {colores.map((color, i) => (
            <Bar key={i} dataKey={`bloque${i + 1}`} stackId="a" fill={color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorasTimeline;