import React, { useState, useEffect } from 'react'
import { useMutation } from "@apollo/react-hooks"
import { NUEVO_AGENTE } from '../../Mutatios';
import Swal from 'sweetalert2';

const RegisterAgent = (props) => {

    const [estado, setestado] = useState(false)
    const [identificacion, setidentificacion] = useState('')
    const [registerAgent, {data, loading, error}] = useMutation(NUEVO_AGENTE)

    const validarFormAgent = () => {
        const novalidoAgent = !identificacion;
        return novalidoAgent;
    }

    
    useEffect(() => {
        if(data){
            Swal.fire(
                'Agente Guardado exitosamente!',
                'Revisé la lista de ejecutivos en el sistema.',
                'success'
            )
            props.history.push('/ejecutivos')
        }
    })

    if(loading)
        return(
            <h1>Guardando el agente</h1>
        )
    
    if(error)
        return(
            <h1>error</h1>
        )

    return (
        <form autoComplete="off"
        onSubmit={e => {
            registerAgent({variables:{
                input: {
                    user_id: props.iduser,
                    state: estado,
                    identity: identificacion,
                    categoryAgent_id: 2,
                    create_at:  new Date()
                }
            }})
        }}
            className="col-md-8 m-3 color-menu letra">
            <div className="form-row">
                <div className="form-group col-md-12">
                    <label className="font-weight-bold caja-texto-color-blanco fonts">Cedula de identidad</label>
                    <input 
                        type="text"
                        name="identity"
                        autoComplete="off"
                        className="form-control shain"
                        placeholder="Cedula"
                        onChange={e => { 
                            console.log(e.target.value)
                            setidentificacion(e.target.value) 
                        }}
                    />
                </div>
                <div className="form-group col-md-12">
                    {
                        <button 
                        onClick={()=> { setestado(!estado) }}
                        type="button"
                        className= { estado ? "btn btn-success float-left fonts" : "btn btn-danger float-left fonts" }>
                        { estado ? "Habilitado" : "Deshabilitado" }
                        </button>
                    }
                </div>
            </div>
            <button 
            disabled={validarFormAgent()}
            type="submit" 
            className="btn btn-success float-right fonts">
                Agregar Agente
            </button>
        </form>
    )
}

export default RegisterAgent