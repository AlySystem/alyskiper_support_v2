import React, { useEffect, useState, useRef } from "react";
import FilteredGrid from "../../components/filteredGrid/FilteredGrid";
import { PROPIETARIOS_QUERY } from "../../Queries/index";
import { useLazyQuery } from "@apollo/react-hooks";
import CountriesSelect from "../../components/countriesSelect/CountriesSelect";
import CitiesSelect from "../../components/CitiesSelect/CitiesSelect";
import "../../scss/loader/_loader.scss";

const UsuariosMain = (props) => {
    const CATEGORIA = parseInt(props.categoria)
    const TITULO = props.titulo

    const [countryId, setCountryId] = useState();
    const [cityId, setCityId] = useState();
    const [rows, setRows] = useState();
    const [columns, setColumns] = useState();

    const grid = useRef();

    const [load, { loading, data }] = useLazyQuery(PROPIETARIOS_QUERY, {
        variables: { id: CATEGORIA, idcity: parseInt(cityId) },
        onCompleted: () => {
            console.log(data);
            onLoadData();
        }
    });

    const onLoadData = () => {
        if (data) {
            console.log({ id: CATEGORIA, idcity: parseInt(cityId) })
            console.log(data.getByCategoryAgentIdAndCityId);
            if (data.getByCategoryAgentIdAndCityId.length === 0) {
                setRows();
                return;
            }

            const finalRows = data.getByCategoryAgentIdAndCityId[0].agents.map(
                item => {
                    return {
                        id: item.id,
                        firstname: item.user.firstname,
                        lastname: item.user.lastname,
                        email: item.user.email,
                        address: item.user.address,
                        phone: item.user.phone,
                        identity: item.identity,
                        state: item.state ? "Activo" : "Inactivo"
                    };
                }
            )
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
                }
            ];
            console.log(columns);
            console.log(finalRows);
            setRows(finalRows);
            setColumns(columns);

            console.log("seteo el grid")
        }
    };

    useEffect(() => {
        if (cityId) {
            load()
        }
    }, [cityId])

    const countrySelectHandler = e => {
        setCountryId(e.currentTarget.value);
    };
    const citiesSelectHandler = e => {
        console.log("El city ID: ", e);
        setCityId(e.currentTarget.value);
    };

    const cityCallbackHandler = id => {
        console.log("entro al callback");
        setCityId(id);
    }

    if (!TITULO && !CATEGORIA) {
        return (
            <><p><h2 className="errorText">Debe definir la categoria y el Titulo</h2></p></>
        )
    }

    return (
        <>
            <div>
                <h2>
                    <p>{TITULO}</p>
                </h2>
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
                <FilteredGrid ref={grid} columns={columns} rows={rows} />
            </div>
        </>
    );
};

export default UsuariosMain;
