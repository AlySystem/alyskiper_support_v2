import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { AUTENTICAR_USUARIO } from "../../Mutations/index";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import Home from "../Home/Home";
import { Form, Icon, Input, Button, Tooltip } from "antd";
// import Title from "../../components/title/Title";
// import img from "../../assets/img/Canguro.svg";
import vali from './Validatelogin'

const Login = props => {
  const [autenticar, { data: userData }] = useMutation(AUTENTICAR_USUARIO);
  const [email, setEmail] = useState({ email: '' })
  const [password, setPassword] = useState({ password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleUserChange = e => {
    setEmail(e.target.value)
  }
  const handlePassChange = e => {
    setPassword(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    const input = {
      email: email,
      password: password
    }
    setErrors(vali(email, password))
    console.log("el input: ", input)
    autenticar({ variables: { input: input } })
  }

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (userData) {
      if (userData.signin.error) {
        const label = document.getElementById("lblStatus");
        label.value = userData.signin.error.message;
      } else {
        console.log("El Nuevo Token ", userData.signin.data.token);
        localStorage.setItem("token", userData.signin.data.token);
        navigate("/");
      }
    }
  }, [userData]);

  if (localStorage.getItem("token")) {
    navigate("/");
    console.log("entro al navigate");
    return <Home />;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} className="formu">
        <Form.Item style={{ alignItems: "center" }}>
          <h1 style={{ color: "white", fontSize: "2rem", textAlign: "center" }}>
            Login
          </h1>
          <Tooltip placement="top" title="Correo es necesario">
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Correo"
              onChange={handleUserChange}
            //   defaultValue={email}
            //   vale={email.email}
            />
            {errors.email && <p style={{ color: 'red', position: 'absolute', marginTop: '0' }}>{errors.email}</p>}
          </Tooltip>
        </Form.Item>

        <Form.Item style={{ alignItems: "center" }}>
          <Tooltip placement="top" title="Contraseña es necesario">
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={handlePassChange}
            //   defaultValue={password}
            //   vale={password.password}
            />
            {errors.password && <p style={{ color: 'red', position: 'absolute', marginTop: '0' }}>{errors.password}</p>}
          </Tooltip>
        </Form.Item>
        <div>
          <label id="lblStatus" style={{ width: "100%" }} value="" />
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Iniciar seccion
          </Button>
        </Form.Item>
        {/* <div>
            <button type="submit" style={{ width: "100%" }}>
              Ingresar
            </button>
          </div> */}
      </Form>
    </div>
  );
};

export default Login;
