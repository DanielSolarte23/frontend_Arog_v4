'use client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';

const FormularioCertificado = ({ onCreacionExitosa }) => {
    const [cargando, setCargando] = useState(false);
    const [formulario, setFormulario] = useState({
        nombreEntidad: '',
        nombrePersona: '',
        numeroIdentificacion: '',
        tipoIdentificacion: 'DNI',
        concepto: '',
        fechaExpedicion: '',
        fechaVencimiento: '',
        numeroReferencia: '',
        lugarExpedicion: '',
        cargoCertificante: '',
        referencia: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            // Generar el PDF usando jspdf
            const doc = new jsPDF();

            // Agregar contenido al PDF
            doc.text(`Nombre de la Entidad: ${formulario.nombreEntidad}`, 20, 20);
            doc.text(`Nombre de la Persona: ${formulario.nombrePersona}`, 20, 30);
            doc.text(`Número de Identificación: ${formulario.numeroIdentificacion}`, 20, 40);
            doc.text(`Tipo de Identificación: ${formulario.tipoIdentificacion}`, 20, 50);
            doc.text(`Concepto: ${formulario.concepto}`, 20, 60);
            doc.text(`Fecha de Expedición: ${formulario.fechaExpedicion}`, 20, 70);
            doc.text(`Fecha de Vencimiento: ${formulario.fechaVencimiento}`, 20, 80);
            doc.text(`Número de Referencia: ${formulario.numeroReferencia}`, 20, 90);
            doc.text(`Lugar de Expedición: ${formulario.lugarExpedicion}`, 20, 100);
            doc.text(`Cargo del Certificante: ${formulario.cargoCertificante}`, 20, 110);
            doc.text(`ID de Referencia: ${formulario.referencia}`, 20, 120);

            // Guardar el PDF
            const pdfBlob = doc.output('blob');

            // Preparar datos para la API
            const formData = new FormData();
            formData.append('file', pdfBlob, 'certificado.pdf');
            formData.append('tipoDocumento', 'CERTIFICADO');
            formData.append('referenciaId', formulario.referencia || '');

            // También podemos guardar los metadatos adicionales como un campo adicional
            const metadatosJSON = JSON.stringify({
                nombreEntidad: formulario.nombreEntidad,
                nombrePersona: formulario.nombrePersona,
                numeroIdentificacion: formulario.numeroIdentificacion,
                tipoIdentificacion: formulario.tipoIdentificacion,
                concepto: formulario.concepto,
                fechaExpedicion: formulario.fechaExpedicion,
                fechaVencimiento: formulario.fechaVencimiento,
                numeroReferencia: formulario.numeroReferencia,
                lugarExpedicion: formulario.lugarExpedicion,
                cargoCertificante: formulario.cargoCertificante,
            });

            formData.append('metadata', metadatosJSON);

            const response = await fetch('http://localhost:3002/api/documentos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Certificado creado exitosamente');
                // Reiniciar formulario
                setFormulario({
                    nombreEntidad: '',
                    nombrePersona: '',
                    numeroIdentificacion: '',
                    tipoIdentificacion: 'DNI',
                    concepto: '',
                    fechaExpedicion: '',
                    fechaVencimiento: '',
                    numeroReferencia: '',
                    lugarExpedicion: '',
                    cargoCertificante: '',
                    referencia: '',
                });
                // Notificar al componente padre
                onCreacionExitosa();
            } else {
                const data = await response.json();
                alert(`Error al crear el certificado: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al crear el certificado:', error);
            alert('Error al crear el certificado');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Crear Nuevo Certificado</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de la Entidad
                        </label>
                        <input
                            type="text"
                            name="nombreEntidad"
                            value={formulario.nombreEntidad}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lugar de Expedición
                        </label>
                        <input
                            type="text"
                            name="lugarExpedicion"
                            value={formulario.lugarExpedicion}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de la Persona
                        </label>
                        <input
                            type="text"
                            name="nombrePersona"
                            value={formulario.nombrePersona}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo ID
                            </label>
                            <select
                                name="tipoIdentificacion"
                                value={formulario.tipoIdentificacion}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                            >
                                <option value="DNI">DNI</option>
                                <option value="NIE">NIE</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="NIF">NIF</option>
                            </select>
                        </div>

                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Número ID
                            </label>
                            <input
                                type="text"
                                name="numeroIdentificacion"
                                value={formulario.numeroIdentificacion}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Concepto del Certificado
                    </label>
                    <textarea
                        name="concepto"
                        value={formulario.concepto}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                        required
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Referencia
                        </label>
                        <input
                            type="text"
                            name="numeroReferencia"
                            value={formulario.numeroReferencia}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Expedición
                        </label>
                        <input
                            type="date"
                            name="fechaExpedicion"
                            value={formulario.fechaExpedicion}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Vencimiento
                        </label>
                        <input
                            type="date"
                            name="fechaVencimiento"
                            value={formulario.fechaVencimiento}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cargo del Certificante
                        </label>
                        <input
                            type="text"
                            name="cargoCertificante"
                            value={formulario.cargoCertificante}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID de Referencia (opcional)
                        </label>
                        <input
                            type="number"
                            name="referencia"
                            value={formulario.referencia}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verde"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={cargando}
                        className={`px-4 py-2 rounded-md text-white font-medium 
              ${cargando ? 'bg-gray-400' : 'bg-verde hover:bg-verde'}`}
                    >
                        {cargando ? 'Procesando...' : 'Crear Certificado'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCertificado;