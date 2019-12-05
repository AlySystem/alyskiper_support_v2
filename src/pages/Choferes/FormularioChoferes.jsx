import React, { useEffect, useState } from 'react'
import CountriesSelect from '../../components/countriesSelect/CountriesSelect'
import CitiesSlect from '../../components/CitiesSelect/CitiesSelect'
import CiviStatusSelect from '../../components/CivilStatusSelect/CivilStatusSelect'
import { useMutation } from '@apollo/react-hooks';
import useForm from 'react-hook-form'
import * as yup from 'yup'
import { NUEVO_USUARIO, NUEVO_AGENTE } from '../../Mutations/index'
import { navigate } from '@reach/router'
var jwtDecode = require('jwt-decode');

const FormularioChoferes = (props) => {
    const CATEGORIA_DRIVER = 1
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [civilStatus, setCivilStatus] = useState()


    const schema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
    });

    const { register, handleSubmit, errors } = useForm({ validationSchema: schema })

    const [addUser, { data: dataUser, error }] = useMutation(NUEVO_USUARIO)
    const [addAgent, { data: dataAgent }] = useMutation(NUEVO_AGENTE)

    const runForm = (values) => {
        console.log(values)
        const userInput = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            user: values.user,
            password: values.password,
            sponsor_id: values.sponsor_id ? parseInt(values.sponsor_id) : 1,
            address: values.address,
            phone: values.phone,
            date_birth: values.date_birth,
            // avatar: String,
            country_id: parseInt(values.country_id),
            city_id: parseInt(values.city_id),
            idcivil_status: parseInt(values.idcivil_status)
        }
        console.log("input")
        console.log({ input: userInput })
        addUser({
            variables: { input: userInput },
            onError: (error) => {
                console.log(error)
            },
            onCompleted: (data) => {
                console.log("logro insertar el user")
                console.log(data)
                if (data.error) {
                    console.error(data.error)
                } else {
                    submitAgent(data)
                }
            }
        })
    }

    const submitAgent = (data) => {
        const {token} = data
        console.log("el token: " + token)
        const id = jwtDecode(`Bearer ${token}`)
        const agentInput = {
            user_id: parseInt(id),
            state: true,
            categoryAgent_id: parseInt(CATEGORIA_DRIVER),
            identity: parseInt(data.identity)
        }
        addAgent({
            variables: { input: agentInput },
            onError: (error) => {
                console.log(error)
            },
            onCompleted: (data) => {
                console.log("logro insertar el agent")
                console.log(data)
                navigate('/choferes')
            }
        })
    }

    const onCountrySelectHandler = (e) => {
        setCountry(e.currentTarget.value)
    }

    const onCitiesSelectHandler = (e) => {
        setCity(e.currentTarget.value)
    }

    const onCivilStatusSelectHandler = (e) => {
        console.log(e.currentTarget.value)
        setCivilStatus(e.currentTarget.value)
    }

    return (
        <div>
            <form id="frmChofer" onSubmit={handleSubmit(runForm)}>
                <div>
                    <h2><p>Datos Personales</p></h2>
                    <div>
                        <label>Nombre</label>
                        <input name="firstname" ref={register} placeholder="Nombre" />
                        {errors.firstname && "Your input is required"}
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input name="lastname" ref={register} placeholder="Apellido" />
                        {errors.lastname && "Your input is required"}
                    </div>
                    <div>
                        <label>Correo</label>
                        <input name="email" ref={register} placeholder="Correo" />
                    </div>
                    <div>
                        <label>SponsorId</label>
                        <input name="sponsor_id" ref={register} placeholder="Sponsor" />
                    </div>
                    <div>
                        <label>Telefono</label>
                        <input name="phone" ref={register} placeholder="Telefono" />
                    </div>
                    <div>
                        <label>Direccion</label>
                        <input name="address" ref={register} placeholder="Direccion" />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento</label>
                        <input name="date_birth" ref={register} placeholder="Fecha de Nacimiento" type="date" />
                    </div>
                    <div>
                        <label>Pais</label>
                        <CountriesSelect register={register} name="country_id" onChange={onCountrySelectHandler} />
                    </div>
                    <div>
                        <label>Ciudad</label>
                        <CitiesSlect register={register} name="city_id" onChange={onCitiesSelectHandler} countryId={country} />
                    </div>
                    <div>
                        <label>Estado Civil</label>
                        <CiviStatusSelect register={register} name="idcivil_status" onChange={onCivilStatusSelectHandler}></CiviStatusSelect>
                    </div>
                    <div>
                        <label>Identificacion</label>
                        <input name="skiperAgent" ref={register} placeholder="Identificacion" />
                    </div>
                </div>
                <div>
                    <h2><p>Datos de Sesion</p></h2>
                    <div>
                        <label>Usuario</label>
                        <input name="user" ref={register} placeholder="Usuario" />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input name="password" type="password" ref={register} placeholder="Sponsor" />
                    </div>
                </div>
                <div>
                    <button type="submit">Agregar</button>
                </div>
            </form>
        </div>
    )
}

export default FormularioChoferes