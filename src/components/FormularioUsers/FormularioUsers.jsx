import React, { useState, useEffect } from "react";
import CountriesSelect from "../../components/countriesSelect/CountriesSelect";
import CitiesSlect from "../../components/CitiesSelect/CitiesSelect";
import CiviStatusSelect from "../../components/CivilStatusSelect/CivilStatusSelect";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import useForm from "react-hook-form";
import * as yup from "yup";
import { CREAR_USUARIO, NUEVO_AGENTE } from "../../Mutations/index";
import { USUARIO_POR_EMAIL,OBTENER_PROPIETARIO } from '../../Queries/index'
import { navigate } from "@reach/router";

var jwtDecode = require("jwt-decode");
/**
 * Crea un formulario con los datos basicos para la creacion de un user y un agent
 * ya utiliza la mutation y la query correspondiente para la creacion de todos los agetn
 * recibe de parametro la categoria que se va a crear
 * 
 * @param props.categoria la categoria del Agente que se va a crear
 *                        1: DRIVE
 *                        2: EXCECUTIVE
 *                        3: COMMERCE
 * 
 * @param props.navigateTo la ruta a donde debera regresar una vez haya realizado un ingreso correcto
 * @param porps.titulo titulo que mostrara el form
 * 
 * @returns el formulario completo
 */
