import React, { useState } from 'react'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import { OBTENER_WALLET_DE_USUARIO, OBTENER_WALLETS_USUARIO } from '../../Queries/index'
import { useLazyQuery } from 'react-apollo'
import UserInfo from '../../components/UserInfo/UserInfo'
const MainWallet = () => {

    const columns = [
        {
            title: 'Moneda',
            dataIndex: 'currency',
            key: 1
        }, {
            title: 'Pais',
            dataIndex: 'country',
            key: 2
        }, {
            title: 'Saldo',
            dataIndex: 'amount',
            key: 3
        }
    ]

    const [rows, setRows] = useState();
    /*const [loadWallets] = useLazyQuery(OBTENER_WALLET_DE_USUARIO, {
        onCompleted: (data) => {
            console.log("Se completo sin errores");
            console.log(data);
            onDataLoaded(data.getAllSkiperWalletsByUserId)
        },
        onError: (error) => { console.error(error) },
        fetchPolicy:"network-only"
    })*/

    const [loadWallets] = useLazyQuery(OBTENER_WALLETS_USUARIO, {
        onCompleted: (data) => {
            console.log(data)
            setearRows(data.GetUserWallets)
        },
        onError: err => { console.error(err) }
    })

    const setearRows = (data) => {
        let wallets = data.skiperWallet.map( (item) => {
            return {
                id: item.id,
                amount:item.amount,
                amount_crypto: item.amount_crypto,
                country: item.countryID.name,
                currency: item.currencyID.name
            }
        } )

        setRows(wallets)
    }

    const onDataLoaded = (data) => {
        //getAllSkiperWalletsByUserId
        const finalRows = data.map(item => {
            return {
                id: item.id,
                currency: item.currencyID.name,
                country: item.countryID.name,
                amount: item.amount
            }
        })
        console.log(finalRows)
        setRows(finalRows)
    }

    const onBuscarClickHandler = (userData) => {
        console.log(userData)
        if(!userData) {
            console.log("usuario no existente")
            return 
        }
        
        loadWallets({
            variables: {
                id: userData.id
            }
        })
    }

    return (
        <>
            <div align="left"><h2><label>Wallets</label></h2></div>
            <div>
                <div>
                    <UserInfo callback={onBuscarClickHandler} />
                </div>
                <div>
                    <FilteredGrid columns={columns} rows={rows} />
                </div>
            </div>
        </>
    )
}

export default MainWallet