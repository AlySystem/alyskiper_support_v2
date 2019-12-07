import React from 'react'
import { CATALOGO } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const VehicleCatalogSelect = (props) => {
    const { data } = useQuery(CATALOGO)

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
                
                data.getAllVehicleCatalog.map((x) => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default VehicleCatalogSelect