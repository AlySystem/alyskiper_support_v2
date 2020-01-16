import React, { useRef, useState, useEffect } from 'react'
import { useLazyQuery, useQuery, useMutation } from 'react-apollo'
import { USUARIO_ACTUAL, USUARIO_POR_EMAIL } from '../../Queries'
import { ACTUALIZAR_SPONSOR } from '../../Mutations'


const ChangeSponsor = (props) => {

    const [sponsorId, setSponsorId] = useState()

    const { data: userData } = useQuery(USUARIO_ACTUAL, {
        variables: { id: props.userId },
        onCompleted: _ => {
            console.log(userData);
            setSponsorId(userData.searchUser.sponsor_id)
        },
        onError: (err) => { console.log(err) }
    })

    const [loadSponsor, { data: sponsorData }] = useLazyQuery(USUARIO_ACTUAL, {
        pollInterval: 3000,
        onCompleted: _ => { console.log(sponsorData) },
        onError: err => { console.log(err) }
    })

    const [updateSponsor, { data: updateResponse }] = useMutation(ACTUALIZAR_SPONSOR, {
        onCompleted: _ => { console.log(updateResponse); alert("Sponsor cambiado correctamente") },
        onError: err => { console.log(err) }
    })

    useEffect(() => {
        if (!sponsorId)
            return

        console.log("Se actualizo")
        loadSponsor({ variables: { id: sponsorId } })
    }, [sponsorId])

    const buildTable = (data) => {
        return (<table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.firstname +' ' + data.lastname}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                </tr>
            </tbody>
        </table>
        )
    }

    const input = useRef()
    const changeControl = _ => {
        return (<>
            <div style={{ display: "flex",alignItems: "center",justifyContent: "center" }}>
                <input ref={input} placeholder="email" />
                <button onClick={changeSponsorHandler}>Cambiar</button>
            </div>
        </>)
    }


    const [loadNewSponsor, { data: newSponsorData }] = useLazyQuery(USUARIO_POR_EMAIL, {
        onCompleted: _ => {
            console.log(newSponsorData)
            if (!newSponsorData.searchUserByEmail) {
                alert("Usuario no encontrado, verificar email!")
                return
            }
            setSponsorId(newSponsorData.searchUserByEmail.id)
            updateSponsor({
                variables: { idUser: props.userId, idSponsor: newSponsorData.searchUserByEmail.id }
            })
        },
        onError: err => { console.log(err) }
    })

    const changeSponsorHandler = _ => {
        console.log(input)
        let value = input.current.value
        console.log(value)
        if (value === '')
            return

        loadNewSponsor({
            variables: {
                email: value.trim()
            }
        })
    }

    return (<>
        <h2>Sponsor</h2>
        <div align="center" width="100%">
            {changeControl()}
        </div>
        <div >
            {sponsorData && buildTable(sponsorData.searchUser)}
        </div>

    </>)
}

export default ChangeSponsor