import React, { useEffect, useState } from 'react'
import { HORARIOS } from '../../Queries'
import { useQuery } from '@apollo/react-hooks'


const ScheduleSelect = ({ onChange, register, options, name, ...rest }) => {

    const { data } = useQuery(HORARIOS, {
        onCompleted: _ => setValue(rest.defvalue)
    })

    const [value, setValue] = useState()

    useEffect(() => {
        if (data) {
            console.log('obtuvo datos')
            console.log(data)
        }
    }, [data])

    if (!data) {
        return (<select></select>)
    }

    return (
        <select
            name={name}
            ref={register}
            onChange={onChange}
            {...rest}
            value={value}
        >
            {
                data.getAllSkiperDriverSchedule.map(x => {
                    return <option key={x.id} value={x.id}>{x.turn}</option>
                })
            }
        </select >
    )
}

export default ScheduleSelect