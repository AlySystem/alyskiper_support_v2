import React from 'react'
import { CIVIL } from '../../Queries'
import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

const CivilStatusSelect = (props) => {
    //const [countries, setCountries] = useState()

    const {
        loading,
        data,
        error
    } = useQuery(CIVIL, {
    })

    useEffect(() => {
        if (data) {
            console.log('obtuvo datos')
            console.log(data)
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