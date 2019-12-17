import React from 'react'
import FormularioUsers from '../../components/FormularioUsers/FormularioUsers'
import { navigate } from '@reach/router'
const NuevoChofer = () => {
    const CATEGORIA_DRIVE = 1
    const TITULO = "Nuevo Chofer"
    const NAVIGATE_TO = "/choferes"

    const botonesExtra = (
        <button type="submit">Agregar y continuar con Vehiculo</button>
    )
    const afterHandler = () => {
        console.log("submit del form con el boton nuevo")
        navigate('/vehiculos/nuevo')
    }
    return (<>
        <FormularioUsers
            titulo={TITULO}
            categoria={CATEGORIA_DRIVE}
            navigateTo={NAVIGATE_TO}
            extraButtons={botonesExtra}
            afterInsertHandler={afterHandler} />
    </>)
}

export default NuevoChofer