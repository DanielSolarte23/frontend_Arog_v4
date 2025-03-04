'use client'
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

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

const RoutingMachine = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || waypoints.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
      routeWhileDragging: true,
      createMarker: function () { return null; } // No mostrar marcadores
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

const MapaRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);

  useEffect(() => {
    // Simula una petición a un backend
    setTimeout(() => {
      setRutas(rutasData.rutas);
      setRutaSeleccionada(rutasData.rutas[0]); // Selecciona la primera ruta por defecto
    }, 1000);
  }, []);

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

      <MapContainer center={[2.441, -76.606]} zoom={14} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {rutaSeleccionada && <RoutingMachine waypoints={rutaSeleccionada.waypoints} />}
      </MapContainer>
    </div>
  );
};

export default MapaRutas;
