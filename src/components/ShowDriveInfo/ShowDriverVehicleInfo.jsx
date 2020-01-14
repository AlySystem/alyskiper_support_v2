import React from 'react'
import { VEHICULO_USUARIO } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'
import { Modal } from 'antd'
import { useState } from 'react'
import CambiarCategoria from '../../pages/Vehiculos/CambiarCategoria'
import CambiarAtributosVehiculo from '../../pages/Vehiculos/CambiarAtributosVehiculo'

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
                return
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
                        <a className="btnsmall" onClick={_ => { setModalCambiarCategoria(true) }}>Cambiar</a>
                    </td>

                </tr>
                <tr>
                    <td><label style={style}><b>Tipo:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleCatalog ? vehicle.vehicleCatalog.name : ''}</label></td>
                </tr>
                <tr>
                    <td><label style={style}><b>Modelo:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleModel ? vehicle.vehicleModel.name : ''}</label>
                        <a className="btnsmall" onClick={_ => { setModalCambiarModeloVisible(true) }}>Cambiar</a>
                    </td>
                </tr>
                <tr>
                    <td><label style={style}><b>Año:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleYear ? vehicle.vehicleYear.year : ''}</label></td>
                </tr>
                <tr>
                    <td><label style={style}><b>Marca:</b></label></td>
                    <td><label style={style}>{vehicle.vehicleTrademark ? vehicle.vehicleTrademark.name : ''}</label>
                        <a className="btnsmall" onClick={_ => { setModalCambiarMarcaVisible(true) }}>Cambiar</a>
                    </td>
                </tr>
            </tbody>
        </table>)
    }

    const [modalCambiarCategoria, setModalCambiarCategoria] = useState(false)
    const [vehicleId, setVehicleId] = useState()


    const [modalCambiarMarcaVisible, setModalCambiarMarcaVisible] = useState(false)
    const modalCambiarMarca = _ => {
        return (<>
            <Modal
                title="Cambiar Marca"
                visible={modalCambiarMarcaVisible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => { setModalCambiarMarcaVisible(false) }}
            >
                <CambiarAtributosVehiculo idchange={1} vehicleId={vehicleId} text="Marca" callback={() => setModalCambiarMarcaVisible(false)} />
            </Modal>
        </>)
    }

    const [modalCambiarModeloVisible, setModalCambiarModeloVisible] = useState(false)
    const modalCambiarModelo = _ => {
        return (<>
            <Modal
                title="Cambiar Modelo"
                visible={modalCambiarModeloVisible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => { setModalCambiarModeloVisible(false) }}
            >
                <CambiarAtributosVehiculo idchange={2} vehicleId={vehicleId} text="Modelo"  callback={() => setModalCambiarModeloVisible(false)} />
            </Modal>
        </>)
    }

    return (<>
        {vehicleData && (vehicleData.getVehicleByUserId ? getVehicleTable(vehicleData.getVehicleByUserId) : null)}
        {modalCambiarMarca()}
        {modalCambiarModelo()}
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