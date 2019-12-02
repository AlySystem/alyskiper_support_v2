import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { AUTENTICAR_USUARIO } from '../../Mutations/index'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from '@reach/router'
import Home from '../Home/Home'
const Login = () => {
    const [autenticar, { data: userData }] = useMutation(AUTENTICAR_USUARIO)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleUserChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const input = {
            email: email,
            password: password
        }
        console.log('el input: ', input)
        autenticar({ variables: { input: input } })
    }

    useEffect(() => {
        console.log(localStorage.getItem('token'))
        if (userData) {
            if (userData.signin.error) {
                const label = document.getElementById('lblStatus')
                label.value = userData.signin.error.message
            } else {
                console.log('El Nuevo Token ', userData.signin.data.token)
                localStorage.setItem('token', userData.signin.data.token)
                navigate('/')
            }
        }
    }, [userData])

    if (localStorage.getItem('token')) {
        navigate('/')
        console.log('entro al navigate')
        return(<Home/>)
    }

    return (
        <div align="center" style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div
                style={{
                    minWidth: "20vw"

                }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="etiqueta">Email</label>
                        <input onChange={handleUserChange} type="text" placeholder="email" defaultValue={email} style={{ width:"100%" }}></input>
                    </div>
                    <div>
                        <label className="etiqueta">Password</label>
                        <input onChange={handlePassChange} type="password" placeholder="Contraseña" defaultValue={password} style={{ width:"100%" }}></input>
                    </div>
                    <div>
                        <label id="lblStatus" style={{ width:"100%" }} value=""></label>
                    </div>
                    <div>
                        <button type="submit" style={{ width:"100%" }}>Ingresar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
