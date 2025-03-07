"use client"

import React from "react"
import Link from "next/link"



function Acertificado () {
    return (
        <div className="w-11/12  m-8 ml-20   border-2 rounded-md">
                <div className="h-10 py-6 ml-5 m-4">
                    <h1>Archivo de certificados</h1>
                </div>
                <div className="flex border-t w-full h-96">
                 <Link className="w-11/12 " href="/secure/binformes" >
                <div className="  m-4 py-2 border rounded-lg h-20 hover:bg-gray-100">
                    <div className="flex  items-center space-x-2 px-4 py-2 ">
                    <img src="https://img.icons8.com/?size=512&id=dINnkNb1FBl4&format=png" alt="" className="w-11 h-11"/>
                        <div>
                        <h2>Indormes</h2>
                          <h4>12500 archivos</h4>  
                        </div>
                    </div>
                    </div>
                 </Link>
                 <Link className="w-11/12 " href="/secure/bcertificados">
                <div className="  m-4 py-2 w-11/12 border rounded-lg h-20 hover:bg-gray-100">
                    <div className="flex  items-center space-x-2 px-4 py-2 ">
                    <img src="https://img.icons8.com/?size=512&id=dINnkNb1FBl4&format=png" alt="" className="w-11 h-11"/>
                        <div>
                        <h2>Certificados</h2>
                          <h4>12500 archivos</h4>  
                        </div>
                    </div>
                </div>                      
                 </Link>   
                </div>
        </div>
    )
}


export default Acertificado