import React from 'react'
import { VEHICULO_USUARIO } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'
import { Modal } from 'antd'
import { useState } from 'react'
import CambiarCategoria from '../../pages/Vehiculos/CambiarCategoria'

const ShowDriverVehicleInfo = (props) => {

    const { data: vehicleData } = useQuery(VEHICULO_USUARIO, {
        pollInterval: 3000,
        variables: {
            id: props.idUser
        },
        onCompleted: (data) => {
            if (!data.getVehicleByUserId) {
                alert("Usuario no tiene vehiculo Asignado");
                if (props.callback) props.callback()
            }
            setVehicleId(data.getVehicleByUserId.id)
            console.log("El user " + props.idUser);
            console.log(data);

        },
        onError: (err) => { console.log(err) }
    })

    const style = {
        color: "black",

    }

    const getVehicleTable = (vehicle) => {
        return (<table>
            <tbody>
                <tr>
                    <td><label style={style}><b>Placa:</b></label></td>
                    <td><label style={style}>{vehicle ? vehicle.license_plate : ''}</label></td>
                </tr>
                <tr>
                    <td><label style={style}><b>Categoria:</b></label></td>
                    <td><label style={style}>{vehicle.skiperCatTravel ? vehicle.skiperCatTravel.name : ''}</label>
                        <button onClick={_ => { setModalCambiarCategoria(true) }}>Cambiar</button>
                    </td>

                </tr>
                <tr>
                    <td><label style={style}><b>Tipo:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleCatalog ? vehicle.vehicleCatalog.name : ''}</label></td>
                </tr>
                <tr>
                    <td><label style={style}><b>Modelo:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleModel ? vehicle.vehicleModel.name : ''}</label></td>
                </tr>
                <tr>
                    <td><label style={style}><b>Año:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleYear ? vehicle.vehicleYear.year : ''}</label></td>
                </tr>
                <tr>
                    <td><label style={style}><b>Marca:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleTrademark ? vehicle.vehicleTrademark.name : ''}</label></td>
                </tr>
            </tbody>
        </table>)
    }

    const [modalCambiarCategoria, setModalCambiarCategoria] = useState(false)
    const [vehicleId, setVehicleId] = useState()

    return (<>
        {vehicleData && (vehicleData.getVehicleByUserId ? getVehicleTable(vehicleData.getVehicleByUserId) : null)}
        <Modal
            title="Cambiar Categoria"
            visible={modalCambiarCategoria}
            footer={null}
            destroyOnClose={true}
            onCancel={() => { setModalCambiarCategoria(false) }}
        >
            <CambiarCategoria callback={_ => setModalCambiarCategoria(false)} vehicleId={vehicleId} />
        </Modal>
        <button onClick={props.callback}>Aceptar</button>
    </>)
}

export default ShowDriverVehicleInfo