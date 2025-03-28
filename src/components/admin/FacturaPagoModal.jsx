import React from 'react';

export default function FacturaPagoModal({
  pago,
  onClose,
  onEdit,
  onDownloadPDF
}) {
  if (!pago) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Detalles de la Factura</h2>

        <div className="space-y-2">
          <p><strong>Cliente:</strong> {`${pago.cliente.nombre} ${pago.cliente.apellido}`}</p>
          <p><strong>Descripción:</strong> {pago.descripcion}</p>
          <p><strong>Fecha de Emisión:</strong> {new Date(pago.fechaEmision).toLocaleDateString()}</p>
          <p><strong>Fecha de Vencimiento:</strong> {new Date(pago.fechaVencimiento).toLocaleDateString()}</p>
          <p><strong>Monto de Pago:</strong> ${pago.montoPago}</p>
          <p><strong>Monto Pagado:</strong> ${pago.montoPagado || '0'}</p>
          <p><strong>Estado de Pago:</strong> {pago.estadoPago}</p>
          <p><strong>Días de Mora:</strong> {pago.diasMora || '0'}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onDownloadPDF}
            className="bg-verde-dos text-white px-4 py-2 rounded flex gap-2 items-center"
          >
            Descargar PDF
            <i class="fa-solid fa-file-pdf"></i>
          </button>
          <div className='flex gap-2'>
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cerrar
            </button>
            <button
              onClick={onEdit}
              className="bg-verde text-white px-4 py-2 rounded hover:bg-verde"
            >
              Editar Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}