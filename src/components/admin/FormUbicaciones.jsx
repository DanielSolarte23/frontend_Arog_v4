import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Posición central de Popayán
const POPAYAN_CENTER = {
  lat: 2.4448143,
  lng: -76.6147395
};

// Límites de Popayán para restringir resultados
const POPAYAN_BOUNDS = {
  north: 2.5048143,
  south: 2.3848143,
  east: -76.5547395,
  west: -76.6747395
};

const customIcon = L.icon({
  iconUrl: "/ubicacion.png",
  iconSize: [40, 50],
  iconAnchor: [25, 50],
});

// Componente para centrar el mapa cuando cambian las coordenadas
function MapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function UbicacionModal({ isOpen, onClose }) {
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState({
    lat: POPAYAN_CENTER.lat,
    lng: POPAYAN_CENTER.lng
  });
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // Función para realizar la búsqueda cuando se presiona el botón
  const handleSearch = () => {
    if (search.length > 2) {
      setIsLoading(true);
      setError(null);

      const viewbox = `${POPAYAN_BOUNDS.west},${POPAYAN_BOUNDS.north},${POPAYAN_BOUNDS.east},${POPAYAN_BOUNDS.south}`;

      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&countrycodes=CO&viewbox=${viewbox}&bounded=1&limit=10&city=Popayán`)
        .then((res) => {
          if (!res.ok) throw new Error("Error en la búsqueda");
          return res.json();
        })
        .then((data) => {
          // Filtrar resultados para dar prioridad a los de Popayán
          const filteredData = data.filter(item =>
            item.display_name.toLowerCase().includes('popayán') ||
            item.display_name.toLowerCase().includes('popayan')
          );

          // Si hay resultados filtrados, usarlos; si no, usar todos los resultados
          setSuggestions(filteredData.length > 0 ? filteredData : data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error de búsqueda:", err);
          setError("Error al buscar ubicaciones. Intente de nuevo.");
          setIsLoading(false);
          setSuggestions([]);
        });
    } else {
      setError("Ingrese al menos 3 caracteres para buscar");
    }
  };

  // Función para manejar la tecla Enter en el campo de búsqueda
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  function handleSearchSelect(lat, lon, displayName) {
    setPosicion({
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    });
    setNombre(displayName.split(',')[0]); // Extraer solo el nombre principal
    setSuggestions([]);
    setSearch("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("Por favor ingrese un nombre para la ubicación");
      return;
    }

    setIsLoading(true);
    fetch("http://localhost:3002/api/ubicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        latitud: posicion.lat,
        longitud: posicion.lng
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar la ubicación");
        return res.json();
      })
      .then(() => {
        alert("Ubicación registrada con éxito");
        onClose();
      })
      .catch((err) => {
        console.error("Error de registro:", err);
        alert("Error al registrar la ubicación. Intente de nuevo.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function LocationMarker() {
    useMapEvents({
      click(e) {
        // Verificar si el clic está dentro de los límites de Popayán
        const { lat, lng } = e.latlng;
        if (
          lat >= POPAYAN_BOUNDS.south &&
          lat <= POPAYAN_BOUNDS.north &&
          lng >= POPAYAN_BOUNDS.west &&
          lng <= POPAYAN_BOUNDS.east
        ) {
          setPosicion(e.latlng);

          // Hacer búsqueda inversa para obtener el nombre del lugar
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
            .then(res => res.json())
            .then(data => {
              if (data && data.display_name) {
                // Extraer un nombre más conciso para la ubicación
                const addressParts = data.address;
                let simpleName = "";

                if (addressParts.road) {
                  simpleName = addressParts.road;
                  if (addressParts.house_number) {
                    simpleName += ` #${addressParts.house_number}`;
                  }
                } else if (addressParts.amenity) {
                  simpleName = addressParts.amenity;
                } else if (addressParts.neighbourhood) {
                  simpleName = addressParts.neighbourhood;
                } else {
                  // Usar las primeras partes del nombre completo
                  simpleName = data.display_name.split(',').slice(0, 2).join(',');
                }

                setNombre(simpleName);
              }
            })
            .catch(err => console.error("Error en búsqueda inversa:", err));
        }
      },
    });

    return (
      <Marker
        position={[posicion.lat, posicion.lng]}
        icon={customIcon}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            setPosicion(position);
          },
        }}
      />
    );
  }

  useEffect(() => {
    // Verificamos que estamos en el cliente
    if (typeof window !== 'undefined') {
      const handleEscKey = (e) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      // Añadir el event listener
      window.addEventListener('keydown', handleEscKey);

      // Limpiar el event listener cuando el componente se desmonte
      return () => {
        window.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isOpen, onClose]);


  // Limpia estados cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setNombre("");
      setPosicion({
        lat: POPAYAN_CENTER.lat,
        lng: POPAYAN_CENTER.lng
      });
      setSearch("");
      setSuggestions([]);
      setError(null);
    }
  }, [isOpen]);

  // Cerrar la lista de sugerencias cuando se hace clic fuera de ella
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestions.length > 0 && !e.target.closest('.search-container')) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [suggestions.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Agregar Ubicación en Popayán</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div className="relative mb-4 search-container">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Buscar ubicación en Popayán"
              className="w-full p-2 border rounded"
              disabled={isLoading}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || search.length < 3}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {isLoading ? "..." : "Buscar"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded shadow max-h-60 w-full overflow-auto mt-1">
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => handleSearchSelect(s.lat, s.lon, s.display_name)}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                >
                  <div className="font-medium">{s.display_name.split(',')[0]}</div>
                  <div className="text-xs text-gray-500">{s.display_name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border rounded overflow-hidden h-72 mb-4">
          <MapContainer
            center={[posicion.lat, posicion.lng]}
            zoom={15}
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            <MapCenter center={[posicion.lat, posicion.lng]} />
          </MapContainer>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la ubicación
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Parque Caldas, Universidad del Cauca"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Latitud:</span> {posicion.lat.toFixed(6)}
            </div>
            <div>
              <span className="font-medium">Longitud:</span> {posicion.lng.toFixed(6)}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-verde text-white p-2 rounded flex-1 hover:bg-green-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar ubicación"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-red-500 text-red-500 p-2 rounded hover:bg-red-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}