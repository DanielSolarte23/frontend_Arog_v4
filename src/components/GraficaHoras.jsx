"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts";

const programaciones = [
  {
    nombre: "CPI-681 Aida Lucia - Joshua Escobar",
    bloques: [
      { id: 1, color: "#72aa00", duracion: 60 },
      { id: 2, color: "#38bdf8", duracion: 120 },
      { id: 3, color: "#b8860b", duracion: 20 },
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

const colores = ["#72aa00", "#38bdf8", "#f4a838"];
const horas = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

const HorasTimeline = () => {
  const chartData = prepareChartData(programaciones);

  return (
    <div className="bg-white rounded-lg border py-5 flex items-center">
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 0 }}>
          {/* Agrega la banda de referencia para la barra de horas */}
          <ReferenceArea x1={0} x2={300} fill="#ddd" fillOpacity={0} />
          <XAxis type="number" domain={[0, 300]} tickFormatter={(tick) => `${Math.floor(tick / 60) + 10}:${(tick % 60).toString().padStart(2, '0')}`} />
          <YAxis  dataKey="nombre" type="category" width={200} tick={{ fill: "black", textAnchor: "start", dx: -180   }} />
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