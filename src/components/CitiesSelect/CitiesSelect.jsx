import React from 'react'
import { COUNTRIES, CITIES, CIVIL } from '../../Queries'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

const CitiesSelect = (props) => {
    const [load, { called, loading, data }] = useLazyQuery(CITIES, {
        variables: { id: parseInt(props.countryId) }
    })
    useEffect(()=>{
        if(props.callback){
            if(data)
                if(data.getAllCitiesByCountryId[0].cities[0])
                    props.callback(data.getAllCitiesByCountryId[0].cities[0].id)   
        }
    },[data])

    useEffect(() => {
        if (props.countryId) {
            load()
        }
    }, [props])

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
                
                data.getAllCitiesByCountryId[0].cities.map((x,index) => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default CitiesSelect