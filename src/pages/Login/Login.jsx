import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { AUTENTICAR_USUARIO } from "../../Mutations/index";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import Home from "../Home/Home";
import { Form, Icon, Input, Button, Tooltip } from "antd";
// import Title from "../../components/title/Title";
import img from "../../assets/img/Canguro.svg";
import vali from "./Validatelogin";
import Particles from "react-particles-js";

const Login = props => {
  const [autenticar, { data: userData }] = useMutation(AUTENTICAR_USUARIO);
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleUserChange = e => {
    setEmail(e.target.value);
  };
  const handlePassChange = e => {
    setPassword(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const input = {
      email: email,
      password: password
    };
    setErrors(vali(email, password));
    console.log("el input: ", input);
    autenticar({ variables: { input: input } });
  };
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
  };
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
    <div className="loginContainer">
      <Particles params={par} className="animates" />
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
            {errors.email && (
              <p style={{ color: "red", position: "absolute", marginTop: "0" }}>
                {errors.email}
              </p>
            )}
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
            {errors.password && (
              <p style={{ color: "red", position: "absolute", marginTop: "0" }}>
                {errors.password}
              </p>
            )}
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
            Iniciar Sesion
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
