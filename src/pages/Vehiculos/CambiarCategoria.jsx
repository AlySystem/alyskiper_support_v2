import React, { useRef } from 'react'
import CatTravelSelect from '../../components/VehicleSelects/CatTravelSelect'
import { ACTUALIZAR_CATEGORIA_VEHICULO } from '../../Mutations/index'
import { useMutation } from '@apollo/react-hooks'

const CambiarCategoria = (props) => {

    const [updateCatTravel] = useMutation(ACTUALIZAR_CATEGORIA_VEHICULO)
    const select = useRef()

    const cambiarHandler = async _ => {
        console.log(select)

        if (!select.current.selectedOptions)
            return
            
        if (!props.vehicleId) {
            console.log("vehicleId undefined")
            return
        }

        let valor = select.current.selectedOptions[0]
        console.log(props)
        console.log("el value "+valor.value)
        console.log("el vehicle "+props.vehicleId)
        await updateCatTravel({
            variables: {
                idVehicle: props.vehicleId,
                idCatTravel: parseInt(valor.value)
            }
        })

        alert("Categoria cambiada correctamente")

        if(props.callback){
            props.callback()
        }
    }



    return (<>
        <div>
            <strong>Seleccione la nueva Categoria</strong>
            <CatTravelSelect register={select} name="id" />
            <button onClick={cambiarHandler}>Cambiar</button>
        </div>
    </>)
}

export default CambiarCategoria