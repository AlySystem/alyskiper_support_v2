import React from 'react'
import NewVehicleForm from '../../components/NewVehicleForm/NewVehicleForm'
import { navigate } from '@reach/router'

const NuevoVehiculo = () => {

    const botonesExtra = (
        <button type="submit">Agregar y continuar</button>
    )

    const afterHandler = () => {
        console.log("Redireccionado a asociar")
        navigate('/vehiculos/asociar')
    }

    return (
        <>
            <NewVehicleForm
                extraButtons={botonesExtra}
                afterInsertHandler={afterHandler}
            />
        </>
    )
}

export default NuevoVehiculo