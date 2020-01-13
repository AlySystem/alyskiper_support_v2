import React, { useState, useEffect } from 'react'
import useForm from 'react-hook-form'
import { ACTUALIZAR_TIPO_CAMBIO, REGISTRAR_TIPO_CAMBIO } from '../../Mutations/index'
import { OBTENER_TIPO_CAMBIO_BY_ID } from '../../Queries/index'
import { useMutation, useLazyQuery } from 'react-apollo'
import CountriesSelect from '../../components/countriesSelect/CountriesSelect'
import CurrencySelect from '../../components/CurrencySelect/CurrencySelect'

const FormularioTipoCambio = (props) => {
    const { register, handleSubmit, errors, setValue } = useForm()

    const [registerExchangeRate] = useMutation(REGISTRAR_TIPO_CAMBIO, {
        onCompleted: data => { alert("Registrado correctmente"); console.log(data) },
        onError: err => { console.log(err) }
    })

    const [updateExchangeRate] = useMutation(ACTUALIZAR_TIPO_CAMBIO, {
        onCompleted: data => { alert("Actualizado correctamente"); console.log(data) },
        onError: err => { console.log(err) }
    })

    const [getExchangeRate, { data: exchangeRateData }] = useLazyQuery(OBTENER_TIPO_CAMBIO_BY_ID, {
        fetchPolicy: "network-only",
        variables: { id: parseInt(props.exchangeRateId) },
        onCompleted: data => { console.log(data); setFormValues(data.GetByIdExchangeRate) },
        onError: err => { console.log(err) }
    })

    useEffect(() => {
        if (props.exchangeRateId) {
            getExchangeRate()
        }
        if (exchangeRateData)
            if (exchangeRateData.GetByIdExchangeRate)
                setFormValues(exchangeRateData.GetByIdExchangeRate)
    }, [])

    const [countryId, setCountryId] = useState()
    const [idcurrency, setIdcurrency] = useState()

    const setFormValues = data => {
        //setValue("countryid",data.country.id)
        //setValue("idcurrency", data.currency.id)

        setCountryId(data.country.id)
        setIdcurrency(data.currency.id)
        setValue("value", data.value)
        setValue("date_in", new Date(data.date_in).toISOString().substr(0, 10))
    }

    const handleForm = async (values) => {
        
        let currency = JSON.parse(values.idcurrency)
        let input = {
            countryid: parseInt(values.countryid),
            idcurrency: currency.id,
            value: parseFloat(values.value),
            date_in: values.date_in
        }
        
        console.log(input)

        if (props.edit) {
            input.id = props.exchangeRateId
            await updateExchangeRate({ variables: { input: input } })
        }
        else {
            await registerExchangeRate({ variables: { input: input } })

        }


    }

    return (<>
        <form onSubmit={handleSubmit(handleForm)}>
            <div>
                <label>Pais</label>
                <CountriesSelect name="countryid" register={register} defvalue={countryId} />
                <label>Moneda</label>
                <CurrencySelect name="idcurrency" register={register} defvalue={idcurrency} />
                <label>Valor</label>
                <input name="value" type="number" ref={register} step="0.0001" />
                <label>Fecha</label>
                <input name="date_in" type="date" ref={register} />
            </div>
            <div>
                <button>Guardar</button>
            </div>
        </form>
    </>)
}

export default FormularioTipoCambio
