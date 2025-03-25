'use client'
import { useState } from "react";

const FormularioMultiPaso = () => {
  const [paso, setPaso] = useState(1);
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  const [tienePlan, setTienePlan] = useState(false);
  const [planPago, setPlanPago] = useState({
    descripcion: "",
    montoPeriodico: "",
    diaPago: "",
    periodicidad: "",
    fechaInicio: "",
  });

  const handleChangeCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleChangePlan = (e) => {
    setPlanPago({ ...planPago, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setTienePlan(checked);
  };

  const siguientePaso = () => {
    if (paso === 1) {
      if (tienePlan) {
        setPaso(2); // Si tiene plan, va al paso 2
      } else {
        setPaso(3); // Si no tiene plan, salta a confirmación
      }
    } else if (paso === 2) {
      setPaso(3); // Del paso 2 va a confirmación
    }
  };

  const pasoAnterior = () => {
    if (paso === 3) {
      // Si viene desde confirmación
      if (tienePlan) {
        setPaso(2); // Si tiene plan, vuelve al paso 2
      } else {
        setPaso(1); // Si no tiene plan, vuelve al paso 1
      }
    } else if (paso === 2) {
      setPaso(1); // Del paso 2 vuelve al paso 1
    }
  };

  const handleSubmit = () => {
    const data = tienePlan ? { ...cliente, planPago } : cliente;
    console.log("Datos a enviar:", data);
    alert("Formulario enviado correctamente");
    // Aquí podrías reiniciar el formulario o redirigir
  };

  // Indicador de progreso
  const renderProgreso = () => {
    return (
      <div className="flex justify-between mb-6">
        <div className={`w-1/3 text-center ${paso >= 1 ? 'text-blue-500 font-bold' : ''}`}>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto mb-1 ${paso >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>1</div>
          <span className="text-sm">Datos del Cliente</span>
        </div>
        <div className={`w-1/3 text-center ${paso >= 2 && tienePlan ? 'text-blue-500 font-bold' : ''}`}>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto mb-1 ${paso >= 2 && tienePlan ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>2</div>
          <span className="text-sm">Plan de Pago</span>
        </div>
        <div className={`w-1/3 text-center ${paso >= 3 ? 'text-blue-500 font-bold' : ''}`}>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto mb-1 ${paso >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>3</div>
          <span className="text-sm">Confirmación</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Registro de Cliente</h1>
      {renderProgreso()}

      {paso === 1 && (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">Datos del Cliente</h2>
          <div className="space-y-3">
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="nombre" 
              placeholder="Nombre" 
              value={cliente.nombre}
              onChange={handleChangeCliente} 
            />
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="apellido" 
              placeholder="Apellido" 
              value={cliente.apellido}
              onChange={handleChangeCliente} 
            />
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="correo" 
              type="email"
              placeholder="Correo" 
              value={cliente.correo}
              onChange={handleChangeCliente} 
            />
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="telefono" 
              placeholder="Teléfono" 
              value={cliente.telefono}
              onChange={handleChangeCliente} 
            />
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="direccion" 
              placeholder="Dirección" 
              value={cliente.direccion}
              onChange={handleChangeCliente} 
            />
            <label className="flex items-center space-x-2 mt-4">
              <input 
                type="checkbox" 
                className="h-5 w-5 text-blue-500" 
                checked={tienePlan} 
                onChange={handleCheckboxChange} 
              /> 
              <span>¿Asignar plan de pago?</span>
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors" 
              onClick={siguientePaso}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {paso === 2 && tienePlan && (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">Plan de Pago</h2>
          <div className="space-y-3">
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="descripcion" 
              placeholder="Descripción" 
              value={planPago.descripcion}
              onChange={handleChangePlan} 
            />
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="montoPeriodico" 
              placeholder="Monto" 
              type="number" 
              value={planPago.montoPeriodico}
              onChange={handleChangePlan} 
            />
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="diaPago" 
              placeholder="Día de pago" 
              type="number" 
              min="1" 
              max="31"
              value={planPago.diaPago}
              onChange={handleChangePlan} 
            />
            <select 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="periodicidad" 
              value={planPago.periodicidad}
              onChange={handleChangePlan}
            >
              <option value="">Seleccionar periodicidad</option>
              <option value="MENSUAL">Mensual</option>
              <option value="SEMANAL">Semanal</option>
            </select>
            <input 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:outline-none" 
              name="fechaInicio" 
              placeholder="Fecha inicio" 
              type="date" 
              value={planPago.fechaInicio}
              onChange={handleChangePlan} 
            />
          </div>
          <div className="mt-6 flex justify-between">
            <button 
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors" 
              onClick={pasoAnterior}
            >
              Volver
            </button>
            <button 
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors" 
              onClick={siguientePaso}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">Confirmación</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-2">Datos del Cliente:</h3>
            <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
            <p><strong>Correo:</strong> {cliente.correo}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            <p><strong>Dirección:</strong> {cliente.direccion}</p>
            
            {tienePlan && (
              <>
                <h3 className="font-medium mt-4 mb-2">Plan de Pago:</h3>
                <p><strong>Descripción:</strong> {planPago.descripcion}</p>
                <p><strong>Monto:</strong> {planPago.montoPeriodico}</p>
                <p><strong>Día de pago:</strong> {planPago.diaPago}</p>
                <p><strong>Periodicidad:</strong> {planPago.periodicidad}</p>
                <p><strong>Fecha inicio:</strong> {planPago.fechaInicio}</p>
              </>
            )}
          </div>
          <div className="mt-6 flex justify-between">
            <button 
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors" 
              onClick={pasoAnterior}
            >
              Volver
            </button>
            <button 
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors" 
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioMultiPaso;