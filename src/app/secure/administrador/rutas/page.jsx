"use client";
import React, { useEffect, useState } from "react";
import TablaRutas from "@/components/admin/TablaRutas";
import MapaRutas from "@/components/Mapa";
import HorasTimeline from "@/components/GraficaHoras";
import RutaForm from "@/components/admin/FormRegistrarRuta";

const rutasData = {
  rutas: [],
};

function AppRutas() {
  const [rutas, setRutas] = useState([]);
  const [coordenadas, setCoordenadas] = useState([]);
  const [modalRutas, setModalRutas] = useState(false);

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setRutas(rutasData.rutas);
    }, 1000);
  }, []);

  const handleCoordenadas = (waypoints) => {
    // Transform ubicaciones to coordenadas if needed
    const coords = waypoints.map((ubicacion) => ({
      lat: ubicacion.latitud,
      lng: ubicacion.longitud,
    }));

    setCoordenadas(coords);
    console.log(coords);
  };

  return (
    <div className="bg-white w-full h-full border rounded-lg">
      {modalRutas && <RutaForm />}
      <div className="h-1/10 w-full justify-between flex items-center px-2 border-b">
        <div className=" h-full rounded-t-md flex items-center  gap-3 w-1/2">
          <button
            className="px-5 py-3 bg-verde rounded-md text-white"
            onClick={() => {
              setModalRutas(true);
            }}
          >
            + Añadir nueva ruta
          </button>
          <button className="px-5 py-3 border border-gray-200 rounded-md text-black">
            + Registrar una nueva ubicacion
          </button>
          <button className="px-5 py-3 border border-gray-200 rounded-md text-black">
            + Registrar un nuevo vehiculo
          </button>
        </div>
        <button className="px-5 py-3 border border-gray-200 rounded-md text-black">
          Filtrar
        </button>
      </div>
      <div className="h-7/10 w-full flex">
        <div className="w-1/2 h-full p-1">
          <TablaRutas onUbicacionClick={handleCoordenadas} />
        </div>
        <div className="w-1/2 h-full p-1">
          <MapaRutas rutaSeleccionada={{ waypoints: coordenadas }} />
        </div>
      </div>
      <div className="w-full h-2/10  p-1">
        <HorasTimeline />
      </div>
    </div>
  );
}

export default AppRutas;
