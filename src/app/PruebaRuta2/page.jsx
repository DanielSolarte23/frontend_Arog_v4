"use client";
import React, { useEffect, useState } from "react";
import TablaRutas from "@/components/pruebas/TablaRutasPrueba";
import MapaRutas from "@/components/Mapa";
import RutaForm from "@/components/pruebas/FormRutaPrueba";
import TimelineExample from "@/components/admin/graficoHoras";
import { useRutas } from "@/context/RutasContext";

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
            {/* {modalRutas && <RutaForm modalRutas={modalRutas} setModalRutas={setModalRutas} />} */}
            {modalOpen && (<RutaForm
                isOpen={modalOpen}
                closeModal={closeModal}
                mode={modalMode}
                selectedRuta={selectedRuta}
                openEditModal={openEditModal}
            />)}
            <div className="h-1/10 w-full justify-between flex items-center px-2 border-b">
                <button className="px-5 py-3 border border-gray-200 rounded-md text-black"
                    onClick={() => openModal("create")}>
                    Add
                </button>

                <button className="px-5 py-3 border border-gray-200 rounded-md text-black">
                    Filtrar
                </button>
            </div>
            <div className="h-6/10 w-full flex">
                <div className="w-1/2 h-full p-1">
                    <TablaRutas
                        openModal={openModal}
                        onUbicacionClick={handleCoordenadas}
                        onHorasClick={handleHoras}
                    />
                </div>
                <div className="w-1/2 h-full p-1">
                    <MapaRutas rutaSeleccionada={{ waypoints: coordenadas }} />
                </div>
            </div>
            <div className="w-full h-3/10 p-1 border">
                <TimelineExample datos={grafico} />
            </div>
        </div>
    );
}

export default AppRutas;