'use client'
import React, { useEffect, useState } from "react";
import TablaRutas from '@/components/admin/TablaRutas'
import MapaRutas from '@/components/Mapa'
import SelectorRutas from "@/components/rutasejemplo";

const rutasData = {
  rutas: [
    {
      id: 1,
      nombre: "Ruta 1 - Centro",
      waypoints: [
        { lat: 2.441, lng: -76.606 },
        { lat: 2.443, lng: -76.610 },
        { lat: 2.444, lng: -76.615 }
      ]
    },
    {
      id: 2,
      nombre: "Ruta 2 - Norte",
      waypoints: [
        { lat: 2.450, lng: -76.602 },
        { lat: 2.455, lng: -76.608 },
        { lat: 2.460, lng: -76.615 }
      ]
    },
    {
      id: 3,
      nombre: "Ruta 3 - Sur",
      waypoints: [
        { lat: 2.430, lng: -76.620 },
        { lat: 2.435, lng: -76.625 },
        { lat: 2.440, lng: -76.630 }
      ]
    }
  ]
};

function AppRutas() {
  const [rutas, setRutas] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setRutas(rutasData.rutas);
      setRutaSeleccionada(rutasData.rutas[0]); // Selecciona la primera ruta por defecto
    }, 1000);
  }, []);
  return (
    <div className='bg-white w-full h-full border  rounded-lg'>
      <div className='h-6/10 w-full  flex'>
        <div className='w-1/2 h-full p-1'>
          <TablaRutas />
        </div>
        <div className='w-1/2 h-full p-1'>
          <MapaRutas rutaSeleccionada={rutaSeleccionada} />
        </div>
      </div>
      <div className='h-4/10 w-full'>
        <SelectorRutas rutas={rutas} rutaSeleccionada={rutaSeleccionada} setRutaSeleccionada={setRutaSeleccionada} />
      </div>
    </div>
  )
}

export default AppRutas