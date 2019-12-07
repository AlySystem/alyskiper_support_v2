import React from 'react'
import { MODELO } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const ModelSelect = (props) => {
    const { data } = useQuery(MODELO)

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
                
                data.vehiclemodels.map((x) => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default ModelSelect