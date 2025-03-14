"use client";

import { useVehiculo } from "@/context/VehiculoContext";
import { useState } from "react";

const Tabla = ({ openModal }) => {
    const { vehiculos } = useVehiculo();
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);

    const handleDetails = (vehiculo) => {
        setSelectedVehiculo(vehiculo);
        openModal("details", vehiculo); // Pasa el vehículo al modal
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {vehiculos.map((item) => (
                    <tr key={item.id}>
                        <td>{item.marca}</td>
                        <td>{item.modelo}</td>
                        <td>{item.placa}</td>
                        <td>
                            <button onClick={() => handleDetails(item)}>Detalles</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Tabla;