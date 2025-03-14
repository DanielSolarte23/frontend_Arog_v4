"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ waypoints }) => {
    const map = useMap();
    const routingControlRef = useRef(null);
    // Usar un ID único para cada conjunto de waypoints
    const waypointsKey = JSON.stringify(waypoints);

    useEffect(() => {
        if (!map || !waypoints || waypoints.length < 2) return;

        const customIcon = L.icon({
            iconUrl: "/ubicacion.png",
            iconSize: [40, 50],
            iconAnchor: [25, 50],
        });

        // Asegurarse de que el mapa esté completamente inicializado
        if (!map._loaded) {
            return;
        }

        // Usamos un timeout para asegurar que todas las operaciones anteriores hayan terminado
        const timer = setTimeout(() => {
            try {
                // Primero limpiamos la ruta existente si existe
                if (routingControlRef.current && map) {
                    try {
                        map.removeControl(routingControlRef.current);
                    } catch (e) {
                        console.warn("Error al eliminar control de ruta:", e);
                    }
                    routingControlRef.current = null;
                }

                // Ahora creamos la nueva ruta
                const wayPointLatLngs = waypoints.map((point) => L.latLng(point.lat, point.lng));
                
                const routingControl = L.Routing.control({
                    waypoints: wayPointLatLngs,
                    routeWhileDragging: false,
                    addWaypoints: false,
                    draggableWaypoints: false,
                    show: false,
                    fitSelectedRoutes: true,
                    lineOptions: {
                        styles: [{ color: "#181d27", opacity: 0.8, weight: 4 }],
                    },
                    createMarker: function (i, waypoint) {
                        return L.marker(waypoint.latLng, {
                            icon: customIcon,
                        });
                    }
                });

                // Añadimos el nuevo control al mapa
                routingControl.addTo(map);
                routingControlRef.current = routingControl;
            } catch (error) {
                console.error("Error en RoutingMachine:", error);
            }
        }, 300); // Incrementamos el timeout para dar más tiempo

        return () => {
            clearTimeout(timer);
            try {
                if (routingControlRef.current && map && map._loaded) {
                    map.removeControl(routingControlRef.current);
                    routingControlRef.current = null;
                }
            } catch (error) {
                console.error("Error al limpiar RoutingMachine:", error);
            }
        };
    }, [map, waypointsKey]); // Dependemos del waypointsKey en lugar de waypoints directamente

    return null;
};

const MapaRutas = ({ rutaSeleccionada }) => {
    const waypoints = rutaSeleccionada?.waypoints || [];
    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);

    return (
        <MapContainer
            className="border rounded-lg z-30"
            center={[2.441, -76.606]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            whenReady={(map) => {
                mapRef.current = map.target;
                setMapReady(true);
                setTimeout(() => {
                    mapRef.current.invalidateSize();
                }, 500);
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapReady && waypoints.length > 1 && <RoutingMachine waypoints={waypoints} />}
        </MapContainer>
    );
};

export default MapaRutas;