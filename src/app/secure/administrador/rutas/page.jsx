"use client";
import React, { useEffect, useState } from "react";
import TablaRutas from "@/components/pruebas/TablaRutasPrueba";
import MapaRutas from "@/components/Mapa";
import RutaForm from "@/components/pruebas/FormRutaPrueba";
import TimelineExample from "@/components/admin/graficoHoras";
import { useRutas } from "@/context/RutasContext";
import VehiculoModal from "@/components/admin/CrearVehiculo";
import UbicacionModal from "@/components/admin/FormUbicaciones";

const rutasData = {
  rutas: []
};

function AppRutas() {

  const { } = useRutas();
  const [rutas, setRutas] = useState([]);
  const [coordenadas, setCoordenadas] = useState([]);
  const [grafico, setGrafico] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedRuta, setSelectedRuta] = useState(null);
  const [modalVehiculoOpen, setModalVehiculoOpen] = useState(false);
  const [modalUbicacionOpen, setModalUbicacionOpen] = useState(false);


  const openModal = (mode, ruta = null) => {
    setModalMode(mode);

    if (ruta && mode === "edit") {

      const transformedRuta = {
        ...ruta,
        usuarioAsignadoId: ruta.usuarioAsignado?.id,
        idVehiculo: ruta.vehiculosAsignados?.length > 0 ?
          ruta.vehiculosAsignados[0].vehiculo.id : null,
        // Transform puntosRuta to puntos if needed
        puntos: ruta.puntosRuta ? ruta.puntosRuta.map((punto, index) => ({
          idUbicacion: punto.ubicacion?.id,
          orden: punto.orden || index + 1,
          ubicacionNombre: punto.ubicacion?.nombre
        })) : ruta.puntos
      };
      setSelectedRuta(transformedRuta);
    } else {
      setSelectedRuta(ruta);
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRuta(null);
  };

  const openEditModal = (ruta) => {
    openModal("edit", ruta);
  };

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
      {modalOpen && (<RutaForm
        isOpen={modalOpen}
        closeModal={closeModal}
        mode={modalMode}
        selectedRuta={selectedRuta}
        openEditModal={openEditModal}
      />)}
      {modalVehiculoOpen && (
        <VehiculoModal isOpen={modalVehiculoOpen} onClose={() => setModalVehiculoOpen(false)} />)}

      {modalUbicacionOpen && (
        <UbicacionModal isOpen={modalUbicacionOpen} onClose={() => setModalUbicacionOpen(false)} />)}
      <div className="h-auto w-full justify-between flex flex-col sm:flex-row items-start sm:items-center px-2 2xl:px-4 border-b py-2">
        <ul className="w-full sm:w-auto h-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 2xl:gap-2 mb-2 sm:mb-0">
          <li className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-5 py-3 2xl:py-4 2xl:px-6 border border-gray-200 rounded-lg sm:rounded-s-lg sm:rounded-e-none text-verde-dos hover:bg-verde hover:text-white duration-500"
              onClick={() => openModal("create")}>
              Crear Ruta
            </button>
          </li>
          <li className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-5 py-3 2xl:py-4 2xl:px-6 border border-gray-200 rounded-lg sm:rounded-none text-verde-dos hover:bg-verde hover:text-white duration-500"
              onClick={() => setModalVehiculoOpen(true)}
            >
              Agregar Vehiculo
            </button>
          </li>
          <li className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-5 py-3 2xl:py-4 2xl:px-6 border border-gray-200 rounded-lg sm:rounded-e-lg sm:rounded-s-none text-verde-dos hover:bg-verde hover:text-white duration-500"
              onClick={() => setModalUbicacionOpen(true)}
            >
              Agregar Ubicacion
            </button>
          </li>
        </ul>
        <button className=" hidden w-full sm:w-auto px-5 py-3 2xl:py-4 2xl:px-6 border border-gray-200 rounded-md text-black">
          Filtrar
        </button>
      </div>
      <div className="h-auto sm:h-6/10 w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 h-full p-1 2xl:p-2 mb-2 sm:mb-0">
          <TablaRutas
            openModal={openModal}
            onUbicacionClick={handleCoordenadas}
            onHorasClick={handleHoras}
          />
        </div>
        <div className="w-full sm:w-1/2 h-96 sm:h-full p-1 2xl:p-2">
          <MapaRutas rutaSeleccionada={{ waypoints: coordenadas }} />
        </div>
      </div>
      <div className="w-full h-auto sm:h-3/10 p-1 2xl:p-2">
        <TimelineExample datos={grafico} />
      </div>
    </div>
  );
}

export default AppRutas;