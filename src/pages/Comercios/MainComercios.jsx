import React, { useEffect, useState, useRef } from 'react'
import { COMERCIOS_QUERY } from '../../Queries/index'
import { useQuery } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import '../../scss/loader/_loader.scss'

const MainComercios = () => {
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();

  const {
    loading: loadingCommerce,
    data: dataCommerce,
    error: errorCommerce
  } = useQuery(COMERCIOS_QUERY, {
    variables: { id_user: 1 }
  })

  /*-- acceso a la funciones dentro del grid --*/
  const grid = useRef()

  useEffect(() => {
    if (dataCommerce) {
      const finalRows = [];
      dataCommerce.getCommercesBySponsorId.map(item => {
        return finalRows.push({
          key: item.id.toString(),
          propietario: item.manager,
          ruc: item.identification_ruc,
          comercio: item.namecommerce,
          estado: item.skiperAgent.state ? "Activo" : "Desactivado",
          categoria: item.catCommerce.name,
          pais: item.country.name,
          ciudad: item.city.name,
          color: "#ddd",
          editar: (
            <Link to={`./editar/${item.id}`} className="btn btn-info btn-block">
              Editar
            </Link>
          ),
          agregar: (
            <Link
              to={`/producto/nuevo/${parseInt(item.id)}`}
              className="btn btn-warning btn-block"
            >
              Agregar
            </Link>
          )
        });
      });
      setColumns([
        {
          title: "Propietario",
          dataIndex: "propietario",
          key: "1",
          fixed: "left",
          ...grid.current.getColumnSearch("propietario")
        },
        {
          title: "RUC",
          dataIndex: "ruc",
          key: "2",
          ...grid.current.getColumnSearch("ruc")
        },
        {
          title: "Comercio",
          dataIndex: "comercio",
          key: "3",
          width: 142,
          ...grid.current.getColumnSearch("comercio")
        },
        {
          title: "Estado",
          dataIndex: "estado",
          key: "4",
          width: 130,
          ...grid.current.getColumnSearch("estado")
        },
        {
          title: "Cateogia",
          dataIndex: "categoria",
          key: "5",
          width: 150,
          ...grid.current.getColumnSearch("categoria")
        },
        {
          title: "Pais",
          dataIndex: "pais",
          key: "6",
          width: 150,
          ...grid.current.getColumnSearch("pais")
        },
        {
          title: "Ciudad",
          dataIndex: "ciudad",
          key: "7",
          ...grid.current.getColumnSearch("ciudad")
        },
        {
          title: "Editar",
          dataIndex: "editar",
          key: "8",
          fixed: "right"
        },
        {
          title: "Agregar",
          dataIndex: "agregar",
          key: "9",
          fixed: "right"
        }
      ]);
      setRows(finalRows);
      console.log("seteo datos");
    }
  }, [dataCommerce]); 
  console.log(loadingCommerce)
  if(loadingCommerce)
    return (
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"/>
        <div class="sk-cube2 sk-cube"/>
        <div class="sk-cube4 sk-cube"/>
        <div class="sk-cube3 sk-cube"/>
      </div>
    )

  return <FilteredGrid ref={grid} columns={columns} rows={rows} />
};

export default MainComercios
