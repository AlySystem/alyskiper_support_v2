import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CAMBIAR_CONTRASENA_EMAIL } from '../../Mutations/index'

const UpdatePassword = _ => {

    const [error, setError] = useState()
    const [updatePassword] = useMutation(CAMBIAR_CONTRASENA_EMAIL, {
        onCompleted: data => {
            alert("Contraseña cambiada exitosamente")
            console.log(data)
            setError(null)
        },
        onError: err => {
            alert("Error al cambiar la contraseña")
            setError(null)
            console.log(err.message)
        }
    })

    const validacion = (email, password) => {

        if (!email || !password) {
            return 'Email o contraseña en blanco'
        }

        if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return 'Correo no valido'
        }

        if (password.length < 8) {
            return 'La contraseña debe tener una longitud de 8 o mas caracteres'
        }

        return null
    }

    const setearPassword = (email, password) => {
        updatePassword({
            variables: {
                input: {
                    email: email,
                    password: password,
                    repeatpassword: password
                }
            }
        })
    }

    const buttonClickHandler = (e) => {
        e.preventDefault()
        let form = document.getElementById("frm")
        let email = form.elements.email.value
        let pass = form.elements.password.value

        let error = validacion(email, pass)
        if (error) {
            setError(error)
            return
        }

        console.log("%s - %s", email, pass)

        setearPassword(email, pass)
    }

    return (
        <>
            <div align="center">
                <h2><p>Cambiar Contraseña</p></h2>
                <form id="frm">
                    <div>
                        <label>Correo</label>
                        <input name="email" onChange={() => { setError() }} type="text" placeholder="Email" />

                        <label>Contraseña</label>
                        <input name="password" onChange={() => { setError() }} type="text" placeholder="Contraseña Nueva" />

                        <label id="lblError" className="errorText">{error}</label>
                    </div>
                    <button onClick={buttonClickHandler}>Actualizar</button>
                </form>
            </div>
        </>
    )
}

export default UpdatePassword