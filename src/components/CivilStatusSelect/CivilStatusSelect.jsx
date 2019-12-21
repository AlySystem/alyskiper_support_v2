import React from 'react'
import { CIVIL } from '../../Queries'
import { useEffect,useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

const CivilStatusSelect = (props) => {
    //const [countries, setCountries] = useState()

    const {
        data,
    } = useQuery(CIVIL, {
    })
    const [value, setValue] = useState()
    useEffect(() => {
        if (data) {
            console.log('obtuvo datos')
            console.log(data)
            setValue(props.defvalue)
            //setCountries(data.countries)
        }
    }, [data])

    if (!data) {
        return (<></>)
    }

    return (
        <select
            name={props.name}
            ref={props.register}
            onChange={props.onChange}
            defaultValue={data.getCivilStatus[0]}
            value={value}
        >
            {
                data.getCivilStatus.map(x => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }
        </select >
    )
}

export default CivilStatusSelect