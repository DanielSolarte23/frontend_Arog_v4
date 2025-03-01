"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ubicaciones = [
  { lat: 3.43722, lng: -76.5225, nombre: "Cali" },
  { lat: 2.43823, lng: -76.61316, nombre: "Popayán" },
];

function pageAdministrador() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white drop-shadow-md mt-12 p-14 m-24 border-2 border-gray-200 rounded-2xl">
        <nav className="flex">
          <button
            className="bg-lime-600 p-2 mr-7 rounded-xl text-white flex items-center gap-2 hover:bg-lime-700 transition"
            onClick={() => setModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-5 h-5 fill-white"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            <span className="font-medium">Añadir Ruta</span>
          </button>

          <button className="flex items-center gap-2 border-2 border-gray-400 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-gray-600"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
            <span className="text-gray-700 font-medium">Filtrar Por</span>
          </button>
        </nav>
        <section className="flex flex-row-reverse p-16">
          <MapContainer
            center={[37.773972, -119.4179]}
            zoom={5}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap"
            />
            {ubicaciones.map((punto, index) => (
              <Marker key={index} position={[punto.lat, punto.lng]}>
                <Popup>{punto.nombre}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>
      </header>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-normal mb-6">Agregar ruta</h2>
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Origen
                  </label>
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option></option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Destino
                  </label>
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option></option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Horario
                  </label>
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option></option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Vehículo
                  </label>
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option></option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-white border-2 border-gray-300 text-white rounded-md hover:bg-gray-100 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-5 h-5 fill-gray-600"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition"
                >
                  Añadir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default pageAdministrador;
