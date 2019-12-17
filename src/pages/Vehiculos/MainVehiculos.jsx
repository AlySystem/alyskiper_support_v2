import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { Modal } from 'antd'
import { navigate } from '@reach/router'
import NuevaMarca from './NuevaMarca'
import NuevoAnio from './NuevoAnio'
import NuevoModelo from './NuevoModelo'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import { USUARIO_POR_EMAIL } from '../../Queries/index'
import { VEHICULO_USUARIO } from '../../Queries/index'
const MainVehiculos = () => {

    /* Eventos de Nueva Marca  */
    const [modalNuevaMarcaVisible, setModalNuevaMarcaVisible] = useState()

    const showModalNuevaMarca = () => {
        setModalNuevaMarcaVisible(true)
    }

    const handleModalNuevaMarcaOk = e => {
        setModalNuevaMarcaVisible(false)
    }

    /* Eventos Nuevo Año */
    const [modalNuevoAnioVisible, setModalNuevoAnioVisible] = useState()

    const showModalNuevoAnio = () => {
        setModalNuevoAnioVisible(true)
    }

    const handleModalNuevoAnioOk = e => {
        setModalNuevoAnioVisible(false)
    }

    /* Eventos de Nuevo Modelo */
    const [modalNuevoModeloVisible, setmodalNuevoModeloVisible] = useState()

    const showModalNuevoModelo = () => {
        setmodalNuevoModeloVisible(true)
    }
    const handleModalNuevoModeloOk = (e) => {
        setmodalNuevoModeloVisible(false)
    }

    /*-- Obtencion de usuarios --*/
    const [email, setEmail] = useState()
    const [userId, setUserId] = useState()

    const [loadUserData] = useLazyQuery(USUARIO_POR_EMAIL, {
        variables: { email: email },
        onCompleted: (data) => fillDatasource(data),
        onError: (error) => console.error(error)
    })
    const [loadVehicleData] = useLazyQuery(VEHICULO_USUARIO, {
        variables: { id: userId },
        onCompleted: (vehiculos) => {
            console.log("los vehiculos", vehiculos)
            const finalRows = [{
                license_plate: vehiculos.getVehicleByUserId.license_plate,
                trademark: vehiculos.getVehicleByUserId.vehicleTrademark.name,
                model: vehiculos.getVehicleByUserId.vehicleModel.name,
                year: vehiculos.getVehicleByUserId.vehicleYear.year,
                cattravel: vehiculos.getVehicleByUserId.skiperCatTravel.name
            }]

            setVehiculos(finalRows)
            console.log(vehiculos)
        },
        onError: (error) => console.error(error)
    }
    )

    const [vehiculos, setVehiculos] = useState()

    const columns = [{
        title: "Placa",
        dataIndex: "license_plate",
        key: "1"
    }, {
        title: "Marca",
        dataIndex: "trademark",
        key: "2"
    }, {
        title: "Modelo",
        dataIndex: "model",
        key: "3"
    }, {
        title: "Año",
        dataIndex: "year",
        key: "4"
    }, {
        title: "Categoria de Viaje",
        dataIndex: "cattravel",
        key: "5"
    }
    ]

    const fillDatasource = (userData) => {
        console.log("userdata", userData)
        if (!userData.searchUserByEmail) {
            /* aqui no encontro usuario */
            return
        }
        const { id } = userData.searchUserByEmail
        setUserId(id)
        loadVehicleData()

    }
    const findUserButtomHandler = () => {
        var txtemail = document.getElementById("email")
        console.log(txtemail.value)
        setEmail(txtemail.value)
        loadUserData()

    }

    return (
        <>
            <div>
                <Modal
                    title="Nueva Marca"
                    visible={modalNuevaMarcaVisible}
                    onOk={handleModalNuevaMarcaOk}
                    onCancel={handleModalNuevaMarcaOk}
                    footer={null}
                    destroyOnClose={true}
                >
                    <NuevaMarca callback={handleModalNuevaMarcaOk}></NuevaMarca>
                </Modal>
                <Modal
                    title="Nuevo Año"
                    visible={modalNuevoAnioVisible}
                    onOk={handleModalNuevoAnioOk}
                    onCancel={handleModalNuevoAnioOk}
                    footer={null}
                    destroyOnClose={true}
                    maskClosable={true}
                >
                    <NuevoAnio callback={handleModalNuevoAnioOk}></NuevoAnio>
                </Modal>
                <Modal
                    title="Nuevo Modelo"
                    visible={modalNuevoModeloVisible}
                    onOk={handleModalNuevoModeloOk}
                    onCancel={handleModalNuevoModeloOk}
                    footer={null}
                    destroyOnClose={true}
                    maskClosable={true}
                >
                    <NuevoModelo callback={handleModalNuevoModeloOk}></NuevoModelo>
                </Modal>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "vertical" }} >
                    <div className="separador">
                        <button onClick={() => navigate('/vehiculos/nuevo')}>Nuevo Vehiculo</button>
                    </div>
                    <div className="separador">
                        <button onClick={showModalNuevaMarca} >Nueva Marca</button>
                    </div>
                    <div className="separador">
                        <button onClick={showModalNuevoAnio} >Nuevo Año</button>
                    </div>
                    <div className="separador">
                        <button onClick={showModalNuevoModelo} >Nuevo Modelo</button>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "vertical" }}>
                    <div className="separador">
                        <label htmlFor="email">Email</label>
                        <input id="email" placeholder="Email" />
                    </div>
                    <div>
                        <br/>
                        <button onClick={findUserButtomHandler}>Buscar por email</button>
                    </div>
                </div>
                
                <div>
                    <FilteredGrid columns={columns} rows={vehiculos} />
                </div>
            </div>
        </>
    )
}

export default MainVehiculos 