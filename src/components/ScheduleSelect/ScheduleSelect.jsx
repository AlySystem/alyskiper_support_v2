import React from 'react'
import { HORARIOS } from '../../Queries'
import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'


const ScheduleSelect = ({ onChange, register, options, name, ...rest }) => {

    const {
        data,
    } = useQuery(HORARIOS, {
    })

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