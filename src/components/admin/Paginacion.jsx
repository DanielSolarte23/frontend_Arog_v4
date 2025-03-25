import React from 'react'

function Paginacion({ currentPage, totalPages, paginate, getPageNumbers }) {
    return (
        <nav className="h-full w-full flex justify-center items-center">
            <div className="flex w-full space-x-1  justify-between">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex gap-2 border items-center justify-center px-4 py-1 rounded-md ${currentPage === 1
                        ? 'text-gray-500 bg-gray-100 cursor-not-allowed'
                        : 'text-gray-700 bg-white hover:bg-zinc-800 hover:text-white transition-colors duration-300'
                        }`}
                >
                    <i className="fa-solid fa-arrow-left"></i>

                    <span>Anterior</span>
                </button>

                <div className="flex gap-2">
                    {getPageNumbers().map((number, index) => (
                        <button
                            key={index}
                            onClick={() => number !== '...' ? paginate(number) : null}
                            className={`hidden sm:block px-4 py-1 rounded-md ${number === currentPage
                                ? 'bg-verde text-verde-dos'
                                : number === '...'
                                    ? 'text-gray-700 cursor-default'
                                    : 'text-gray-700 bg-white hover:bg-zinc-800 hover:text-white border transition-colors duration-300'
                                }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex gap-2 border items-center justify-center px-4 py-1 rounded-md ${currentPage === totalPages
                        ? 'text-gray-500 bg-gray-100 cursor-not-allowed'
                        : 'text-gray-700 bg-white hover:bg-zinc-800 hover:text-white transition-colors duration-300'
                        }`}
                >
                    <span>Siguente</span>
                    <i className="fa-solid fa-arrow-right"></i>

                </button>
            </div>
        </nav>
    )
}

export default Paginacion