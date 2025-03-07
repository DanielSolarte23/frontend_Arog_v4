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
                <label className="block text-sm font-medium text-gray-700">Nombre del remitente</label>
                <input className="w-full border-2 border-gray-200 rounded-md py-2 mb-4" type="text" /> 
                <label  className="block text-sm font-medium text-gray-700">Fecha</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />
                <label  className="block text-sm font-medium text-gray-700">Tipo de informe</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />   
            </div>
            <div className=" m-4 w-2/4 "> 
                <label  className="block text-sm font-medium text-gray-700">Asunto</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2  mb-4"type="text" /> 
                <label  className="block text-sm font-medium text-gray-700">Hora</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />
                <label  className="block text-sm font-medium text-gray-700">Dirigido a:</label>
                <input  className="w-full border-2 border-gray-200 rounded-md py-2 mb-4"type="text" />                         
                </div> 
            </div>
            <div className="m-4 w-12/12 grid">
            <label  htmlFor="block text-sm font-medium ">Descripcion</label>
            <input type="text" className="w-12/12 border-gray-200 border-2 rounded-md h-40 mb-4"/>
            </div>
            <div className="m-4 flex justify-end space-x-4">
                <button className="px-4 border rounded-md py-2 bg-gray-100 hover:bg-gray-300" >Cancelar</button>
                <button className="px-4 border rounded-md py-2  bg-green-500 hover:bg-green-700">Guardar</button>
            </div>
        </div>
    )
}

export default Certificado