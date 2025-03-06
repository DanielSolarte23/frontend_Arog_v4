"use client";
import React, { useEffect, useState } from "react";
import TablaRutas from '@/components/admin/TablaRutas';
import MapaRutas from '@/components/Mapa';

// Mock data - replace with actual data source
const rutasData = {
    rutas: [
        // Your routes data here
    ]
};

function AppRutas() {
    const [rutas, setRutas] = useState([]);
    const [coordenadas, setCoordenadas] = useState([]);

    useEffect(() => {
        // Simulating data fetch
        setTimeout(() => {
            setRutas(rutasData.rutas);
        }, 1000);
    }, []);

    const handleCoordenadas = (waypoints) => {
        // Transform ubicaciones to coordenadas if needed
        const coords = waypoints.map(ubicacion => ({
            lat: ubicacion.latitud,
            lng: ubicacion.longitud
        }));
        
        setCoordenadas(coords);
        console.log(coords);
    }

    return (
        <div className='bg-white w-full h-full border rounded-lg'>
            <div className='h-6/10 w-full flex'>
                <div className='w-1/2 h-full p-1'>
                    <TablaRutas 
                        onUbicacionClick={handleCoordenadas}
                    />
                </div>
                <div className='w-1/2 h-full p-1'>
                    <MapaRutas rutaSeleccionada={{waypoints: coordenadas}} />
                </div>
            </div>
        </div>
    );
}

export default AppRutas;