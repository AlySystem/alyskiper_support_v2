import React from 'react'
import { ANNO } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const YearSelect = (props) => {
    const { data } = useQuery(ANNO)

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
                
                data.vehicleyears.map((x) => {
                    return <option key={x.id} value={x.id}>{x.year}</option>
                })
            }
        </select >
    )
}

export default YearSelect