const FormularioUsers = props => {
    /*-- Constantes de componente --*/
    const CATEGORIA = props.categoria
    const ON_SUCCESS_NAVIGATE_TO = props.navigateTo

    /*-- variables de estado --*/
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [formData, setFormData] = useState()
    const [identity, setIdentity] = useState()
    const [edit, setEdit] = useState(false)

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
        identity: yup.string().required(),
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

    useEffect(() => {
        if (!edit) {
            findUserById({
                variables: { id: props.id }
            })
            setEdit(true)
        }
    }, [props.id])

    /* Si viene a editar el registro */
    const [idCityVal,setIdCityVal] = useState()
    const [idCountryVal,setCountryIdVal] = useState()
    const [idCivilStatusVal,setIdCivilStatusVal] = useState()
    const setFormValues = (object) => {
        setIdCivilStatusVal(object.civilStatus? object.civilStatus.id:1)
        setCountryIdVal(object.country.id)
        setIdCityVal(object.city.id)
        setCountry(object.country.id)
        console.log(object)
        for (var key of Object.keys(object)) {
            console.log("key %s value %s",key,object[key])
            setValue(key, object[key])
        }
    }

    /* funcion de efecto en caso que venga el registro a editar */
    useEffect(() => {
        if (props.userAgentValues) {
            setFormValues(props.userAgentValues)
        }
    }, [props.userAgentValues])

    /* Mutation de creacion usuario agente y query de usuario por email */
    const [findUserById] = useLazyQuery(OBTENER_PROPIETARIO, {
        onCompleted: (data) => data.searchUser ? setFormValues(data.searchUser): console.log("data is null"),
        onError: (err) => { console.error(err) }
    })
    const [findUserInfo] = useLazyQuery(USUARIO_POR_EMAIL, {
        onCompleted: (data) => onCompletedSponsorIdFind(data.searchUserByEmail),
        onError: (err) => { console.error(err) }
    })
    const [addUser] = useMutation(CREAR_USUARIO, {
        onCompleted: data => {
            if (data.signup.error) {
                alert(data.signup.error.message)
                console.log(data.signup.error)
            } else {
                console.log("Usuario ingresado correctamente")
                onUserAdded(data);
            }
        },
        onError: error => {
            console.log("Error al ingresar el usuario")
            console.error(error);
        }
    })
    const [addAgent] = useMutation(NUEVO_AGENTE, {
        onCompleted: (data) => {
            console.log("Agente ingresado correctamente")
            if (props.afterInsertHandler) {
                console.log("ingreso al evento handler final")
                props.afterInsertHandler()
            } else {
                console.log("ingreso al evento handler normal")
                navigate(ON_SUCCESS_NAVIGATE_TO)
            }
        },
        onError: (err) => {
            console.log("Error al ingresar el Agente")
            console.error(err)
        }

    })

    /* evento que se dispara al insertar el usuario correctamente */
    const onUserAdded = data => {
        console.log(data)
        if (data.signup.error) {
            console.error(data.signup.error)
        } else {
            submitAgent(data, identity);
        }
    }

    /* validacion de email */
    const emailValido = (email) => {
        console.log("email desde funcion ", email)
        return /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g.test(email)
    }

    /* evento que se dipara al realizar la query de usuario */
    const onCompletedSponsorIdFind = (data) => {
        if (data) {
            const userData = formData
            userData.sponsor_id = data.id
            console.log("userData: ", userData)
            setFormData(userData)
            addUser({
                variables: {
                    input: userData
                }
            })
        } else {
            alert("El correo del sponsor no existe")
            console.log("El correo del sponsor no existe")
        }
    }

    /* Evento que se dispara al reaizar submit al form */
    const valuesHandler = values => {
        console.log(values)
        const userInput = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            user: values.user,
            password: values.password,
            address: values.address,
            phone: values.phone,
            date_birth: values.date_birth,
            // identity: values.identity,
            // avatar: String,
            country_id: parseInt(values.country_id),
            city_id: parseInt(values.city_id),
            idcivil_status: parseInt(values.idcivil_status)
        }
        console.log("input");
        console.log({ input: userInput })
        setIdentity(values.identity)
        setFormData(userInput)

        console.log("email:", values.sponsor_email.trim())
        if (values.sponsor_email.trim() == '') {
            userInput.sponsor_id = 1
            console.log(userInput)
            addUser({
                variables: {
                    input: userInput
                }
            })
        } else {
            if (emailValido(values.sponsor_email.trim())) {
                console.log("El email es valido")
                findUserInfo({
                    variables: {
                        email: values.sponsor_email
                    }
                })
            } else {
                console.log("El email no es valido")
            }
        }
    }

    /* evento que se llama cuando se creo el nuevo usuario */
    const submitAgent = async (data, identity) => {
        const { token } = data.signup.data;
        console.log("el token: " + token);
        const id = jwtDecode(`Bearer ${token}`);
        if (!data.signup) {
            console.log(data);
            console.log("no ingreso usuario");
            return;
        }
        console.log(data);
        //const { id } = data.signup

        const agentInput = {
            user_id: parseInt(id.sub),
            state: true,
            categoryAgent_id: parseInt(CATEGORIA),
            identity: identity
        };
        console.log("El agentInput");
        console.log(agentInput);
        try {
            const data = await addAgent({
                variables: { input: agentInput }
            });
            console.log("logro insertar el agent");
            console.log(data);
            //navigate(ON_SUCCESS_NAVIGATE_TO);
        } catch (error) {
            console.log(error);
        }
    }

    const onCountrySelectHandler = e => {
        setCountry(e.currentTarget.value);
    }

    const onCitiesSelectHandler = e => {
        setCity(e.currentTarget.value);
    }
    
    if ((!CATEGORIA && !ON_SUCCESS_NAVIGATE_TO) && !edit) {
        return (<><h2 className="errorText"><p>Debe definir la categoria y el navigate</p></h2></>)
    }

    return (
        <div>
            <form id="frmChofer" onSubmit={handleSubmit(valuesHandler)}>
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
                            onChange={onCitiesSelectHandler}
                            countryId={country}
                            defvalue={idCityVal}
                        />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Estado Civil</label>
                        <CiviStatusSelect register={register} name="idcivil_status" defvalue={idCivilStatusVal} />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div className="separador">
                        <label>Identificacion</label>
                        <input
                            name="identity"
                            ref={register}
                            placeholder="Identificacion"
                        />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                </div>
                <div>
                    <h2>
                        <p>Datos de Sesion</p>
                    </h2>
                    <div>
                        <label>Usuario</label>
                        <input name="user" ref={register} placeholder="Usuario" />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            ref={register}
                            placeholder="Password"
                        />
                        {errors.lastname && <h4><p>"Este campo es requerido"</p></h4>}
                    </div>
                </div>
                <div>
                    <button type="submit">Agregar</button>
                    {props.extraButtons}
                </div>
            </form>
        </div>
    );
};

export default FormularioUsers;
