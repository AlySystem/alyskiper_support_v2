import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { AUTENTICAR_USUARIO } from '../../Mutations/index'
import { useMutation } from '@apollo/react-hooks'

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
		e.preventDefault();
		const input = {
			email: email,
			password: password
		}
		console.log("el input: ", input)
		autenticar({ variables: { input: input } })
	}

	useEffect(() => {
		if (userData) {
			console.log("El Nuevo Token ", userData.signin.data.token)
			localStorage.setItem("token", userData.signin.data.token)


		}
	}, [userData])

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<input onChange={handleUserChange} placeholder="email" defaultValue={email}></input>
				</div>
				<div>
					<input onChange={handlePassChange} type="password" placeholder="Contraseña" defaultValue={password}></input>
				</div>
				<div>
					<button type="submit">Ingresar</button>
				</div>
			</form>
		</div>
	)
}


export default Login