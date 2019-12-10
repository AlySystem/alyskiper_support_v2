import React, { useState, useEffect, useRef, Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link, navigate } from "@reach/router";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

// Import querys
import { EJEUTIVO_BY_REF } from "../../Queries";
import "../../scss/loader/_loader.scss";
import "antd/dist/antd.css";
var jwtDecode = require("jwt-decode");

const Ejecutivo = props => {
  const [rows, setRows] = useState();
  const [searchText, setSearchText] = useState("");
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");

    const id = token ? `Bearer ${token}` : "";
    var y = jwtDecode(id);
    //console.log(y.sub);
  }
  const { loading, data, error } = useQuery(EJEUTIVO_BY_REF, {
    variables: { idsponsor: parseInt(y.sub) },
    pollInterval: 5000
  });

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        console.log(data);
        const finalArray = [];
        data.searchAgentsByUserId.map(item => {
          const { id } = item;
          return finalArray.push({
            key: item.id.toString(),
            nombre: item.firstname,
            apellido: item.lastname,
            correo: item.email,
            usuario: item.user,
            telefono: item.phone,
            pais: item.country.nicename,
            ciudad: item.city.name,
            agente: item.skiperAgent,
            color: "#000",
            editar: (
              <Link
                to={`./ejecutivoeditar/${parseFloat(id)}`}
                className="btnedit"
              >
                Editar Ejecutivo
              </Link>
            )
          });
        });
        setRows(finalArray);
      }
    };
    fetchData();
  }, [data]);

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
  if (error) return `Error: ${error.message}`;

  if (data) {
    if (data.searchAgentsByUserId.length === 0) {
      return (
        <div className="text-center mb-5">
          <h3 className="caja-texto-color-blanco titless">No hay datos</h3>
        </div>
      );
    }
  }

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => inputRef.current.select());
      }
    },
    render: text => {
      return (
        <>
          {text ? (
            <Highlighter
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : null}
        </>
      );
      // console.log(text);
    }
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "1",
      ...getColumnSearchProps("nombre")
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "2",
      ...getColumnSearchProps("apellido")
    },
    {
      title: "Correo",
      dataIndex: "correo",
      key: "3",
      ...getColumnSearchProps("correo")
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "4",
      ...getColumnSearchProps("usuario")
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
      key: "5",
      ...getColumnSearchProps("telefono")
    },
    {
      title: "Pais",
      dataIndex: "pais",
      key: "6",
      ...getColumnSearchProps("pais")
    },
    {
      title: "Ciudad",
      dataIndex: "ciudad",
      key: "7",
      ...getColumnSearchProps("ciudad")
    },
    {
      title: "Editar",
      dataIndex: "editar",
      key: "8"
    }
  ];

  const nuevoEjecutivoHandler = e => {
    navigate("/ejecutivos/nuevo");
  };

  return (
    <>
      <div className="container2">
        <button onClick={nuevoEjecutivoHandler}>Nuevo Ejecutivo</button>
        <h1
          style={{
            fontSize: "2rem",
            color: "white"
          }}
        >
          Ejecutivos
        </h1>
        {/* <a className="font" href="#1">
          Importar a exel
        </a> */}
        <div className="table-responsive table-dark m-2 caja-texto-color-blanco">
          <Table
            style={{ fontFamily: "Lato, sans-serif" }}
            size="small"
            columns={columns}
            expandedRowRender={record => {
              console.log(record);
              return record.agente.map(item => {
                console.log(item);
                console.log(item.state);
                return (
                  <>
                    <table
                      className="subtabla"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      <thead className="subtabla-head">
                        <tr>
                          <th>Categoria agente</th>
                          <th>Estado de agente</th>
                        </tr>
                      </thead>
                      <tbody className="subtabla-body">
                        <tr>
                          <td>
                            <span
                              className="bg-primary"
                              style={{
                                padding: "5px",
                                margin: "20px",
                                borderRadius: "10px"
                              }}
                            >
                              {item.categoryAgent.name}
                            </span>
                          </td>
                          <td>
                            {item.state ? (
                              <span
                                className="bg-primary"
                                style={{
                                  padding: "5px",
                                  margin: "20px",
                                  borderRadius: "10px"
                                }}
                              >
                                {item.state ? "Activo" : "Desactivado"}
                              </span>
                            ) : null}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                );
              });
            }}
            dataSource={rows}
            rowClassName={record => record.color.replace("#", " ")}
            rowKey={record => record.id}
            // scroll={{ x: 1150}}
          />
        </div>
      </div>
    </>
  );
};

export default Ejecutivo;
