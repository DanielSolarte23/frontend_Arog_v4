'use client'
import GestorDocumentos from "@/components/admin/GestorDocumentos";
import { useDocumentos } from "@/context/DocumentosContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

function Archivo() {

  const {
    documentosInforme,
    documentosCertificado,
    getDocumentoInforme,
    getDocumentosCertificado,
  } = useDocumentos();

  useEffect(() => {
    getDocumentoInforme();
    getDocumentosCertificado();
  }
    , []);

  return (
    <div className="w-full h-full bg-white border rounded-lg">
      <div className="w-full mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Archivos del Sistema</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          <Link
            href="/secure/administrador/informes"
            className="border flex justify-start items-center p-5 md:p-8 gap-3 md:gap-5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0">
              <Image src="/folder.png" width={60} height={60} alt="folder" className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium">Informes</h2>
              <p className="text-gray-500 text-sm md:text-base">{documentosInforme.length} informes</p>
            </div>
          </Link>
          <Link
            href="/secure/administrador/certificados"
            className="border flex justify-start items-center p-5 md:p-8 gap-3 md:gap-5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0">
              <Image src="/folder.png" width={60} height={60} alt="folder" className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium">Certificados</h2>
              <p className="text-gray-500 text-sm md:text-base">{documentosCertificado.length} certificados</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Archivo;