import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "@reach/router";
import { LOGOUT } from "../../Mutations/index";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";

const { SubMenu } = Menu;
var jwtDecode = require("jwt-decode");

const MenuMain = () => {
  const [logout, { data: logoutData }] = useMutation(LOGOUT);

  const handleLogout = async e => {
    const token = localStorage.getItem("token");
    const id = token ? `Bearer ${token}` : "";
    var y = jwtDecode(id);
    console.log("la y", y);
    await logout({ variables: { id: y.sub } });
    console.log(logoutData);
    localStorage.removeItem("token", "");
    navigate("/");
  };

  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="sub0">
          <Link to="/dashboard">
            <Icon type="home" theme="filled" twoToneColor="#020202" />
            <span>
              <span style={{ color: "white" }}>Dashboard </span>
            </span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="appstore" theme="filled" />
              <span>Comercios</span>
            </span>
          }
        >
          <Menu.Item key="3">
            <Link to="/comercios">Admin Comercio</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="pie-chart" theme="filled" />
              <span>Ejecutivo</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/ejecutivos">Ver Ejecutivos</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/ejecutivos/nuevo">Nuevo</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="car" theme="filled" />
              <span>Drive</span>
            </span>
          }
        >
          <Menu.Item key="5">
            <Link to="/choferes">Choferes</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/vehiculos">Vehiculos</Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/vehiculos/asociar">Asociar vehiculos</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="wallet" theme="filled" />
              <span>Wallets</span>
            </span>
          }>
          <Menu.Item key="1">
            <Link to="/wallet">Ver Wallets</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/wallet/nuevo">Nuevo</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/wallet/recarga">Recargar</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub5"
          title={
            <span>
              <Icon type="user" theme="outlined" />
              <span>Usuarios</span>
            </span>
          }>
          <Menu.Item key="1">
            <Link to="/usuarios/actualizarCategoria"><div>Asignar Cat. a Usuario</div></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/usuarios/updatePassword"><div>Cambiar Contraseña</div></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub6"
          title={
            <span>
              <Icon type="file-text" theme="filled" />
              <span>Reportes</span>
            </span>
          }
        >
          <Menu.Item key="6">Generar reportes</Menu.Item>
        </SubMenu>

        <Menu.Item key="7" onClick={handleLogout}>
          <Icon type="logout" />
          <span>Cerar sesion</span>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuMain;
