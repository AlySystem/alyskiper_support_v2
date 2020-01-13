import React from 'react'
import { COUNTRIES } from '../../Queries'
import { useEffect,useState } from 'react'
import { useQuery } from '@apollo/react-hooks'


const CountriesSelect = ({ onChange, register, options, name, defvalue,...rest }) => {

    const { data } = useQuery(COUNTRIES, {
        onCompleted: () => { setValue(defvalue) },
        onError: (err) => { console.log(err)}
    })
    const [value, setValue] = useState()
    useEffect(() => {
        if(!data)
            return
        if (data.countries) {
            console.log('obtuvo datos')
            console.log(data)
            setValue(defvalue)
        }
    }, [defvalue])

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