import React from 'react'
import { CITIES } from '../../Queries'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

const CitiesSelect = (props) => {
    const [load, { data }] = useLazyQuery(CITIES, {
        variables: {
            id: parseInt(props.countryId),
        },
        onCompleted: _ => { setValue(props.defvalue) }
    })
    const [value, setValue] = useState()
    useEffect(() => {
        if (props.callback) {
            if (data) {
                if (data.getAllCitiesByCountryId[0].cities[0]) {
                    props.callback(data.getAllCitiesByCountryId[0].cities[0].id)
                }
            }
        }
    }, [data])

    useEffect(() => {
        if (props.countryId) {
            load()
        }
    }, [props])

    if (!data) {
        return (<select name={props.name} ref={props.register} style={{ minWidth: "200px" }}></select>)
    }

    return (
        <select
            name={props.name}
            ref={props.register}
            onChange={props.onChange}
            value={value}
        >
            {
                data.getAllCitiesByCountryId[0].cities.map((x) => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default CitiesSelect