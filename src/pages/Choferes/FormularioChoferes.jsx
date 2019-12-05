import React, { useState } from 'react'
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
        email: yup.string().email().required(),
        user: yup.string().required(),
        password: yup.string().required(),
        address: yup.string().required(),
        phone: yup.string().required(),
        identity: yup.string().required(),
        date_birth: yup.date().min(new Date(1901, 1, 1)).max(new Date(3000, 12, 31)),
        // avatar: String,
        country_id: yup.number().positive(),
        city_id: yup.number().positive(),
        idcivil_status: yup.number().positive()
    });

    const { register, handleSubmit, errors } = useForm({ validationSchema: schema })

    const [addUser, { data: dataUser }] = useMutation(NUEVO_USUARIO)
    const [addAgent, { data: dataAgent }] = useMutation(NUEVO_AGENTE)

    const runForm = async (values) => {
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
        try {
            const data = await addUser({
                variables: { input: userInput }
            })
            console.log("logro insertar el user")
            console.log(data)
            if (data.error) {
                console.error(data.error)
            } else {
                submitAgent(data, values.identity)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submitAgent = async (data, identity) => {
        /*const { token } = data
        console.log("el token: " + token)
        const id = jwtDecode(`Bearer ${token}`)*/
        const { id } = data.data.createUser

        const agentInput = {
            user_id: parseInt(id),
            state: true,
            categoryAgent_id: parseInt(CATEGORIA_DRIVER),
            identity: identity
        }
        console.log("El agentInput")
        console.log(agentInput)
        try {
            const data = await addAgent({
                variables: { input: agentInput }
            })
            console.log("logro insertar el agent")
            console.log(data)
            navigate('/choferes')
        } catch (error) {
            console.log(error)
        }
    }

    const onCountrySelectHandler = (e) => {
        setCountry(e.currentTarget.value)
    }

    const onCitiesSelectHandler = (e) => {
        setCity(e.currentTarget.value)
    }

    return (
        <div>
            <form id="frmChofer" onSubmit={handleSubmit(runForm)}>
                <div>
                    <h2><p>Datos Personales</p></h2>
                    <div>
                        <label>Nombre</label>
                        <input name="firstname" ref={register} placeholder="Nombre" />
                        {errors.firstname && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input name="lastname" ref={register} placeholder="Apellido" />
                        {errors.lastname && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Correo</label>
                        <input name="email" ref={register} placeholder="Correo" />
                        {errors.email && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>SponsorId</label>
                        <input name="sponsor_id" ref={register} placeholder="Sponsor" />
                        {errors.sponsor_id && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Telefono</label>
                        <input name="phone" ref={register} placeholder="Telefono" />
                        {errors.phone && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Direccion</label>
                        <input name="address" ref={register} placeholder="Direccion" />
                        {errors.address && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Fecha de Nacimiento</label>
                        <input name="date_birth" ref={register} placeholder="Fecha de Nacimiento" type="date" />
                        {errors.lastname && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Pais</label>
                        <CountriesSelect register={register} name="country_id" onChange={onCountrySelectHandler} />
                        {errors.lastname && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Ciudad</label>
                        <CitiesSlect register={register} name="city_id" onChange={onCitiesSelectHandler} countryId={country} />
                        {errors.lastname && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Estado Civil</label>
                        <CiviStatusSelect register={register} name="idcivil_status" />
                        {errors.lastname && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Identificacion</label>
                        <input name="identity" ref={register} placeholder="Identificacion" />
                        {errors.lastname && "Este campo es requerido"}
                    </div>
                </div>
                <div>
                    <h2><p>Datos de Sesion</p></h2>
                    <div>
                        <label>Usuario</label>
                        <input name="user" ref={register} placeholder="Usuario" />
                        {errors.lastname && "Este campo es requerido"}
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input name="password" type="password" ref={register} placeholder="Sponsor" />
                        {errors.lastname && "Este campo es requerido"}
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