import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl: "/ubicacion.png",
  iconSize: [40, 50],
  iconAnchor: [25, 50],
});

export default function UbicacionModal({ isOpen, onClose }) {
  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState(2.4450675958889403);
  const [longitud, setLongitud] = useState(-76.61579396519906);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (search.length > 2) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${search}&countrycodes=CO&viewbox=-76.65579396519906,2.4750675958889403,-76.57579396519906,2.4150675958889403&bounded=1`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data));
    } else {
      setSuggestions([]);
    }
  }, [search]);

  function handleSearchSelect(lat, lon, displayName) {
    setLatitud(lat);
    setLongitud(lon);
    setNombre(displayName);
    setSuggestions([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3002/api/ubicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, latitud, longitud }),
    })
      .then((res) => res.json())
      .then(() => onClose());
      alert("Ubicación registrada con éxito");
  }

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLatitud(e.latlng.lat);
        setLongitud(e.latlng.lng);
      },
    });
    return <Marker position={[latitud, longitud]} icon={customIcon} draggable />;
  }

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-5 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Agregar Ubicación</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ubicación"
            className="w-full p-2 border rounded mb-2"
          />
          <ul className="bg-white border rounded shadow max-h-40 overflow-auto">
            {suggestions.map((s, index) => (
              <li
                key={index}
                onClick={() => handleSearchSelect(s.lat, s.lon, s.display_name)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {s.display_name}
              </li>
            ))}
          </ul>
          <MapContainer center={[latitud, longitud]} zoom={15} className="h-64 w-full mt-2">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la ubicación"
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="bg-verde text-white p-2 rounded w-full">
              Guardar
            </button>
          </form>
          <button onClick={onClose} className="mt-2 text-red-500">Cancelar</button>
        </div>
      </div>
    )
  );
}
