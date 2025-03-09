"use client"


import React from "react"

function Certificado () {
    return(
        <div className="w-12/12 h-full  m-4 border-2 rounded-lg  ">
            <div className=" ">
            <h1 className=" h-10 py-4 ml-5 m-4">Certificados</h1>
            </div>
            <div className="flex border-t">
            <div className=" m-4 w-2/4 "> 
                <label className="block text-sm font-medium text-gray-700">Nombres</label>
                <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" /> 
                <label  className="block text-sm font-medium text-gray-700">Tipo de documento</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />
                <label  className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />
                <label  className="block text-sm font-medium text-gray-700">Tipo de certificado</label>
                <select className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" name="" id="">
                    <option value="text">Seleccione tipo de certificado</option>
                </select>
            </div>
            <div className=" m-4 w-2/4 "> 
                <label  className="block text-sm font-medium text-gray-700">Apellidos</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2  mb-4"type="text" /> 
                <label  className="block text-sm font-medium text-gray-700">Documento de identidad</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />
                <label  className="block text-sm font-medium text-gray-700">Fecha de fin</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />
                <label  className="block text-sm font-medium text-gray-700">Firmado por</label>
                <select className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" name="" id="">
                    <option value="text">Seleccione quien firma el documento</option>
                </select>            
                </div> 
            </div>
            <div className="m-4 flex justify-end space-x-4">
                <button className="px-4 border rounded-md py-2 bg-gray-100 hover:bg-gray-300" >Cancelar</button>
                <button className="px-4 border rounded-md py-2  bg-green-500 hover:bg-green-700">Guardar</button>
            </div>
        </div>
    )
}

export default Certificado