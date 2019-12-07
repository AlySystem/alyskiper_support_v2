import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { NUEVO_ANIO } from '../../Mutations/index'
import useForm from 'react-hook-form'

const NuevAnio = (props) => {

    const [addYear] = useMutation(NUEVO_ANIO)
    const { register, handleSubmit, errors } = useForm()

    const submitHandler = async (values) => {
        
        try {
            const inputValues = {
                year: new Date(parseInt(values.year),0,1)
            }
            // console.log(inputValues)
            const data = await addYear({
                variables:{input: inputValues}
            })
            // console.log(data)
            if (props.callback)
                props.callback()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="year">Año</label>
                    <input id="year" name="year" ref={register({ required: true,maxLength:4,minLength:4 })} type="number" placeholder="Año" />
                    {errors.name && <span className="errorText">Debe ingresar un año valido</span>}
                </div>
                <button type="submit">Agregar</button>
            </form>
        </>
    )
}

export default NuevAnio