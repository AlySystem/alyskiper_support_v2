import React, { useState, useEffect } from 'react'
import { MONEDAS } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const CurrencySelect = (props) => {
    //const [countries, setCountries] = useState()
    const [mapa, setMapa] = useState()
    const { data } = useQuery(MONEDAS, {
        onCompleted: () => { createMap(data.currency); setValue(props.defvalue) },
        onError: (err) => { console.log(err) }
    })

    const createMap = (data) => {
        let m = new Map()
        data.map(x => {

            let obj = {
                id: x.id,
                isCrypto: x.isCrypto
            }
            m.set(x.id, obj)
        })
        setMapa(m)
    }

    const getOptions = () => {
        return (
            data.currency.map(x => {
                let obj = {
                    id: x.id,
                    isCrypto: x.isCrypto
                }
                return <option key={x.id} value={JSON.stringify(obj)}>{x.name}</option>
            })
        )
    }

    useEffect(() => {
        if (!data)
            return
        if (data.currency) {            
            if (mapa){
                console.log(mapa.get(props.defvalue))
                setValue(JSON.stringify(mapa.get(props.defvalue)))
            }
        }
    }, [props.defvalue])


    const [value, setValue] = useState()


    if (!data) {
        return (<select></select>)
    }

    return (
        <select
            name={props.name}
            ref={props.register}
            onChange={props.onChange}
            defaultValue={data.currency[0]}
            value={value}
        >
            {data.currency && getOptions()}
        </select >
    )
}

export default CurrencySelect