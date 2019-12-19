import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { AUTENTICAR_USUARIO } from "../../Mutations/index";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import Home from "../Home/Home";
import { Form, Icon, Input, Button, Tooltip } from "antd";
// import Title from "../../components/title/Title";
import vali from "./Validatelogin";
import Particles from "react-particles-js";
import * as yup from 'yup'
import useForm from 'react-hook-form'

const Login = props => {

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required()
	})

	const { register, handleSubmit, errors } = useForm({
		validationSchema: schema
	});

	const [loginError, setLoginError] = useState()

	const [autenticar] = useMutation(AUTENTICAR_USUARIO, {
		onCompleted: data => onAutenticate(data),
		onError: (err) => { setLoginError(err.message); console.log(err.message) }
	});

	const onSubmit = values => {

		const input = {
			email: values.email,
			password: values.password
		}

		console.log("el input: ", input);
		autenticar({ variables: { input: input } });
	}
	const par = {
		particles: {
			number: {
				value: 80,
				density: {
					enable: true,
					value_area: 1200
				}
			},
			color: {
				value: "#03f9fc"
			},
			shape: {
				type: "image",
				stroke: {
					width: 0,
					color: "#000000"
				},
				polygon: {
					nb_sides: 6
				},
				image: {
					src: 'https://alycoin.net/static/media/icon-alyskiper.a6fa461b.png',
					width: 100,
					height: 100
				}
			},
			opacity: {
				value: 1,
				random: true,
				anim: {
					enable: true,
					speed: 1,
					opacity_min: 0,
					sync: false
				}
			},
			size: {
				value: 60.042650760819036,
				random: true,
				anim: {
					enable: false,
					speed: 4,
					size_min: 0.3,
					sync: false
				}
			},
			line_linked: {
				enable: true,
				distance: 150,
				color: "#03F9FC",
				opacity: 1,
				width: 1.1
			},
			move: {
				enable: true,
				speed: 7,
				direction: "none",
				random: true,
				straight: false,
				out_mode: "out",
				bounce: false,
				attract: {
					enable: false,
					rotateX: 600,
					rotateY: 600
				}
			}
		},
		interactivity: {
			detect_on: "canvas",
			events: {
				onhover: {
					enable: true,
					mode: "bubble"
				},
				onclick: {
					enable: true,
					mode: "repulse"
				},
				resize: true
			},
			modes: {
				grab: {
					distance: 400,
					line_linked: {
						opacity: 1
					}
				},
				bubble: {
					distance: 250,
					size: 0,
					duration: 2,
					opacity: 0,
					speed: 3
				},
				repulse: {
					distance: 400,
					duration: 0.4
				},
				push: {
					particles_nb: 4
				},
				remove: {
					particles_nb: 2
				}
			}
		},
		retina_detect: true
	}

	const onAutenticate = (userData) => {
		console.log(localStorage.getItem("token"));
		if (userData) {
			if (userData.signin.error) {
				setLoginError(userData.signin.error.message)
			} else {
				console.log("El Nuevo Token ", userData.signin.data.token);
				localStorage.setItem("token", userData.signin.data.token);
				navigate("/");
			}
		}
	}

	if (localStorage.getItem("token")) {
		navigate("/");
		console.log("entro al navigate");
		return <Home />;
	}

	const getErrors = (field) => {
		console.log("Errors", errors)
		console.log("field:", field)
		console.log("Error Field: ", errors[field])
		return (errors[field] && (
			<p style={{ color: "red", marginTop: "0" }}>
				{errors[field].message}
			</p>
		))
	}

	const getLoginError = () => {
		console.log(loginError)
		return (loginError && (
			<p style={{ color: "red", marginTop: "0" }}>
				{loginError}
			</p>
		))
	}

	return (
		<div className="loginContainer">
			<Particles params={par} className="animates" />
			<Form onSubmit={handleSubmit(onSubmit)} className="formu">
				<Form.Item style={{ alignItems: "center" }}>
					<h1 style={{ color: "white", fontSize: "2rem", textAlign: "center" }}>
						Login
          			</h1>
					<Tooltip placement="top" title="Correo es necesario">
						<input ref={register}
							name="email"
							prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="Correo"
							style={{ height: "35px", width: "100%" }}
						/>
						{getErrors('email')}
					</Tooltip>
				</Form.Item>

				<Form.Item style={{ alignItems: "center" }}>
					<Tooltip placement="top" title="Contraseña es necesario">
						<input
							name="password"
							ref={register}
							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
							type="password"
							placeholder="Password"
							style={{ height: "35px", width: "100%" }}
						/>
						{getErrors('password')}
					</Tooltip>
				</Form.Item>
				<div>
					{getLoginError()}
				</div>
				<div align="right">
					<button
						type="primary"
						htmlType="submit"
						className="login-form-button">
						Iniciar Sesion
        			</button>
				</div>
			</Form>
		</div>
	);
};

export default Login;
