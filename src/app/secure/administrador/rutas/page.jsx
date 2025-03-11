"use client";
import React, { useEffect, useState } from "react";
import TablaRutas from "@/components/admin/TablaRutas";
import MapaRutas from "@/components/Mapa";
import HorasTimeline from "@/components/GraficaHoras";
import RutaForm from "@/components/admin/FormRegistrarRuta";
import TimelineExample from "@/components/admin/graficoHoras";

const rutasData = {
  rutas: []
};

function AppRutas() {
  const [rutas, setRutas] = useState([]);
  const [coordenadas, setCoordenadas] = useState([]);
  const [grafico, setGrafico] = useState([]);
  const [modalRutas, setModalRutas] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
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

  const handleHoras = (horas) => {
    const hora = horas.map((hora) => ({
      horaInicio: hora.horaInicio,
      horaFin: hora.horaFin,
      encargado: hora.nombres,
      ruta: hora.nombre,
      vehiculo: hora.placa,
      color: hora.color,
    }));

    setGrafico(hora);
    console.log(hora);
  };

  return (
    <div className="bg-white w-full h-full border rounded-lg">
      {modalRutas && <RutaForm modalRutas={modalRutas} setModalRutas={setModalRutas} />}
      <div className="h-1/10 w-full justify-between flex items-center px-2 border-b">
        <div className=" h-full rounded-t-md flex items-center gap-3 p-2 w-1/2">
          <div className="h-full w-1/2">
            <button onClick={() => {
              setModalAdd(true);
            }} className=" max-h-full px-3 py-2 text-xl flex justify-center items-center border border-gray-200 rounded-md text-white bg-verde">
              +
            </button>
            {modalAdd && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col"
                onClick={() => setModalAdd(false)} // Cierra al hacer clic fuera
              >
                <div
                  className="bg-white p-2 rounded-lg border flex flex-col"
                  onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
                >
                  <button
                    className="px-5 py-3 duration-500 bg-white rounded-md text-verde-dos text-left hover:bg-verde-principal hover:text-white"
                    onClick={() => {
                      setModalRutas(true);
                      setModalAdd(false);
                    }}
                  >
                    + Añadir nueva ruta
                  </button>
                  <hr />
                  <button className="px-5 py-3 duration-500 rounded-md text-black text-left hover:bg-verde-principal hover:text-white">
                    + Registrar una nueva ubicación
                  </button>
                  <hr />
                  <button className="px-5 py-3 duration-500 rounded-md text-black text-left hover:bg-verde-principal hover:text-white">
                    + Registrar un nuevo vehículo
                  </button>
                </div>
              </div>
            )}

          </div>


        </div>
        <button className="px-5 py-3 border border-gray-200 rounded-md text-black">
          Filtrar
        </button>
      </div>
      <div className="h-6/10 w-full flex">
        <div className="w-1/2 h-full p-1">
          <TablaRutas
            onUbicacionClick={handleCoordenadas}
            onHorasClick={handleHoras}
          />
        </div>
        <div className="w-1/2 h-full p-1">
          <MapaRutas rutaSeleccionada={{ waypoints: coordenadas }} />
        </div>
      </div>
      <div className="w-full h-3/10 p-1">
        <TimelineExample datos={grafico} />
      </div>
    </div>
  );
}

export default AppRutas;