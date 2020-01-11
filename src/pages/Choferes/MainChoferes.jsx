import React, { useEffect, useState, useRef } from "react";
import FilteredGrid from "../../components/filteredGrid/FilteredGrid";
import { PROPIETARIOS_QUERY } from "../../Queries/index";
import { useLazyQuery } from "@apollo/react-hooks";
import CountriesSelect from "../../components/countriesSelect/CountriesSelect";
import CitiesSelect from "../../components/CitiesSelect/CitiesSelect";
import "../../scss/loader/_loader.scss";
import { navigate } from "@reach/router";
import { Modal } from 'antd'
import ShowDriveInfo from '../../components/ShowDriveInfo/ShowDriveInfo'
import ShowDriverVehicleInfo from "../../components/ShowDriveInfo/ShowDriverVehicleInfo";
import AsociarImagenes from "../Vehiculos/AsociarImagenes";
//import logger from '../../utils/LogConfig'

const MainChoferes = () => {

  //logger.debug("-- prueba del log ---")
  const CATEGORIA_DRIVER = 1;

  const [countryId, setCountryId] = useState();
  const [cityId, setCityId] = useState();
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();

  const grid = useRef();

  const [load, { called, loading, data }] = useLazyQuery(PROPIETARIOS_QUERY, {
    variables: { id: CATEGORIA_DRIVER, idcity: parseInt(cityId) },
    onCompleted: () => {
      console.log(data);
      onLoadData();
    },
    pollInterval: 5000
  })

  const onLoadData = () => {
    if (data) {
      console.log({ id: CATEGORIA_DRIVER, idcity: parseInt(cityId) });
      console.log(data.getByCategoryAgentIdAndCityId);
      if (data.getByCategoryAgentIdAndCityId.length == 0) {
        setRows([]);
        return;
      }

      const finalRows = data.getByCategoryAgentIdAndCityId[0].agents.map(
        item => {
          return {
            id: item.user.id,
            firstname: item.user.firstname,
            lastname: item.user.lastname,
            email: item.user.email,
            address: item.user.address,
            phone: item.user.phone,
            identity: item.identity,
            create_at: item.user.create_at,
            state: item.state ? "Activo" : "Inactivo",
            showInfo: (crearMenu(item.id,item.user.id)) , //<button onClick={() => { setModalSoporteVisible(true); setModalAgentId(item.id) }}> Soportes</button>,
            //showVehicle: <button onClick={() => { setModalVehicleInfoVisible(true); setUserId(item.user.id) }}>Vehiculo</button>
            //edit: <button onClick={()=>navigate('/user/edit/' + item.user.id)}>Editar</button>
          };
        }
      );
      if (loading) {
        return (
          <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
          </div>
        );
      }

      const columns = [
        {
          title: "Nombre",
          dataIndex: "firstname",
          key: "1",
          ...grid.current.getColumnSearch("firstname")
        },
        {
          title: "Apellido",
          dataIndex: "lastname",
          key: "2"
        },
        {
          title: "Telefono",
          dataIndex: "phone",
          key: "3"
        },
        {
          title: "Dirección",
          dataIndex: "address",
          key: "4"
        },
        {
          title: "Correo",
          dataIndex: "email",
          key: "5",
          ...grid.current.getColumnSearch("email")
        },
        {
          title: "Identificación",
          dataIndex: "identity",
          key: "6"
        },
        {
          title: "Estado",
          dataIndex: "state",
          key: "7"
        },
        {
          title: "Fecha Creacion",
          dataIndex: "create_at",
          key: "8"
        }, {
          title: "Acciones",
          dataIndex: "showInfo",
          key: "9"
        }

      ];
      console.log(columns);
      console.log(finalRows);
      setRows(finalRows);
      setColumns(columns);

      console.log("Entro al useEffect");
    }
  }

  useEffect(() => {
    if (cityId) {
      load();
    }
  }, [cityId]);

  const countrySelectHandler = e => {
    setCountryId(e.currentTarget.value);
  }
  const citiesSelectHandler = e => {
    console.log("El city ID: ", e);
    setCityId(e.currentTarget.value);
  }

  const cityCallbackHandler = id => {
    console.log("entro al callback");
    setCityId(id);
  };

  const [modalSoporteVisible, setModalSoporteVisible] = useState(false)
  const [modalAgentId, setModalAgentId] = useState()
  const modalSoportes = _ => {
    return (<>
      <Modal
        title="Documentos de soporte"
        visible={modalSoporteVisible}
        footer={null}
        destroyOnClose={true}
        width="90%"
        style={{ minHeight: "80%", height: "100vh" }}
        onCancel={() => { setModalSoporteVisible(false) }}
      >
        <div >
          <ShowDriveInfo agentId={modalAgentId} />
        </div>

      </Modal>
    </>)
  }

  const [modalVehicleInfoVisible, setModalVehicleInfoVisible] = useState(false)
  const [userId, setUserId] = useState()
  const modalVehicleInfo = () => {
    return (<>
      <Modal
        title="Informacion de Vehiculo"
        visible={modalVehicleInfoVisible}
        footer={null}
        destroyOnClose={true}
        // style={{ minHeight: "80%", height: "100vh" }}
        onCancel={() => { setModalVehicleInfoVisible(false) }}>
        <div align="center">
          <ShowDriverVehicleInfo idUser={userId} callback={() => setModalVehicleInfoVisible(false)} />
        </div>
      </Modal>
    </>)
  }

  const [modalVehicleImgVisible, setModalVehicleImgVisible] = useState(false)
  const modalVehicleImg = () => {
    return (<>
      <Modal
        title="Soportes de Conductor"
        visible={modalVehicleImgVisible}
        footer={null}
        destroyOnClose={true}
        width="50%"
        onCancel={() => { setModalVehicleImgVisible(false) }}>
        <div align="center" >
          <AsociarImagenes userId={userId} callback = {() => {setModalVehicleImgVisible(false)}}/>
        </div>
      </Modal>
    </>)
  }

  const crearMenu = (agentId,userId) => {
    return(<nav>
      <ul className="nav">
        <li><a href="#">Acciones</a>
          <ul>
            <li><a onClick={() => { setModalSoporteVisible(true); setModalAgentId(agentId) }}>Soportes</a></li>
            <li><a onClick={() => { setModalVehicleInfoVisible(true); setUserId(userId) }}>Vehiculo</a></li>
            <li><a onClick={() => { setModalVehicleImgVisible(true); setUserId(userId) }}>Editar Soportes</a></li>
          </ul>
        </li>
      </ul>
    </nav>)
  }

  return (
    <>
      {modalSoportes()}
      {modalVehicleInfo()}
      {modalVehicleImg()}
      <div>
        <h2>
          <p>Choferes por pais</p>
        </h2>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <button
            onClick={() => {
              navigate("/choferes/nuevo");
            }}
          >
            Nuevo Chofer
          </button>
        </div>
      </div>
      <div
        style={{ display: "flex", paddingTop: "20px", paddingBottom: "10px" }}
      >
        <div>
          <label>Pais</label>
          <CountriesSelect onChange={countrySelectHandler} />
        </div>
        <div>
          <label>Ciudad</label>
          <CitiesSelect
            callback={cityCallbackHandler}
            countryId={countryId}
            onChange={citiesSelectHandler}
          />
        </div>
      </div>
      <div>
        <FilteredGrid ref={grid} columns={columns} rows={rows} rowClassName={record => record.state === "Activo" ? "rowGreen" : "rowRed"} />
      </div>
    </>
  );
};

export default MainChoferes;
