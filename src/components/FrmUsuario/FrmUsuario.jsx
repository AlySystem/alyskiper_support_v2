import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { OBTENER_PROPIETARIO } from "../../Queries/index"
import { CREAR_USUARIO } from '../../Mutations/index'
import useForm from "react-hook-form"
import * as yup from "yup"
import { setLocale } from 'yup'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import CountriesSelect from '../../components/countriesSelect/CountriesSelect'
import CitiesSlect from '../../components/CitiesSelect/CitiesSelect'
import CiviStatusSelect from '../../components/CivilStatusSelect/CivilStatusSelect'
import yupLocale from '../../utils/yupLocale'

const FrmUsuario = forwardRef((props, ref) => {
    setLocale(yupLocale )
    /*-- Esquema yup para validacion de form --*/
    const schema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        email: yup
            .string()
            .email()
            .required(),
        user: yup.string().required(),
        password: yup.string().required(),
        address: yup.string().required(),
        phone: yup.string().required(),
        date_birth: yup
            .date()
            .min(new Date(1901, 1, 1))
            .max(new Date(3000, 12, 31)),
        country_id: yup.number().positive(),
        city_id: yup.number().positive().required(),
        idcivil_status: yup.number().positive()
    })

    /* objetos basicos de react-hook-form  */
    const { register, handleSubmit, errors, setValue } = useForm({
        validationSchema: schema
    })

    /*-- setear Valores del Form --*/
    const [idCityVal, setIdCityVal] = useState()
    const [idCountryVal, setCountryIdVal] = useState()
    const [idCivilStatusVal, setIdCivilStatusVal] = useState()
    const [country, setCountry] = useState()
    //const [city, setCity] = useState()
    const setFormValues = (object) => {
        setIdCivilStatusVal(object.civilStatus ? object.civilStatus.id : 1)
        setCountryIdVal(object.country.id)
        setIdCityVal(object.city.id)
        setCountry(object.country.id)
        console.log(object)
        for (var key of Object.keys(object)) {
            console.log("key %s value %s", key, object[key])
            setValue(key, object[key])
        }
    }

    /* Mutation de creacion usuario agente y query de usuario por id */
    const [addUser] = useMutation(CREAR_USUARIO, {
        onCompleted: data => {
            if (data.signup.error) {
                alert(data.signup.error.message)
                console.log(data.signup.error)
                if (props.callback) {
                    props.callback(null, data.signup.error)
                }
            } else {
                console.log("Usuario ingresado correctamente")
                if (props.callback) {
                    props.callback(data.signup, null)
                }
            }
        },
        onError: error => {
            console.log("Error al ingresar el usuario")
            console.error(error)
            if (props.callback) {
                props.callback(null, error)
            }
        }
    })
    const [findUserById] = useLazyQuery(OBTENER_PROPIETARIO, {
        onCompleted: (data) => data.searchUser ? setFormValues(data.searchUser) : console.log("data is null"),
        onError: (err) => { console.error(err) }
    })

    const onCountrySelectHandler = e => {
        setCountry(e.currentTarget.value);
    }

    // const onCitiesSelectHandler = e => {
    //     setCity(e.currentTarget.value);
    // }

    useEffect(() => {
        if (props.userId) {
            findUserById({
                variables: {
                    id: parseInt(props.userId)
                }
            })
        }
    }, [props.userId])

    const getFormValues = _ => {
        let elements = document.getElementById(props.formId || "userForm").elements
        //console.log(elements)
        return {
            firstname: elements.firstname.value,
            lastname: elements.lastname.value,
            email: elements.email.value,
            user: elements.email.value,
            password: elements.password.value,
            address: elements.address.value,
            phone: elements.phone.value,
            date_birth: elements.date_birth.value,
            country_id: parseInt(elements.country_id.selectedOptions[0].value),
            city_id: parseInt(elements.city_id.selectedOptions[0] ? elements.city_id.selectedOptions[0].value : null),
            idcivil_status: parseInt(elements.idcivil_status.selectedOptions[0].value)
        }
    }

    const validar =  (formData) => {
        let validacion = null
        try {
            validacion = schema.validateSync(formData)
        } catch (err) {
            console.log(err)
        }

        return validacion
    }

    const enviarForm = () => {
        const formData = getFormValues()
        const isValid =  validar(formData)
        console.log("El isvalid",isValid)
        if (isValid instanceof Array) {
            console.log(JSON.stringify(isValid))
            return JSON.stringify(isValid)
        }

        console.log(formData)
        /*addUser({
            variables: {
                input: formData
            }
        })*/
    }

    useImperativeHandle(ref, () => ({
        submitUserForm() {
            return enviarForm();
        },
        getFormValues() {
            let isValid = validar(getFormValues)
            return getFormValues();
        }
    }));

    const submitUsuario = (values) => {
        const userInput = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            user: values.email,
            password: values.password,
            address: values.address,
            phone: values.phone,
            date_birth: values.date_birth,
            country_id: parseInt(values.country_id),
            city_id: parseInt(values.city_id),
            idcivil_status: parseInt(values.idcivil_status)
        }
        console.log(userInput)
        /*addUser({
            variables: {
                input: userInput
            }
        })*/
    }

    return (<>
        <div>
            <form id={props.formId || "userForm"} onSubmit={handleSubmit(submitUsuario)} ref={props.formRef}>
                <h2>
                    <p>{props.titulo}</p>
                </h2>
                <div
                    style={{ display: "flex", flexWrap: "wrap", alignItems: "vertical" }}
                >
                    <div className="separador">
                        <label>Nombre</label>
                        <input name="firstname" ref={register} placeholder="Nombre" />
                        {errors.firstname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Apellido</label>
                        <input name="lastname" ref={register} placeholder="Apellido" />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Correo</label>
                        <input name="email" ref={register} placeholder="Correo" />
                        {errors.email && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Password</label>
                        <input name="password" ref={register} placeholder="Contraseña" type="password" />
                        {errors.password && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Correo del Sponsor</label>
                        <input name="sponsor_email" ref={register} placeholder="Sponsor Email" />
                    </div>
                    <div className="separador">
                        <label>Telefono</label>
                        <input name="phone" ref={register} placeholder="Telefono" />
                        {errors.phone && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Direccion</label>
                        <input name="address" ref={register} placeholder="Direccion" />
                        {errors.address && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Fecha de Nacimiento</label>
                        <input
                            name="date_birth"
                            ref={register}
                            placeholder="Fecha de Nacimiento"
                            type="date"
                        />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Pais</label>
                        <CountriesSelect
                            register={register}
                            name="country_id"
                            onChange={onCountrySelectHandler}
                            defvalue={idCountryVal}
                        />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Ciudad</label>
                        <CitiesSlect
                            register={register}
                            name="city_id"
                            countryId={country}
                            defvalue={idCityVal}
                        />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Estado Civil</label>
                        <CiviStatusSelect
                            register={register}
                            name="idcivil_status"
                            defvalue={idCivilStatusVal} />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                </div>
            </form>
        </div>
    </>)

})

export default FrmUsuario