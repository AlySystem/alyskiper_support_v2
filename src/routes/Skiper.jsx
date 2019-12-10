import React from "react";
import { Link } from "@reach/router";
import Home from "../pages/Home/Home";
import ComercioContainer from "../pages/Comercios/ComerciosContainer";
import { Router } from "@reach/router";
import { Result } from "antd";

const Notfound = () => (
  <Result
    status="404"
    title="404"
    subTitle="La dirreccion no existe."
    extra={<Link to="/home">Regresar a inicio</Link>}
  />
)

const Skiper = () => {
  return (
    <Router>
      {/* <Login path='/login' /> */}
      <Home path="/home" />
      <ComercioContainer path="/comercios" />
      <Notfound default  />
      {/* <Dashboard path='/dashboard' /> */}
    </Router>
  );
};

export default Skiper
