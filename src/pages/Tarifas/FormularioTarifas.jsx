import React, { useState, useEffect } from 'react'
import CountrySelect from '../../components/countriesSelect/CountriesSelect'
import CitiesSelect from '../../components/CitiesSelect/CitiesSelect'
import CatTravelSelect from '../../components/VehicleSelects/CatTravelSelect'
import ScheduleSelect from '../../components/ScheduleSelect/ScheduleSelect'
import useForm from 'react-hook-form'
import { useLazyQuery,useMutation } from 'react-apollo'
import { OBTENER_TARIFAS_BY_ID } from '../../Queries'
import { INGRESAR_TARIFA, ACTUALIZAR_TARIFA } from '../../Mutations'

const FormularioTarifas = props => {

    const [countryId, setCountryId] = useState()
    const { register, setValue, errors, handleSubmit } = useForm()
    const onCountryChange = (e) => {
        let select = e.currentTarget
        if (select.selectedOptions)
            if (select.selectedOptions.length)
                setCountryId(select.selectedOptions[0].value)
    }

    const [insertTariff] = useMutation(INGRESAR_TARIFA, {
        onCompleted: data => { console.log(data); alert("Ingresado Correctamente") ; if (props.callback) props.callback() },
        onError: err => { console.log(err) }

    })
    const [updateTariff] = useMutation(ACTUALIZAR_TARIFA, {
        onCompleted: data => { console.log(data); alert("Actualizaco Correctamente"); if (props.callback) props.callback() },
        onError: err => { console.log(err) }

    })

    const onSubmit = async values => {


        let input = {
            idSkiperCatTravels: parseInt(values.skiperCatTravel),
            idDriverSchedule: parseInt(values.driverShedule),
            price_base: parseFloat(values.price_base),
            price_minute: parseFloat(values.price_minute),
            price_kilometer: parseFloat(values.price_kilometer),
            price_minimum: parseFloat(values.price_minimum),
            idCountry: parseInt(values.idcountry),
            idCity : parseInt(values.idcity),
            symbol: values.symbol
        }
        console.log(values)
        console.log(input)

        if (props.idTariff){
            console.log("es un update")
            input.id=props.idTariff
            await updateTariff({
                variables: { input:input }
            })
        }else{
            console.log("es un insert")
            await insertTariff({
                variables: { input:input }
            })
        }

    }

    const [fetchTariff, { data: dataTarrif }] = useLazyQuery(OBTENER_TARIFAS_BY_ID,{
        fetchPolicy:"network-only"
    })

    useEffect(() => {
        if (!props.idTariff)
            return

        fetchTariff({
            variables: {
                id: parseInt(props.idTariff)
            }
        })

    }, [props.idTariff])

    useEffect(() => {
        if (!dataTarrif)
            return

        setValues(dataTarrif.getTariffsById)
    }, [dataTarrif])

    const [loadedValues, setLoadedValues] = useState({})
    const setValues = item => {
        setLoadedValues({
            idCountry: item.countrie.id,
            idCity: item.cities.id,
            idCatTravel: item.skiperCatTravel.id,
            idSchedule: item.driverShedule.id
        })
        console.log(item)
        setValue("price_base", item.price_base)
        setValue("price_minute", item.price_minute)
        setValue("price_kilometer", item.price_kilometer)
        setValue("price_minimum", item.price_minimum)
        setValue("symbol", item.symbol)
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: "wrap", alignItems: "vertical" }}>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Pais</label>
                    <CountrySelect name="idcountry" onChange={onCountryChange} register={register} defvalue={loadedValues.idCountry} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Ciudad</label>
                    <CitiesSelect name="idcity" defvalue={loadedValues.idCity} countryId={countryId ? countryId : loadedValues.idCountry} register={register} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Precio Base</label>
                    <input name="price_base" type="number" step="0.001" ref={register} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Precio x Minuto</label>
                    <input name="price_minute" type="number" step="0.001" ref={register} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Precio x Kilometro</label>
                    <input name="price_kilometer" type="number" step="0.001" ref={register} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Precio Minimo</label>
                    <input name="price_minimum" type="number" step="0.001" ref={register} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Horario</label>
                    <ScheduleSelect defvalue={loadedValues.idTariff} name="driverShedule" register={register} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label>Categoria</label>
                    <CatTravelSelect defvalue={loadedValues.idCatTravel} name="skiperCatTravel" register={register} />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <label style={{ color: "black" }}>Símbolo</label>
                    <input name="symbol" ref={register} type="text" />
                </div>
                <div style={{ padding: "10px 10px" }}>
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </>
    )
}

export default FormularioTarifas