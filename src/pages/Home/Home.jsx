import React, { useState } from "react";
import MenuMain from "../Menu/Menu";
import Login from "../Login/Login";
import { Layout, Breadcrumb } from "antd";
import { Router, Link } from "@reach/router";
import Dashboard from "../Dashboard/Dashboard";
import logo1 from "../../assets/img/AlySystem.png";
import logo from "../../assets/img/A.png";
import { navigate } from "@reach/router";
import MainComercios from "../Comercios/MainComercios";
import MainEjecutivos from "../Ejecutivos/MainEjecutivos";
import NuevoEjecutivo from "../Ejecutivos/NuevoEjecutivo";
import NuevoChofer from '../Choferes/NuevoChofer'
import MainChoferes from "../Choferes/MainChoferes";
import MainVehiculos from "../Vehiculos/MainVehiculos";
import NuevoVehiculo from "../Vehiculos/NuevoVehiculo";
import AsociarVehiculo from "../Vehiculos/AsociarVehiculo";
import NuevoWallet from '../Wallet/NuevoWallet'
import MainWallet from '../Wallet/MainWallet'
import RecargaWallet from '../Wallet/RecargaWallet'
import ActualizarUser from '../Usuarios/ActualizarUser'
import { Result } from "antd";
import Img from "../../components/img/Img";
import logo8 from "../../assets/img/Loader-Skiper (1).gif"
import DriverImg from '../../components/DriverImg/DriverImg'
import FormularioTarifas from '../Tarifas/FormularioTarifas'
import FormularioUsers from "../../components/FormularioUsers/FormularioUsers";
import NuevoEj from '../Ejecutivos/NuevoEj'
import AlyChat from '../../components/chat/AlyChat'
import UpdatePassword from '../Usuarios/UpdatePassword'
import Gmap from '../Dashboard/Gmap'
import Websocket from '../Dashboard/websocket'
import UsuariosConectados from '../Dashboard/UsuariosConectados'
import UltimosUsuarios from '../Usuarios/UltimosUsuarios'
import MainTipoCambio from "../Tarifas/MainTipoCambio";

// import logo2 from "../../assets/img/AlySkiper vectorizado y registrado SIN DEGRADAR (1).png";
// import Img from "../../components/img/Img";
const { Header, Content, Footer, Sider } = Layout;
const Jome = () => (
  <Img
    img={logo8}
    width="300"
    height="250"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  />
);
const Notfound = () => (
  <Result
    status="404"
    title="404"
    subTitle="La dirreccion no existe."
    style={{ color: "white" }}
    extra={<Link to="/">Regresar a inicio</Link>}
  />
);
const Home = props => {
  const [collapsed, setCollapsed] = useState(false);
  // const Name = () => {
  //   if (session.searchUser != null) {
  //     const name = session.searchUser.user
  //     return <div>{name}</div>
  //   }
  // }

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <Login />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div>
          {collapsed === true ? (
            <img
              src={logo}
              alt="logo"
              width="60"
              height="50"
              style={{ marginRight: "10px" }}
            />
          ) : (
            <img src={logo1} width="180" alt="logo" />
          )}
        </div>
        <MenuMain />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          {/* <div>
            <Img alt="Logo" width="1500" height="600" img={logo2} />
          </div> */}
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item style={{color: 'white'}}><Name /></Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="back"
            style={{ padding: 24, background: "#fff", minHeight: 360 }}
          >
            <Router>
              <Jome path="/" />
              <Dashboard path="/dashboard" />
              <MainComercios path="/comercios" />
              <MainEjecutivos path="/ejecutivos" />
              <NuevoEjecutivo path="/ejecutivos/nuevo" />
              <NuevoChofer path="/choferes/nuevo" />
              <MainChoferes path="/choferes" />
              <MainVehiculos path="/vehiculos" />
              <NuevoVehiculo path="/vehiculos/nuevo" />
              <AsociarVehiculo path="/vehiculos/asociar" />
              <NuevoWallet path="/wallet/nuevo"/>
              <Notfound default />
              <MainWallet path="/wallet"/>
              <RecargaWallet path="/wallet/recarga"/>
              <ActualizarUser path="/usuarios/actualizarCategoria"/>
              <UpdatePassword path="/usuarios/updatePassword"/>
              <DriverImg path="/choferes/img"/>
              <FormularioTarifas path="/tarifas/nuevo"/>
              <FormularioUsers path="/user/edit/:id"/>
              <NuevoEj path="/ej/nuevo"/>
              <AlyChat path="/chat"/>
              <Gmap path="/gmap"/>
              <Websocket path='/websock'/>
              <UsuariosConectados path="/lastTravel"/>
              <UltimosUsuarios path="/lastUsers"/>
              <MainTipoCambio path="/tarifas/tc/main"/>
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Alyskiper Soporte</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
