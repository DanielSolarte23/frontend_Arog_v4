import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons'


function TablaRutas() {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg flex flex-col justify-between h-full border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b ">
                    <tr>
                        < th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4  bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 " />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nombre de ruta
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Funcionario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Vehiculo
                        </th>
                        <th scope='col' className='px-6 py-3'>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 " />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Aida Lucia
                        </th>
                        <td className="px-6 py-4">
                            Funcionario
                        </td>
                        <td className="px-6 py-4">
                            CPI681
                        </td>

                        <td >
                            <FontAwesomeIcon icon={faPen} className='h-5 w-5' />

                        </td>
                    </tr>

                </tbody>
            </table>
            <nav className="flex items-center flex-wrap md:flex-row justify-between p-2 border-t" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">3 RUTAS SELECCIONADAS<span className="font-semibold text-gray-900 "></span> <span className="font-semibold text-gray-900 "></span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "><FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4 ' /></a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</a>
                    </li>

                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "><FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 ' /></a>
                    </li>
                </ul>
            </nav>
        </div>


    )
}


export default TablaRutas