import React from 'react'

function Encuentas() {
  return (
    <div  className='bg-white w-full h-full border rounded-lg'>
        <div className='border-b h-1/10 px-2 flex items-center justify-end'>
            <button className='bg-verde-principal px-5 py-2 text-white rounded-md'>Añadir Encuesta</button>
        </div>
        <div className='h-9/10 grid grid-cols-4 grid-rows-4 gap-5 p-10'>
            <div className='border max-h-'>1</div>
        </div>
    </div>
  )
}

export default Encuentas