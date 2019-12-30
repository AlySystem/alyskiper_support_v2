import React, { useEffect,forwardRef, useImperativeHandle } from 'react'
import AgentCategorySelect from '../AgentCategorySelect/AgentCategorySelect'
import useForm from 'react-hook-form'
import { AGENTE_POR_USUARIO } from '../../Queries/index'
import { NUEVO_AGENTE } from '../../Mutations/index'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

const FrmAgent = forwardRef((props,ref) => {

    const { loadAgent } = useLazyQuery(AGENTE_POR_USUARIO, {
        onCompleted: data => {
            console.log(data)
            setFormValues(data.searchAgentByIdUser)
        },
        onError: err => console.log(err)
    })

    useEffect(() => {
        if (props.userId) {
            loadAgent({
                variables: {
                    idUser: props.userId
                }
            })
        }
    }, [props.userId])

    const { register, handleSubmit, errors, setValue } = useForm()

    const [addAgent] = useMutation(NUEVO_AGENTE, {
        onCompleted: (data) => {
            console.log("Agente ingresado correctamente")
            if (props.callback) {
                console.log("ingreso al evento handler normal")
                props.callback(data.registerAgent, null)
            }
        },
        onError: (err) => {
            console.log("Error al ingresar el Agente")
            console.error(err)
            if (props.callback) {
                console.log("ingreso al evento handler normal")
                props.callback(null, err)
            }
        }

    })

    const agentSubmit = (values) => {
        console.log(values)
    }

    const setFormValues = (object) => {
        for (var key of Object.keys(object)) {
            console.log("key %s value %s", key, object[key])
            setValue(key, object[key])
        }
    }

    const shouldShowCategorySelect = () => {
        if (props.categoryId)
            return <></>
        else
            return (
                <div>
                    <label>Categoria de Agente</label>
                    <AgentCategorySelect />
                </div>
            )
    }

    const getFormValues = _ => {
        let elements = document.getElementById(props.formId || "agentForm").elements
        //console.log(elements)
        return {
            identity: elements.identity.value
        }
    }

    const validar = ({identity})=>{
        return identity ? true : false
    }

    const enviarForm = (userId) => {
        let formData = getFormValues()
        formData.iduser = userId
        let isValid = validar(formData)
        if(!isValid){
            return "Identificacion Invalida"
        }

        addAgent({
            variables: {
                input: formData
            }
        })
    }

    useImperativeHandle(ref, () => ({
        submitAgentForm() {
            return enviarForm();
        }
    }))

    return (<>
        <form id={props.formId || "agentForm"} onSubmit={
            (e) => {
                e.preventDefault()
                handleSubmit(agentSubmit)
            }
        } ref={props.formRef}>
            <div className="separador">
                <label>Identificacion</label>
                <input
                    name="identity"
                    ref={register}
                    placeholder="Identificacion"
                />
                {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
            </div>
            {shouldShowCategorySelect()}
        </form>
    </>)
})

export default FrmAgent