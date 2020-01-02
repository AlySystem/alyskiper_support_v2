import React, { useState } from 'react'
import { USUARIO_POR_EMAIL } from '../../Queries/index'
import { useLazyQuery } from '@apollo/react-hooks'
const UserInfo = (props) => {
    const [usuarioObject, setUsuarioObject] = useState()
    let email

    const [loadUserData] = useLazyQuery(USUARIO_POR_EMAIL, {
        onError: (error) => console.error(error),
        onCompleted: (data) => {
            if (props.callback)
                props.callback(data.searchUserByEmail)

            setUsuarioObject(data.searchUserByEmail)
        }
    })

    const buscarUsuarioHandler = () => {
        loadUserData({
            variables: {
                email: email.value
            }
        })
    }

    const getUserTable = () => {
        return (<table>
            <tbody>
                <tr>
                    <td><label><b>Nombre:</b></label></td>
                    <td><label id="lblname">{usuarioObject ? usuarioObject.firstname : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Apellido:</b></label></td>
                    <td><label id="lblcountry" >{usuarioObject ? usuarioObject.lastname : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Usuario:</b></label></td>
                    <td><label id="lbluser">{usuarioObject ? usuarioObject.user : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Telefono:</b></label></td>
                    <td><label id="lblphone">{usuarioObject ? usuarioObject.phone : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Pais:</b></label></td>
                    <td><label id="lblcountry" >{usuarioObject ? usuarioObject.country.name : ''}</label></td>
                </tr>
                <tr>
                    <td><label><b>Ciudad:</b></label></td>
                    <td><label id="lblcity" >{usuarioObject ? usuarioObject.city ? usuarioObject.city.name : '' : '' }</label></td>
                </tr>
                <tr>
                    <td><label><b>Registro:</b></label></td>
                    <td><label id="lblregistro" >{usuarioObject ? usuarioObject.create_at : '' }</label></td>
                </tr>
                
            </tbody>
        </table>)
    }

    return (
        <>
            <div align="center" width="100%" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <div>
                    <label>Email</label>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <input ref={node => email = node} placeholder="Email"></input>
                        <button onClick={buscarUsuarioHandler}>Buscar</button>
                    </div>
                    <div>
                        {usuarioObject && getUserTable()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo