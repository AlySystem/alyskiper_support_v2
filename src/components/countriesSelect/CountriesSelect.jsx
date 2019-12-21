import React from 'react'
import { COUNTRIES } from '../../Queries'
import { useEffect,useState } from 'react'
import { useQuery } from '@apollo/react-hooks'


const CountriesSelect = ({ onChange, register, options, name, defvalue,...rest }) => {

    const {
        data,
    } = useQuery(COUNTRIES, {
    })
    const [value, setValue] = useState()
    useEffect(() => {
        if (data) {
            console.log('obtuvo datos')
            console.log(data)
            setValue(defvalue)
        }
    }, [data])

    if (!data) {
        return (<select></select>)
    }

    return (
        <select
            name={name}
            ref={register}
            onChange={onChange}
            value={value}
            {...rest}
        >
            {
                data.countries.map(x => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default CountriesSelect