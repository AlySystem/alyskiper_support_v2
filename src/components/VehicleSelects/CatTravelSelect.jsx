import React,{useState} from 'react'
import { SKIPER_CATEGORIA } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const CatTravelSelect = (props) => {
    const { data } = useQuery(SKIPER_CATEGORIA,{
        onCompleted: _=> setValue(props.defvalue)
    })
    const [value,setValue] = useState()
    if (!data) {
        return (<select style={{ minWidth: "200px" }}></select>)
    }

    return (
        <select
            name={props.name}
            ref={props.register}
            onChange={props.onChange}    
            value={value}
        >
            {
                data.skipercattravels.map((x) => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default CatTravelSelect      