import React from 'react'
import FormularioUsers from '../../components/FormularioUsers/FormularioUsers'

const NuevoEjecutivo = () => {
    const CATEGORIA_EJECUTIVO = 2
    const NAVIGATE_TO='/ejecutivos'
    const TITULO='Nuevo Ejecutivo'

    return (
        <>
            <FormularioUsers categoria={CATEGORIA_EJECUTIVO} navigateTo={NAVIGATE_TO} titulo={TITULO}/>
        </>
    )
}

export default NuevoEjecutivo