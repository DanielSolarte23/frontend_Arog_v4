"use client";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ waypoints }) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        // Ensure we have a map and enough waypoints
        if (!map || !waypoints || waypoints.length < 2) {
            return () => {};
        }

        // Remove existing routing control if it exists
        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
            routingControlRef.current = null;
        }

        const customIcon = L.icon({
            iconUrl: "/ubicacion.png", 
            iconSize: [40, 50],
            iconAnchor: [25, 50],
          });
          

        // Create routing control
        const routingControl = L.Routing.control({
            waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
            routeWhileDragging: true,
            addWaypoints: false,
            draggableWaypoints: false,
            show: false,
            createMarker: function(i, waypoint) {
                return L.marker(waypoint.latLng, { 
                    icon: customIcon 
                });
            }
        });

        // Add to map and store reference
        routingControl.addTo(map);
        routingControlRef.current = routingControl;

        // Cleanup function
        return () => {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
                routingControlRef.current = null;
            }
        };
    }, [map, waypoints]);

    return null;
};

const MapaRutas = ({ rutaSeleccionada }) => {
    // Ensure waypoints exists and is an array
    const waypoints = rutaSeleccionada?.waypoints || [];

    return (
        <MapContainer 
            className="border rounded-lg z-30" 
            center={[2.441, -76.606]} 
            zoom={14} 
            style={{ height: "100%", width: "100%" }}
            whenReady={(mapInstance) => {
                // Optional: Additional map initialization
                mapInstance.target.invalidateSize();
            }}
        >
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {waypoints.length > 1 && (
                <RoutingMachine waypoints={waypoints} />
            )}
        </MapContainer>
    );
};

export default MapaRutas;