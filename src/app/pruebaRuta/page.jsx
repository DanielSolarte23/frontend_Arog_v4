'use client'
import { useRutas } from "@/context/RutasContext";
import { useEffect } from "react";
import React from "react";

function page() {
  const {
    rutas,
    createRuta,
    getRuta,
    deleteRuta,
    getRutas,
    updateRuta,
    deleteRutaRequest,
    errors,
  } = useRutas;

  console.log({rutas});
  
  return <div>page</div>;
}

export default page;
