import React from 'react'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import { useState } from 'react'
import ScheduleSelect from '../../components/ScheduleSelect/ScheduleSelect'

const MainTarifas = _ => {
    const columns = [
        {
            title: 'Precio Base',
            dataIndex: 'price_base',
            key: '1'
        }, {
            title: 'Precio x minuto',
            dataIndex: 'price_minute',
            key: '2'
        }, {
            title: 'Precio x Kilometro',
            dataIndex: 'price_kilometer',
            key: '3'
        }, {
            title: 'Precio Minimo',
            dataIndex: 'price_minimum',
            key: '4'
        }, {
            title: 'Horario',
            dataIndex: 'id_driver_schedule',
            key: '5'
        }, {
            title: 'Categoria Viaje',
            dataIndex: 'id_skiper_cat_travels',
            key: '6'
        }, {
            title: 'Pais',
            dataIndex: 'idcountry',
            key: '7'
        }, {
            title: 'Ciudad',
            dataIndex: 'idcity',
            key: '8'
        }, {
            title: 'Simbolo',
            dataIndex: 'symbol',
            key: '9'
        }

    ]

    const [rows, setRows] = useState()

    return (
        <>  
        <ScheduleSelect/>
            <FilteredGrid columns={columns} rows={rows} />
        </>
    )
}
export default MainTarifas