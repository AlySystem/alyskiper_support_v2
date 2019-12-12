import React, { useState } from 'react'
import UserInfo from '../../components/UserInfo/UserInfo'
import WalletsFromUserSelect from '../../components/WalletsFromUserSelect/WalletsFromUserSelect'
import useForm from 'react-hook-form'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { REGISTRAR_TRANSACCION_WALLET } from '../../Mutations/index'
import { navigate } from '@reach/router'

const RecargaWallet = () => {

    const schema = yup.object().shape({
        walletId: yup.number().positive(),
        amount: yup.number().positive()
    })

    const { register, handleSubmit, errors } = useForm({ validationSchema: schema })
    const [addTransaction, { data }] = useMutation(REGISTRAR_TRANSACCION_WALLET, {
        onCompleted: (data) => { console.log("Logro realizar la transaccion"); console.log(data); navigate('/wallet') },
        onError: (err) => { console.error(err) }
    })

    const TRANSACTION_ID_RECARGA = 5
    const PAYMENT_METHOD = 2

    const [userData, setUserData] = useState()
    const [userId, setUserId] = useState()
    const [error, setError] = useState()

    const userInfoHandler = (data) => {
        setUserData(data)
        setUserId(data.id)
        console.log(data.id)
    }
    const onSubmit = (values) => {
        console.log(values)
        if (!userData) {
            setError("No ha establecido usuario al que se recargara")
            return
        }

        console.log({
            idwallet: values.walletId,
            idtransaction: TRANSACTION_ID_RECARGA,
            idpayment_method: PAYMENT_METHOD,
            deposit: values.amount,
            description: 'Recarga de' + values.amount
        })
        addTransaction({
            variables: {
                idwallet: values.walletId,
                idtransaction: TRANSACTION_ID_RECARGA,
                idpayment_method: PAYMENT_METHOD,
                deposit: values.amount,
                description: 'Rearga'
            }
        })
    }

    return (
        <>
            <div>
                <UserInfo callback={userInfoHandler} />
                {error && <h2><p>{error}</p></h2>}
            </div>

            <div align="center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Wallet a recargar</label>
                        <WalletsFromUserSelect register={register} name="walletId" userId={userId} />
                        {errors.walletId && <h4><p>"Debe seleccionar un wallet"</p></h4>}
                        <label>Monto</label>
                        <input name="amount" ref={register} type="number" />
                        {errors.amount && <h4><p>Ingresa un monto</p></h4>}
                    </div>
                    <div>
                        <button type="submit" >Realizar Recarga</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RecargaWallet