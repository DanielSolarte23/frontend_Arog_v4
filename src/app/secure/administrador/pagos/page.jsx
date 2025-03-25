'use client'
import ClientesTabla from '@/components/admin/TablaClientes';
import PagosTabla from '@/components/admin/TablaPagos'
import React, { useState } from 'react'

function Pagos() {
  const [isPago, setisPago] = useState(false);
  return (
    <>
      {isPago ? (<ClientesTabla isPago={isPago} setisPago={setisPago} />)
        :
        (<PagosTabla isPago={isPago} setisPago={setisPago} />)}
    </>
  )
}

export default Pagos