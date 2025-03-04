'use client';

import React from 'react';
import Link from 'next/link';

export default function AccesoDenegado() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="text-red-500 text-6xl mb-4">403</div>
        <h1 className="text-2xl font-bold mb-2">Acceso Denegado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos suficientes para acceder a esta página.
        </p>
        <Link href="/auth/inicio" className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition duration-200">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}