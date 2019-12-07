import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { NUEVO_MODELO } from '../../Mutations/index'
import useForm from 'react-hook-form'

const NuevaMarca = (props) => {

    const [addModel] = useMutation(NUEVO_MODELO)
    const { register, handleSubmit, errors } = useForm()

    const submitHandler = async (values) => {
        
        try {
            const inputValues = {
                name: values.name
            }

            const data = await addModel({
                variables:{input: inputValues}
            })
           
            if (props.callback)
                props.callback()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form id="frmMarca" onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="name">Marca</label>
                    <input id="name" name="name" ref={register({ required: true })} type="text" placeholder="Nuevo Modelo" />
                    {errors.name && <span className="errorText">Debe ingresar un modelo de vehiculo</span>}
                </div>
                <button type="submit">Agregar</button>
            </form>
        </>
    )
}

export default NuevaMarca