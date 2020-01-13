import React from 'react'
import useForm  from 'react-hook-form'
import { ACTUALIZAR_TIPO_CAMBIO, REGISTRAR_TIPO_CAMBIO } from '../../Queries/index'
import { useMutation } from 'react-apollo'
import CountriesSelect from '../../components/countriesSelect/CountriesSelect'
import CurrencySelect from '../../components/CurrencySelect/CurrencySelect'

const FormularioTipoCambio = (props) => {
    const { register, handleSubmit, errors } = useForm()

    const [ registerExchangeRate ] = useMutation(REGISTRAR_TIPO_CAMBIO, {
        onCompleted: data => { console.log(data) },
        onError:err => { console.log(err) }
    })

    const [ updateExchangeRate ] = useMutation(REGISTRAR_TIPO_CAMBIO, {
        onCompleted: data => { console.log(data) },
        onError:err => { console.log(err) }
    })

    const handleForm = (values) => {
        console.log(values)
    }

    return (<>
        <form onSubmit={handleSubmit(handleForm)}>
            <div>
                <label>Pais</label>
                <CountriesSelect register={register} />
                <label>Moneda</label>
                <CurrencySelect register={register} />
                <label>Valor</label>
                <input type="number" ref={register} step="0.01" />
                <label>Fecha</label>
                <input type="date" ref={register} />
            </div>
            <div>
                <button>Guardar</button>
            </div>
        </form>
    </>)
}

export default FormularioTipoCambio