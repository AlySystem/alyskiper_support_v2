import React from 'react'
import { MARCA } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const TrademarkSelect = (props) => {
    const { data } = useQuery(MARCA)

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

                data.getAllVehicleTrademark.map((x) => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default TrademarkSelect