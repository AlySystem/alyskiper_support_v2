import React, { useState } from "react";
import CountriesSelect from "../../components/countriesSelect/CountriesSelect";
import CitiesSlect from "../../components/CitiesSelect/CitiesSelect";
import CiviStatusSelect from "../../components/CivilStatusSelect/CivilStatusSelect";
import { useMutation } from "@apollo/react-hooks";
import useForm from "react-hook-form";
import * as yup from "yup";
import { CREAR_USUARIO, NUEVO_AGENTE } from "../../Mutations/index";
import { navigate } from "@reach/router";
var jwtDecode = require("jwt-decode");

const FormularioChoferes = props => {
  const CATEGORIA_DRIVER = 1
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  //const [civilStatus, setCivilStatus] = useState()

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
    city_id: yup.number().positive(),
    idcivil_status: yup.number().positive()
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const [addUser] = useMutation(CREAR_USUARIO, {
    onCompleted: data => {
      if (data.signup.error) {
        alert(data.signup.error);
      } else {
        onUserAdded(data);
      }
    },
    onError: error => {
      console.error(error);
    }
  });
  const [addAgent] = useMutation(NUEVO_AGENTE, {
    onCompleted: () => {
      setIdentity();
    }
  });
  const [identity, setIdentity] = useState();
  const onUserAdded = data => {
    console.log("logro insertar el user");
    console.log(data);
    if (data.signup.error) {
      console.error(data.signup.error);
    } else {
      submitAgent(data, identity);
    }
  };

  const runForm = async values => {
    console.log(values);
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
    };
    console.log("input");
    console.log({ input: userInput });
    setIdentity(values.identity);
    addUser({
      variables: { input: userInput }
    });
  };

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
      categoryAgent_id: parseInt(CATEGORIA_DRIVER),
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
      navigate("/choferes");
    } catch (error) {
      console.log(error);
    }
  };

  const onCountrySelectHandler = e => {
    setCountry(e.currentTarget.value);
  };

  const onCitiesSelectHandler = e => {
    setCity(e.currentTarget.value);
  };

  return (
    <div>
      <form id="frmChofer" onSubmit={handleSubmit(runForm)}>
        <h2>
          <p>Datos Personales</p>
        </h2>
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "vertical" }}
        >
          <div className="separador">
            <label>Nombre</label>
            <input name="firstname" ref={register} placeholder="Nombre" />
            {errors.firstname && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>Apellido</label>
            <input name="lastname" ref={register} placeholder="Apellido" />
            {errors.lastname && "Este campo es requerido"}
          </div>

          <div className="separador">
            <label>Correo</label>
            <input name="email" ref={register} placeholder="Correo" />
            {errors.email && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>SponsorId</label>
            <input name="sponsor_id" ref={register} placeholder="Sponsor" />
          </div>
          <div className="separador">
            <label>Telefono</label>
            <input name="phone" ref={register} placeholder="Telefono" />
            {errors.phone && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>Direccion</label>
            <input name="address" ref={register} placeholder="Direccion" />
            {errors.address && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>Fecha de Nacimiento</label>
            <input
              name="date_birth"
              ref={register}
              placeholder="Fecha de Nacimiento"
              type="date"
            />
            {errors.lastname && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>Pais</label>
            <CountriesSelect
              register={register}
              name="country_id"
              onChange={onCountrySelectHandler}
            />
            {errors.lastname && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>Ciudad</label>
            <CitiesSlect
              register={register}
              name="city_id"
              onChange={onCitiesSelectHandler}
              countryId={country}
            />
            {errors.lastname && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>Estado Civil</label>
            <CiviStatusSelect register={register} name="idcivil_status" />
            {errors.lastname && "Este campo es requerido"}
          </div>
          <div className="separador">
            <label>Identificacion</label>
            <input
              name="identity"
              ref={register}
              placeholder="Identificacion"
            />
            {errors.lastname && "Este campo es requerido"}
          </div>
        </div>
        <div>
          <h2>
            <p>Datos de Sesion</p>
          </h2>
          <div>
            <label>Usuario</label>
            <input name="user" ref={register} placeholder="Usuario" />
            {errors.lastname && "Este campo es requerido"}
          </div>
          <div>
            <label>Contraseña</label>
            <input
              name="password"
              type="password"
              ref={register}
              placeholder="Sponsor"
            />
            {errors.lastname && "Este campo es requerido"}
          </div>
        </div>
        <div>
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioChoferes;
