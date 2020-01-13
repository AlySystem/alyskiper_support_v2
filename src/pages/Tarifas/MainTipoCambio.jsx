import React, { useState, useEffect } from 'react'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import { useQuery } from 'react-apollo'
import { OBTENER_TODAS_TASAS_CAMBIO } from '../../Queries'
import FormularioTipoCambio from './FormularioTIpoCambio'
import {Modal} from 'antd'
const MainTipoCambio = (props) => {

    const columns = [
        {
            title: "Pais",
            dataIndex: "country",
            key: "1"
        }, {
            title: "Moneda",
            dataIndex: "currency",
            key: "2"
        }, {
            title: "Valor",
            dataIndex: "value",
            key: "3"
        }, {
            title: "Fecha",
            dataIndex: "date",
            key: "4"
        }
    ]
    const [rows, setRows] = useState()

    const { data: exchangeRateData } = useQuery(OBTENER_TODAS_TASAS_CAMBIO, {
        pollInterval: 3000,
        onCompleted: data => { console.log(data); setearRows(data.GetAllExchangeRate) },
        onError: err => { console.log(err) }
    })

    useEffect(() => {
        if (exchangeRateData) {
            setearRows(exchangeRateData.GetAllExchangeRate)
        }
    }, [exchangeRateData])

    const setearRows = data => {
        if (!data)
            return

        let rows = []

        for (let item of data) {
            console.log(item)
            rows.push({
                id: item.id,
                country: item.country.name,
                currency: item.currency.name,
                value: item.value,
                date: item.date_in,
                actions: (crearMenuActions())
            })
        }

        setRows(rows)
    }

    const crearMenuActions = (id) => {
        return (<>
            <button onClick={() => { setExchangeRateId(id); setModalFrmTipoCambio(true) }}>Editar</button>
        </>)
    }

    const [modalFrmTipoCambio, setModalFrmTipoCambio] = useState(false)
    const [exchangeRateId, setExchangeRateId] = useState()
    const modalNuevoTipoCambio = () => {
        return (<>
            <Modal
                title="Tipo de Cambio"
                visible={modalFrmTipoCambio}
                onOk={() => setModalFrmTipoCambio(false)}
                onCancel={() => setModalFrmTipoCambio(false)}
                footer={null}
                destroyOnClose={true}
                maskClosable={true}
            >
                <FormularioTipoCambio
                    exchangeRateId={exchangeRateId}
                    callback={() => { setModalFrmTipoCambio(false); setExchangeRateId(null) } }
                />
            </Modal>
        </>)
    }

    return (<>
        {modalNuevoTipoCambio()}
        <div><h2><p>Tipos de Cambio</p></h2></div>
        <div><button>Nuevo</button></div>
        <br />
        <div>
            <FilteredGrid columns={columns} rows={rows} />
        </div>
    </>)
}

export default MainTipoCambio