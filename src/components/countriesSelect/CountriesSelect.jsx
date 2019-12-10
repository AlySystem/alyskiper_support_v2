import React from 'react'
import { COUNTRIES } from '../../Queries'
import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'


const CountriesSelect = ({ onChange, register, options, name, ...rest }) => {

    const {
        loading,
        data,
        error
    } = useQuery(COUNTRIES, {
    })

    useEffect(() => {
        if (data) {
            console.log('obtuvo datos')
            console.log(data)
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