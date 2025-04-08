import GestorDocumentos from "@/components/admin/GestorDocumentos";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Archivo() {
  return (
    <div className=" w-full h-full bg-white border rounded-lg">
      <div className="w-1/2 h-1/3 grid grid-cols-2 gap-5 p-10">
        <Link
          href="/secure/administrador/informes"
          className="border flex justify-start items-center p-10 gap-5 rounded-lg"
        >
          <Image src="/folder.png" width={100} height={100} alt="folder" />
          <div>
            <h1 className="text-2xl">Informes</h1>
            <p className="text-gray-500">1000 informes</p>
          </div>
        </Link>
        <Link
          href="/secure/administrador/certificados"
          className=" border flex justify-start items-center p-10 gap-5 rounded-lg"
        >
          <Image src="/folder.png" width={100} height={100} alt="folder" />
          <div>
            <h1 className="text-2xl">Cetificados</h1>
            <p className="text-gray-500">1000 certificados</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Archivo;
