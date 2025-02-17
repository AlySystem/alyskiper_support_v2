import React, { useState } from 'react'
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import { VEHICULO_POR_PLACA, USUARIO_POR_EMAIL, AGENTE_POR_USUARIO } from '../../Queries/index'
import { REGISTRAR_SKIPER_VEHICLE_AGENT } from '../../Mutations/index'
import { navigate } from '@reach/router'

const AsociarVehiculo = () => {
    let placa
    let email
    let isOwner

    let error

    const [vehiculoObject, setVehiculoObject] = useState()
    const [usuarioObject, setUsuarioObject] = useState()
    const [agenteObject, setAgenteObjet] = useState()

    const [loadAgentData] = useLazyQuery(AGENTE_POR_USUARIO, {
        onError: (error) => console.error(error),
        onCompleted: (data) => setAgenteObjet(data.searchAgentByIdUser)
    })

    const [loadUserData] = useLazyQuery(USUARIO_POR_EMAIL, {
        onError: (error) => console.error(error),
        onCompleted: (data) => {
            setUsuarioObject(data.searchUserByEmail)
            loadAgentData({
                variables: {
                    iduser: data.searchUserByEmail.id
                }
            })
        }
    })
    const [loadVehicleData] = useLazyQuery(VEHICULO_POR_PLACA, {
        onError: (error) => console.error(error),
        onCompleted: (data) => setVehiculoObject(data.getVehicleByNumberPlate)
    })

    const [addVehicleToAgent] = useMutation(REGISTRAR_SKIPER_VEHICLE_AGENT, {
        onError: (error) => console.error(error),
        onCompleted: (data) => {
            console.log("El objeto agent: ", data)
            alert("Asociado correctamente")
            navigate('/vehiculos')
        }
    })

    const btnAsociarHandler = () => {
        console.log("el objeto usuario")
        console.log(usuarioObject)
        console.log("el objeto vehiculo")
        console.log(vehiculoObject)
        console.log("el objeto agente")
        console.log(agenteObject)
        console.log("isOwner: ", isOwner.checked)
        if (!usuarioObject) {
            error = "usuario no esta definido"
            return
        }
        if (!vehiculoObject) {
            error = "vehiculo no esta definido"
            return
        }
        if (!agenteObject) {
            error = "No se logro obtener la informacion del agente"
            return
        }

        console.log("el input, ",{
            input: {
                idagent: agenteObject.id,
                idvehicle: vehiculoObject.id,
                isowner: isOwner.checked ? 1 : 0
            }
        })

        addVehicleToAgent({
            variables: {
                input: {
                    idagent: agenteObject.id,
                    idvehicle: vehiculoObject.id,
                    isowner: isOwner.checked ? 1 : 0
                }
            }
        })
    }

    const buscarUsuarioHandler = () => {
        loadUserData({
            variables: {
                email: email.value
            }
        })

    }

    const buscarVehiculoHandler = () => {
        loadVehicleData({
            variables: {
                numberplate: placa.value
            }
        })
    }

    const getVehicleTable = () => {
        return (
            <table>
                <tbody>
                    <tr>
                        <td><label><b>Marca</b></label></td>
                        <td><label >{vehiculoObject ? vehiculoObject.vehicleTrademark.name : ''}</label></td>
                    </tr>
                    <tr>
                        <td><label><b>Modelo</b></label></td>
                        <td><label>{vehiculoObject ? vehiculoObject.vehicleModel.name : ''}</label></td>
                    </tr>
                    <tr>
                        <td><label><b>Año</b></label></td>
                        <td><label>{vehiculoObject ? vehiculoObject.vehicleYear.year : ''}</label></td>
                    </tr>
                    <tr>
                        <td><label><b>Categoria de Viaje</b></label></td>
                        <td><label>{vehiculoObject ? vehiculoObject.skiperCatTravel.name : ''}</label></td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const getUserTable = () => {
        return (<table>
            <tbody>
                <tr>
                    <td><label><b>Nombre:</b></label></td>
                    <td><label id="lblname">{usuarioObject ? usuarioObject.firstname : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Apellido:</b></label></td>
                    <td><label id="lblcountry" >{usuarioObject ? usuarioObject.lastname : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Usuario:</b></label></td>
                    <td><label id="lbluser">{usuarioObject ? usuarioObject.user : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Telefono:</b></label></td>
                    <td><label id="lblphone">{usuarioObject ? usuarioObject.phone : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Pais:</b></label></td>
                    <td><label id="lblcountry" >{usuarioObject ? usuarioObject.country.name : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Ciudad:</b></label></td>
                    <td><label id="lblcity" >{usuarioObject ? usuarioObject.city ? usuarioObject.city.name : '' : '' }</label></td>
                </tr>
            </tbody>
        </table>)
    }

    return (
        <>
            <div align="center" width="100%" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <div>
                    <h2><p>Datos de Usuario</p></h2>
                    <div>
                        <label>Email</label>
                        <input ref={node => email = node} placeholder="Email"></input>
                        <button onClick={buscarUsuarioHandler}>Buscar</button>
                    </div>
                    <div>
                        {usuarioObject && getUserTable()}
                    </div>
                </div>
                <div style={{ paddingLeft: "1vw" }}>
                    <h2><p>Datos de Vehiculo</p></h2>
                    <div>
                        <label>Placa</label>
                        <input ref={node => placa = node} placeholder="Placa"></input>
                        <button onClick={buscarVehiculoHandler}>Buscar</button>
                    </div>
                    <div>
                        {vehiculoObject && getVehicleTable()}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div align="center">
                {error && <h4 className="errorText"> error </h4>}
                <div style={{ display: "flex", justifyContent: "center" }}>

                    <div>
                        <label>Es dueño del vehiculo?</label>
                    </div>
                    <div>
                        <input id="isOwner" ref={node => isOwner = node} type="checkbox" />
                    </div>
                </div>
                <br />
                <br />
                <button onClick={btnAsociarHandler}>Asociar Vehiculo a Usuario</button>
            </div>
        </>
    )
}

export default AsociarVehiculo