import React from 'react'
import CountrySelect from '../../components/countriesSelect/CountriesSelect'
import CitiesSelect from '../../components/CitiesSelect/CitiesSelect'
import { useState } from 'react'
import CatTravelSelect from '../../components/VehicleSelects/CatTravelSelect'
import ScheduleSelect from '../../components/ScheduleSelect/ScheduleSelect'
const FormularioTarifas = _ => {

    const [countryId,setCountryId] = useState()
    const onCountryChange = (e)=> {
        let select = e.currentTarget
        if(select.selectedOptions)
            if(select.selectedOptions.length)
                setCountryId(select.selectedOptions[0].value)
    }
    return (
        <>
            <form>
                <label>Pais</label>
                <CountrySelect onChange={onCountryChange}/>
                <label>Ciudad</label>
                <CitiesSelect countryId={countryId}/>
                <label>Precio Base</label>
                <input type="number"/>
                <label>Precio x Minuto</label>
                <input type="number"/>
                <label>Precio x Kilometro</label>
                <input type="number"/>>
                <label>Precio Minimo</label>
                <input type="number"/>
                <label>Horario</label>
                <ScheduleSelect/>
                <label>Categoria</label>
                <CatTravelSelect/>
                <button type="submit">Agregar</button>
            </form>
        </>
    )
}

export default FormularioTarifas