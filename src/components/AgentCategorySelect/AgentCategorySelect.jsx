import React from 'react'
import { CATEGORIAAGENTE_QUERY } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const AgentCategorySelect = (props) => {
    //const [countries, setCountries] = useState()

    const {data} = useQuery(CATEGORIAAGENTE_QUERY)

    const getOptions = () => {
        return (
            data.categoriesAgents.map(x => {
                return <option key={x.id} value={x.id}>{x.name}</option>
            })
        )
    }

    if(!data){
        return(<select></select>)
    }

    return (
        <select
            name={props.name}
            ref={props.register}
            onChange={props.onChange}
            defaultValue={data.categoriesAgents[0]}
        >
            {data.categoriesAgents && getOptions()}
        </select >
    )
}

export default AgentCategorySelect