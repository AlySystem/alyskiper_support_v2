import React, { useRef, useState } from 'react'
import TrademarkSelect from '../../components/VehicleSelects/TrademarkSelect'
import ModelSelect from '../../components/VehicleSelects/ModelSelect'
import { ACTUALIZAR_VEHICULO } from '../../Mutations/index'
import { OBTENER_VEHICULO_BY_ID } from '../../Queries/index'
import { useMutation, useQuery } from '@apollo/react-hooks'

const CambiarAtributosVehiculo = (props) => {

    const CAMBIAR_MARCA = 1
    const CAMBIAR_MODELO = 2

    const [vehicleInput, setVehicleInput] = useState()

    const { data: vehicleData } = useQuery(OBTENER_VEHICULO_BY_ID, {
        fetchPolicy: "network-only",
        variables: { id: props.vehicleId },
        onCompleted: data => { setVehicleInfo(data.getSkiperVehicleByVehicleId); console.log("vehicledata", data) },
        onError: err => { console.log("error", err) }
    })

    const [updateVehicle] = useMutation(ACTUALIZAR_VEHICULO, {
        onCompleted: _ => { alert("Cambiada correctamente") },
        onError: err => { console.log(err) }
    })
    const select = useRef()

    const setVehicleInfo = (vehicle) => {
        /*
        id: Int
        license_plate: String!
        lat: String
        lon: String
        IdCatTravel: Int!
        IdVehiclecatalog: Int!
        IdTrademark: Int!
        IdModel: Int!
        IdYear: Int!
        */

        let vehicleInput = {
            id: vehicle.id,
            license_plate: vehicle.license_plate,
            IdCatTravel: vehicle.skiperCatTravel.id,
            IdVehiclecatalog: vehicle.vehicleCatalog.id,
            IdTrademark: vehicle.vehicleTrademark.id,
            IdModel: vehicle.vehicleModel.id,
            IdYear: vehicle.vehicleYear.id
        }

        setVehicleInput(vehicleInput)

        return vehicleInput
    }

    const cambiarHandler = async _ => {

        if (!select.current.selectedOptions)
            return

        if (!props.vehicleId) {
            console.log("vehicleId undefined")
            return
        }

        let input = vehicleInput
        console.log("Antes del cambio", input)
        let valor = select.current.selectedOptions[0]
        switch (props.idchange) {
            case 1: //marca
                input.IdTrademark = parseInt(valor.value)
                break;
            case 2: //modelo
                input.IdModel = parseInt(valor.value)
                break;
            default:
                return
        }

        console.log("despues del cambio", input)
        await updateVehicle({
            variables: {
                input:input
            }
        })

        if (props.callback) {
            props.callback()
        }
    }

    return (<>
        {vehicleData ?
            <div>
                <strong>Seleccionar nuev@ {props.text}</strong>
                {props.idchange == CAMBIAR_MARCA ? <TrademarkSelect register={select} name="id" /> : null}
                {props.idchange == CAMBIAR_MODELO ? <ModelSelect register={select} name="id" /> : null}
                <button onClick={cambiarHandler}>Cambiar</button>
            </div>
            : null
        }
    </>)
}

export default CambiarAtributosVehiculo