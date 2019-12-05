import React, { useEffect, useState, useRef } from "react";
import FilteredGrid from "../../components/filteredGrid/FilteredGrid";
import { PROPIETARIOS_QUERY } from "../../Queries/index";
import { useLazyQuery } from "@apollo/react-hooks";
import CountriesSelect from "../../components/countriesSelect/CountriesSelect";
import CitiesSelect from "../../components/CitiesSelect/CitiesSelect";
import "../../scss/loader/_loader.scss";
import { navigate } from "@reach/router"
const MainChoferes = () => {
    const CATEGORIA_DRIVER = 1;

    const [countryId, setCountryId] = useState();
    const [cityId, setCityId] = useState();
    const [rows, setRows] = useState();
    const [columns, setColumns] = useState();

    const grid = useRef();

    const [load, { called, loading, data }] = useLazyQuery(PROPIETARIOS_QUERY, {
        variables: { id: CATEGORIA_DRIVER, idcity: parseInt(cityId) },
        onCompleted: data => {
            console.log(data);
            onLoadData();
        }
    });

    const onLoadData = () => {
        if (data) {
            console.log({ id: CATEGORIA_DRIVER, idcity: parseInt(cityId) });
            console.log(data.getByCategoryAgentIdAndCityId);
            if (data.getByCategoryAgentIdAndCityId.length == 0) return;

            const finalRows = data.getByCategoryAgentIdAndCityId[0].agents.map(
                item => {
                    return {
                        firstname: item.user.firstname,
                        lastname: item.user.lastname,
                        email: item.user.email,
                        address: item.user.address,
                        phone: item.user.phone,
                        identity: item.identity,
                        state: item.state ? "Activo" : "Inactivo"
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
                    title: "Identificación",
                    dataIndex: "identity",
                    key: "5"
                },
                {
                    title: "Estado",
                    dataIndex: "state",
                    key: "6"
                }
            ];
            console.log(columns);
            console.log(finalRows);
            setRows(finalRows);
            setColumns(columns);

            console.log("Entro al useEffect");
        }
    };

    useEffect(() => {
        load();
    }, [cityId]);

    const countrySelectHandler = e => {
        setCountryId(e.currentTarget.value);
    };
    const citiesSelectHandler = e => {
        console.log("El city ID: ", e);
        setCityId(e.currentTarget.value);
        load();
    };

    return (
        <>
            <div>
                <h2>
                    <p>Choferes por pais</p>
                </h2>
            </div>
            <div style={{ display: "flex" }}>
                <div>
                    <button onClick={() => { navigate('/choferes/nuevo') }} >Nuevo Chofer</button>
                </div>
            </div>
            <div style={{ display: "flex", paddingTop: "20px", paddingBottom:"10px"}}>
                <div>
                    <label>Pais</label>
                    <CountriesSelect onChange={countrySelectHandler} />
                </div>
                <div>
                    <label>Ciudad</label>
                    <CitiesSelect countryId={countryId} onChange={citiesSelectHandler} />
                </div>
            </div>
            <div>
                <FilteredGrid ref={grid} columns={columns} rows={rows} />
            </div>
        </>
    );
};

export default MainChoferes;
