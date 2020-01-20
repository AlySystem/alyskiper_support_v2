import React, { useState, useEffect } from 'react'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import ScheduleSelect from '../../components/ScheduleSelect/ScheduleSelect'
import CountriesSelect from '../../components/countriesSelect/CountriesSelect'
import CitiesSelect from '../../components/CitiesSelect/CitiesSelect'
import CatTravelSelect from '../../components/VehicleSelects/CatTravelSelect'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { OBTENER_TARIFAS_FILTRADO } from '../../Queries'
import ExcelLoader from '../../utils/ExcelUtils'
import FileButton from '../../components/FileButton/FileButton'
import FormularioTarifas from './FormularioTarifas'
import { Modal } from 'antd'
import { INSERTAR_TARIFAS_LOTE } from '../../Mutations'


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
    }, {
        title: 'Acciones',
        dataIndex: 'actions',
        key: '10'
    }

]

const MainTarifas = _ => {


    const [rows, setRows] = useState()

    const [loadTariffs, { data: tariffsData }] = useLazyQuery(OBTENER_TARIFAS_FILTRADO, {
        pollInterval: 3000,
        onCompleted: _ => { console.log("Obtuvo Tarifas") },
        onError: err => { console.log("Error al Obtener Tarifas"); console.log(err) },
    })

    const [importBatch ] = useMutation(INSERTAR_TARIFAS_LOTE, {
        onCompleted: _ => { console.log("Insertadas Correctamente") },
        onError: err => { console.log("Error al Ingresar Tarifas"); console.log(err) },
    })

    const [idCountry, setIdCountry] = useState()
    const countryChangeHandler = e => {
        setIdCountry(e.currentTarget.value);
    }
    const [idCity, setIdCity] = useState()
    const cityChangeHandler = e => {
        setIdCity(e.currentTarget.value)
    }

    const [idCatTravel, setIdCatTravel] = useState()
    const catTravelChangeHandler = e => {
        setIdCatTravel(e.currentTarget.value)
    }

    const [idSchedule, setIdSchedule] = useState()
    const scheduleChangeHandler = e => {
        setIdSchedule(e.currentTarget.value)
    }

    useEffect(() => {
        if (!idCountry)
            return
        if (!idCity)
            return

        loadTariffs({
            variables: {
                filter: {
                    idCountry: idCountry ? parseInt(idCountry) : null,
                    idCatTravel: idCatTravel ? parseInt(idCatTravel) : null,
                    idCity: idCity ? parseInt(idCity) : null,
                    idSchedule: idSchedule ? parseInt(idSchedule) : null
                }
            }
        })

    }, [idCountry, idCity, idCatTravel, idSchedule])

    useEffect(() => {
        if (!tariffsData)
            return
        setearRows(tariffsData.findTariffsWithFilters)
    }, [tariffsData])

    const [idTariff, setIdTariff] = useState()
    const setearRows = data => {
        let rows = data.map((item, index) => {
            return {
                id: index,
                price_base: item.price_base,
                price_minute: item.price_minute,
                price_kilometer: item.price_kilometer,
                price_minimum: item.price_minimum,
                id_driver_schedule: item.driverShedule.turn,
                id_skiper_cat_travels: item.skiperCatTravel.name,
                idcountry: item.countrie.name,
                idcity: item.cities.name,
                symbol: item.symbol,
                actions: (<button onClick={_ => { setIdTariff(item.id); setModalSetFrmTarifaVisible(true) }}>Editar</button>)
            }
        })

        setRows(rows)
    }

    const importFileHandler = async (e) => {
        let input = e.target

        if (!(input.files && input.files[0]))
            return

        let loader = new ExcelLoader(input.files[0])
        await loader.loadExcel()
        let sheet = loader.getDefaultSheet()
        
        let toInsert = buildArrFromExcel(loader.getSheetAsJson(sheet))
        console.log(toInsert)

        await importBatch({variables:{
            input: toInsert
        }})

    }

    const buildArrFromExcel = sheet => {
        let arr = []
        /*
            __rowNum__: 1
            categorias: "Silver"
            city: "Managua"​​
            country: "NICARAGUA"
            ​​horario: "am-pm"
            ​​id: 1
            ​​​id_driver_schedule: 1
            ​​​id_skiper_cat_travels: 1
            ​​idcity: 1
            ​​​idcountry: 154
            ​​​price_base: 42
            ​​​price_kilometer: 8
            ​​​price_minimum: 55
            ​​​price_minute: 1
            ​​​symbol: "C$" */


        arr = sheet.map(item=>{
            return {
                idSkiperCatTravels: parseInt(item.id_skiper_cat_travels),
                idDriverSchedule: parseInt(item.id_driver_schedule),
                price_base: parseFloat(item.price_base),
                price_minute: parseFloat(item.price_minute),
                price_kilometer: parseFloat(item.price_kilometer),
                price_minimum: parseFloat(item.price_minimum),
                idCountry: parseInt(item.idcountry),
                idCity : parseInt(item.idcity),
                symbol: item.symbol
            }
        })
        return arr
    }

    const [modalFrmTarifaVisible, setModalSetFrmTarifaVisible] = useState(false)
    const modalFrmTarifa = _ => {
        return (<>
            <Modal
                title="Tarifa"
                visible={modalFrmTarifaVisible}
                footer={null}
                destroyOnClose={true}
                width="90%"
                style={{ minHeight: "80%", height: "100vh" }}
                onCancel={() => { setModalSetFrmTarifaVisible(false) }}
            >
                <FormularioTarifas idTariff={idTariff} callback={()=>  setModalSetFrmTarifaVisible(false)} />
            </Modal>
        </>)
    }

    return (
        <>
            {modalFrmTarifa()}
            <div>
                <h2><p>Tarifas de Viajes</p></h2>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ paddingRight: "10px" }}>
                    <label>Pais</label>
                    <CountriesSelect onChange={countryChangeHandler} />
                </div>
                <div style={{ paddingRight: "10px" }}>
                    <label>Ciudad</label>
                    <CitiesSelect onChange={cityChangeHandler} countryId={idCountry} />
                </div>
                <div style={{ paddingRight: "10px" }}>
                    <label>Categoria</label>
                    <CatTravelSelect onChange={catTravelChangeHandler} />
                </div>
                <div style={{ paddingRight: "10px" }}>
                    <label>Horario</label>
                    <ScheduleSelect onChange={scheduleChangeHandler} />
                </div>
                <div>
                    <FileButton text="Importar" onChange={importFileHandler} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                </div>
            </div>
            <div>
                <FilteredGrid columns={columns} rows={rows} />
            </div>
        </>
    )
}
export default MainTarifas