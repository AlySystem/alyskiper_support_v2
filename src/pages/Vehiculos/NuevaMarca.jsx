import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { NUEVA_MARCA } from '../../Mutations/index'
import useForm from 'react-hook-form'

const NuevaMarca = (props) => {

    const [addTradeMark] = useMutation(NUEVA_MARCA)
    const { register, handleSubmit, errors } = useForm()

    const submitHandler = async (values) => {
        
        try {
            const inputValues = {
                name: values.name
            }

            const data = await addTradeMark({
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
                    <input id="name" name="name" ref={register({ required: true })} type="text" placeholder="Nueva Marca" />
                    {errors.name && <span className="errorText">Debe ingresar el nombre de una marca</span>}
                </div>
                <button type="submit">Agregar</button>
            </form>
        </>
    )
}

export default NuevaMarca