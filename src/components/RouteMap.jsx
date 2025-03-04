'use client'
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const MapWithRoute = ({ points }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // Agrega 'places' si necesitas geocodificación
  });

  const [directions, setDirections] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (isLoaded && points && points.length === 3) {
      const directionsService = new window.google.maps.DirectionsService();
      const waypoints = points.slice(1, -1).map((point) => ({
        location: point,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: points[0],
          destination: points[2],
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            setDirections(response);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, [isLoaded, points]);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={points && points[1] ? points[1] : { lat: 0, lng: 0 }} // Centra el mapa en el punto medio
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : <></>;
};

export default MapWithRoute;