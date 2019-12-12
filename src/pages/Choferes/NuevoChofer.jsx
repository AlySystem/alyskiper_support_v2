import React from 'react'
import FormularioUsers from '../../components/FormularioUsers/FormularioUsers'

const NuevoChofer = () => {
    const CATEGORIA_DRIVE = 1
    const TITULO="Nuevo Chofer"
    const NAVIGATE_TO="/choferes"

    return (<>
        <FormularioUsers titulo={TITULO} categoria={CATEGORIA_DRIVE} navigateTo={NAVIGATE_TO} />
    </>)
}

export default NuevoChofer