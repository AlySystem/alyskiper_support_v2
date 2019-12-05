import React from 'react'
import { COUNTRIES, CITIES, CIVIL } from '../../Queries'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

const CitiesSelect = (props) => {
    const [load, { called, loading, data }] = useLazyQuery(CITIES, {
        variables: { id: parseInt(props.countryId) }
    })

    useEffect(() => {        
        if (data) {
        }
        if (props.countryId) {
            load()
        }
    }, [data, props])

    if (!data) {
        return (<select style={{ minWidth: "200px" }}></select>)
    }

    return (
        <select
            name={props.name}
            ref={props.register}
            onChange={props.onChange}
        >
            {
                data.getAllCitiesByCountryId[0].cities.map(x => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default CitiesSelect