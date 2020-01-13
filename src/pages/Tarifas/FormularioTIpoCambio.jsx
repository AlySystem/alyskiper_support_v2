import React from 'react'

const FormularioTipoCambio = (props) => {


    return (<>
        <label>Pais</label>
        <CountriesSelect />
        <label>Moneda</label>
        <CurrencySelect />
        <label>Valor</label>
        <input type="number" step="0.01" />
        <label>Fecha</label>
        <input type="date" />
    </>)
}

export default FormularioTipoCambio