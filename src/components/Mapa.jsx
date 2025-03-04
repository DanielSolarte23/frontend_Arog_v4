"use client";
import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ waypoints }) => {
    const map = useMap();

    React.useEffect(() => {
        if (!map || waypoints.length < 2) return;

        // Definir el icono personalizado
        const customIcon = L.icon({
            iconUrl: "https://static.vecteezy.com/system/resources/thumbnails/024/831/288/small/3d-render-red-pin-map-location-pointer-icon-png.png", // Reemplaza con la URL de tu icono
            iconSize: [30, 40], // Tamaño del icono
            iconAnchor: [15, 40] // Punto de anclaje (ajústalo si es necesario)
        });

        const routingControl = L.Routing.control({
            waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
            routeWhileDragging: true,
            show: false, // Oculta el cuadro de información
            createMarker: (i, waypoint, n) => {
                return L.marker(waypoint.latLng, { icon: customIcon }); // Agrega los marcadores con el icono personalizado
            }
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, waypoints]);

    return null;
};


const MapaRutas = ({ rutaSeleccionada }) => {
    return (
        <MapContainer className="border rounded-lg" center={[2.441, -76.606]} zoom={14} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {rutaSeleccionada && <RoutingMachine waypoints={rutaSeleccionada.waypoints} />}
        </MapContainer>
    );
};

export default MapaRutas;
