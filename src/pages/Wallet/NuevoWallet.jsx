import React, { useState } from 'react'
import CountriesSelect from '../../components/countriesSelect/CountriesSelect'
import CurrenciesSelect from '../../components/CurrencySelect/CurrencySelect'
import UserInfo from '../../components/UserInfo/UserInfo'
import { NUEVA_WALLET_LOCAL, NUEVA_WALLET_CRYPTO } from '../../Mutations/index'
import { useMutation } from '@apollo/react-hooks'
import useForm from 'react-hook-form'
import {navigate} from '@reach/router'
import { useRef } from 'react'
const NuevoWallet = () => {

    const [userData, setUserData] = useState()
    const { register, handleSubmit } = useForm()
    const [errors, setErrors] = useState({})
    const userInfoCallback = (data) => {
        setUserData(data)
    }

    const [createWalletLocal] = useMutation(NUEVA_WALLET_LOCAL, {
        onCompleted: (data) => {console.log("Logro ingresar el wallet"); console.log(data); navigate('/wallet') },
        onError: (error) => { console.error(error) }
    })
    const [createWalletCrypto] = useMutation(NUEVA_WALLET_CRYPTO, {
        onCompleted: (data) => {console.log("Logro ingresar el wallet Crypto"); console.log(data); navigate('/wallet') },
        onError: (error) => { console.error(error) }
    })


    const agregarWalletHandler = (values) => {
        console.log(values)

        let currency = JSON.parse(values.idcurrency)

        if (!userData) {
            console.log("seteo error")
            setErrors({ user: "No ha ingresado usuario" })
            console.log(errors)
            return
        }
        console.log("paso a input")
        const input = {
            iduser: userData.id,
            amount: 0,
            idcurrency: parseInt(currency.id),
            idcountry: parseInt(values.idcountry),
            minimun: 0,
            bretirar: false,
            date_in: new Date(Date.now())
        }
        console.log({ input: input })

        if(currency.isCrypto){
            createWalletCrypto({
                variables:{input:input}
            })
        } else {
            createWalletLocal({
                variables:{input:input}
            })
        }
        
    }

    return (
        <>
            <h2><p>Nuevo Wallet</p></h2>
            <div>
                <UserInfo callback={userInfoCallback} />
            </div>
            <form id="frmwallet" onSubmit={handleSubmit(agregarWalletHandler)}>
                <div align="center" width="100%" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <div>
                        <label>Pais</label>
                        <CountriesSelect name="idcountry" register={register} />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                        <label>Moneda</label>
                        <CurrenciesSelect name="idcurrency" register={register} />
                    </div>

                </div>
                <div align="center">
                    <button type="submit">Agregar</button>
                </div>
                <div align="center">
                    {errors.user && <h4 className="errorText">Debe Ingresar el usuario</h4>}
                </div>
            </form>
        </>
    )
}

export default NuevoWallet