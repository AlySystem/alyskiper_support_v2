import React, { useState, useEffect } from 'react'
import { OBTENER_WALLET_DE_USUARIO } from '../../Queries/index'
import { useLazyQuery } from '@apollo/react-hooks'
const WalletsFromUserSelect = (props) => {

    const [select, setSelect] = useState(<select></select>)
    const [ready, setReady] = useState(true)

    const [load, { data,loading, called }] = useLazyQuery(OBTENER_WALLET_DE_USUARIO, {
        onCompleted: () => { setReady(true);console.log("termino carga");console.log(data) ;setSelect(onDataLoaded()) }
    })


    const getOptions = () => {
        return (
            data.getAllSkiperWalletsByUserId.map(x => {
                return <option key={x.id} value={x.id}>{x.currencyID.name}</option>
            })
        )
    }

    console.log("el log:: ", props.userId, loading, called)
    console.log("ready",ready)
    
    useEffect(()=>{
        if(props.userId&&ready){
            load({
                variables: {
                    iduser: props.userId
                }
            })
            setReady(false)
        }
    },[props.userId])

    const onDataLoaded = () => {
        return (
            <select
                name={props.name}
                ref={props.register}
                onChange={props.onChange}
                defaultValue={data.getAllSkiperWalletsByUserId[0]}
            >
                {data.getAllSkiperWalletsByUserId && getOptions()}
            </select >
        )
    }

    return (select)
}

export default WalletsFromUserSelect