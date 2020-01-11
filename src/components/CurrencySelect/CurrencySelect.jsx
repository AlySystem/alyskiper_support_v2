import React from 'react'
import { MONEDAS } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'

const CurrencySelect = (props) => {
    //const [countries, setCountries] = useState()

    const {data} = useQuery(MONEDAS)

    const getOptions = () => {
        return (
            data.currency.map(x => {
                let obj = {
                    id: x.id,
                    isCrypto: x.isCrypto
                }
                return <option key={x.id} value={ JSON.stringify(obj) }>{x.name}</option>
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
            defaultValue={data.currency[0]}
        >
            {data.currency && getOptions()}
        </select >
    )
}

export default CurrencySelect