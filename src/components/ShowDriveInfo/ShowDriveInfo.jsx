import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { OBTENER_IMGS_SOPORTE } from '../../Queries/index'
import { ACTUALIZAR_ESTADO_AGENTE } from '../../Mutations/index'
import noimage from '../../assets/img/noimage.png'

const ShowDriveInfo = (props) => {
    const { data } = useQuery(OBTENER_IMGS_SOPORTE, {
        variables: {
            idagent: props.agentId
        },
        onCompleted: (data) => { console.log(data); data.getUploadImgAgentByAgent ? onChangeHandler() : console.log("no data") },
        onError: (err) => { console.log(err) }
    })

    const [changeAgentState] = useMutation(ACTUALIZAR_ESTADO_AGENTE, {
        variables: {
            idagent: props.agentId
        },
        onCompleted: (data) => {console.log(data); data.errors ? console.log(data.errors) : alert("Usuario Activado Correctamente") },
        onError: (err) => { console.log(err.errors) }
    })

    const [imgsrc, setImgsrc] = useState(noimage)

    const select = useRef()
    const onChangeHandler = _ => {
        if(!data.getUploadImgAgentByAgent)
            return
            
        let selectedValue = select.current.selectedOptions[0]
        let imgsrc = data.getUploadImgAgentByAgent[selectedValue.value]
        // console.log(data.getUploadImgAgentByAgent[selectedValue.value])
        setImgsrc(imgsrc ? imgsrc : noimage)
    }
    const onActivateHandler = _ => {
        changeAgentState()
    }


    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <span>
                    <select onChange={onChangeHandler} ref={select}>
                        <option value="url_img_identity">Cédula de Identidad</option>
                        <option value="url_img_verify_identity">Perfil con Cédula</option>
                        <option value="url_img_letterone_recomendation">Carta de Recomendación 1</option>
                        <option value="url_img_lettertwo_recomendation">Carta de Recomendación 2</option>
                        <option value="url_img_driver_license">Licencia</option>
                        <option value="url_img_police_record">Record de Policia</option>
                        <option value="url_img_driving_record">Record de Conducción</option>
                        <option value="url_img_vehicle_front">Vehiculo Frente</option>
                        <option value="url_img_vehicle_behind">Vehiculo Atras</option>
                        <option value="url_img_vehicle_side_right">Vehiculo lado Derecho</option>
                        <option value="url_img_vehicle_side_left">Vehiculo lado Izquierdo</option>
                        <option value="url_img_vehicle_inside_one">Vehiculo Interior 1</option>
                        <option value="url_img_vehicle_inside_two">Vehiculo Interior 2</option>
                        <option value="url_img_vehicle_inside_three">Vehiculo Interior 3</option>
                        <option value="url_img_vehicle_inside_four">Vehiculo Interior 4</option>
                        <option value="url_img_insurance">Seguro Vehicular</option>
                        <option value="url_img_vehicle_circulation">Circulación Vehicular</option>
                        <option value="url_img_mechanical_inspection">Inspeccion Mecanica</option>
                        <option value="url_img_gas_emission">Emision de Gases</option>
                        <option value="url_img_license_plate">Placa</option>
                    </select>
                </span>
                <span>
                    <button onClick={onActivateHandler}>Activar Usuario</button>
                </span>
            </div>
            <div align="center">
                <img height="50%" width="50%" style={{ imageOrientation: "from-image" }} src={imgsrc} />
            </div>
        </>
    )
}

export default ShowDriveInfo