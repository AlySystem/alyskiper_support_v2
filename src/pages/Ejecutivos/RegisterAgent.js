import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { NUEVO_AGENTE } from "../../Mutations";
import Swal from "sweetalert2";
import { navigate } from "@reach/router"
import "../../scss/loader/_loader.scss";
import { Result } from 'antd';
import { Link } from "@reach/router";

const RegisterAgent = props => {
  const [estado, setestado] = useState(false);
  const [identificacion, setidentificacion] = useState("");
  const [registerAgent, { data, loading, error }] = useMutation(NUEVO_AGENTE);

  const validarFormAgent = () => {
    const novalidoAgent = !identificacion;
    return novalidoAgent;
  };

  useEffect(() => {
    if (data) {
      Swal.fire(
        "Agente Guardado exitosamente!",
        "Revisé la lista de ejecutivos en el sistema.",
        "success"
      );
      navigate('/ejecutivos')
    }
  });

  if (loading) return <div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube" />
    <div class="sk-cube2 sk-cube" />
    <div class="sk-cube4 sk-cube" />
    <div class="sk-cube3 sk-cube" />
  </div>;

  if (error) return <Result
    status="500"
    title="500"
    subTitle="Sorry, the server is wrong."
    extra={<Link to="/">Regresar a inicio</Link>}
  />;

  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        registerAgent({
          variables: {
            input: {
              user_id: props.iduser,
              state: estado,
              identity: identificacion,
              categoryAgent_id: 2,
              create_at: new Date()
            }
          }
        });
      }}
      className="col-md-8 m-3 color-menu letra"
    >
      <div className="form-row">
        <div className="form-group col-md-12">
          <label className="font-weight-bold caja-texto-color-blanco fonts">
            Cedula de identidad
          </label>
          <input
            type="text"
            name="identity"
            autoComplete="off"
            className="form-control shain"
            placeholder="Cedula"
            onChange={e => {
              console.log(e.target.value);
              setidentificacion(e.target.value);
            }}
          />
        </div>
        <div className="form-group col-md-12" style={{ marginBottom: "1rem" }}>
          {
            <button
              onClick={() => {
                setestado(!estado);
              }}
              type="button"
              className={
                estado
                  ? "btn btn-success float-left fonts"
                  : "btn btn-danger float-left fonts"
              }
            >
              {estado ? "Habilitado" : "Deshabilitado"}
            </button>
          }
        </div>
      </div>
      <button
        disabled={validarFormAgent()}
        type="submit"
        className="btn btn-success float-right fonts"
      >
        Agregar Agente
      </button>
    </form>
  );
};

export default RegisterAgent;
