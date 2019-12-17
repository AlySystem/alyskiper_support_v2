import React, { useState } from 'react'
import UserInfo from '../../components/UserInfo/UserInfo'
import { AGENTE_POR_USUARIO } from '../../Queries/index'
import { NUEVO_AGENTE } from '../../Mutations/index'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import AgentCategorySelect from '../../components/AgentCategorySelect/AgentCategorySelect'


const ActualizarUser = () => {
    const [agent, setAgent] = useState()
    const [userData, setUserData] = useState()
    var AgentCategory = React.createRef()

    const [loadAgent] = useLazyQuery(AGENTE_POR_USUARIO, {
        onCompleted: (data) => data ? (setAgent(data.searchAgentByIdUser), console.log(data), alert("El agente existe")) : console.log(data.errors[0].message),
        onError: (err) => { console.log("Error en encontrar Agent"); console.error(err.message) }
    })
    const [addAgent] = useMutation(NUEVO_AGENTE, {
        onCompleted: (data) => {
            console.log(data)
            console.log("Agente ingresado correctamente")
            alert("Agente ingresado correctamente")
        },
        onError: (err) => {
            console.log("Error al ingresar el Agente")
            console.error(err)
        }

    })

    const userInfoCallback = (values) => {
        if (values) {
            console.log(values)
            setUserData(values)
            loadAgent({
                variables: {
                    iduser: values.id
                }
            })
        } else {
            alert("El correo ingresado no corresponde a ningun usuario")
        }
    }
    
    const clickHandler = () => {
        console.log(AgentCategory)
        let categoria = parseInt(AgentCategory.current.selectedOptions[0].value)
        console.log(categoria)
        if (!userData) {
            alert("No se han cargado los datos del usuario")
            return
        }
        if (agent) {
            alert("El usuario ya tiene la categoria " + agent.categoryAgent.name + " asignada")
            return
        }
        const identficacion = document.getElementById("identificacion")
        if (identficacion.value == '') {
            alert("Debe ingresar identificacion")
            return
        }
        
        const inputValues = {
            user_id: userData.id,
            state: true,
            identity: identficacion.value,
            categoryAgent_id: categoria
        }
     
        addAgent({
            variables: { input: inputValues }
        })
    }

    return (<>
        <h2 align="center"><p>Actualizar Categoria de Usuario</p></h2>

        <UserInfo callback={userInfoCallback} />

        <div align="center">
            <br />
            <br />
            <label >Identificacion</label>
            <input id="identificacion" placeholder="Identificacion"></input>
            <label>Categoria</label>
            <AgentCategorySelect register={AgentCategory} />
            <button onClick={clickHandler}>Actualizar Usuario</button>
        </div>
    </>)
}

export default ActualizarUser