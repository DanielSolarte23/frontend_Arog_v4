"use client"

import React from "react"


function Acertificado () {
    return (
        <div className="w-11/12 h-full m-4 border-2 rounded-md">
                <div className="h-10 py-6 ml-5 m-4">
                    <h1>Archivo de certificados</h1>
                </div>
                <div className="border-t-2 h-96 ">
                    <div className="flex  items-center space-x-2 px-4 py-2 ">
                    <img src="https://img.icons8.com/?size=512&id=dINnkNb1FBl4&format=png" alt="" className="w-11 h-11"/>
                        <button className="px-4 border rounded-md py-2">Informes</button>
                    </div>
                        <button className="px-4 border rounded-md py-2">Certificados</button>
                </div>
        </div>
    )
}


export default Acertificado