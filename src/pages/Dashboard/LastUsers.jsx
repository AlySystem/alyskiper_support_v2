import React, { useState,useEffect } from 'react'
import nuevoUsuario from '../../assets/sounds/nuevo_usuario.mp3'
import { useRef } from 'react'
import { OBTENER_ULTIMOS_USUARIOS_REGISTRADOS } from '../../Queries/index'
import { useQuery } from '@apollo/react-hooks'
const LastUsers = _ => {

    const [arrActual, setArrActual] = useState([])

    const { data } = useQuery(OBTENER_ULTIMOS_USUARIOS_REGISTRADOS, {
        pollInterval: 100,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            console.log(data)
            let arr = arrActual.concat(data.getLastUsers)

            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            let unicos = arr.filter(onlyUnique)
            console.log("unicos", unicos)
            unicos.forEach(_ => {
                setTimeout(_ => {
                    audio.current.play()
                }, 500)
            })
            setArrActual(data.getLastUsers)
        },
        onError: (err) => {
            console.log(err.errors)
            console.log(err.message)
        }
    })

    const dummyValues = [{
        id: 1,
        firstname: 'foo',
        lastname: 'ooasdfasdfasdfasdfasdfaf',
        email: "foo@gmail.com",
        phone: '+50582815004'
    }, {
        id: 2,
        firstname: 'foo',
        lastname: 'oof',
        email: "foo@gmail.com",
        phone: '+50582815004'
    }, {
        id: 3,
        firstname: 'foo',
        lastname: 'oof',
        email: "foo@gmail.com",
        phone: '+50582815004'
    }, {
        id: 4,
        firstname: 'foo',
        lastname: 'oof',
        email: "foo@gmail.com",
        phone: '+50582815004'
    }, {
        id: 5,
        firstname: 'foo',
        lastname: 'oof',
        email: "foo@gmail.com",
        phone: '+50582815004'
    }, {
        id: 6,
        firstname: 'foo',
        lastname: 'oof',
        email: "foo@gmail.com",
        phone: '+50582815004'
    }
    ]

    const [arr, setArr] = useState(dummyValues)

    const audio = useRef()

    const clickHandler = _ => {
        //console.log(arr)
        audio.current.play()
    }

    useEffect(() => {
        if (data) {
            console.log(data)
            let arr = arrActual.concat(data.getLastUsers)

            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            let unicos = arr.filter(onlyUnique)
            console.log("unicos", unicos)
            unicos.forEach(_ => {
                setTimeout(_ => {
                    audio.current.play()
                }, 500)
            })
            setArrActual(data.getLastUsers)
        }
    }, [data])

    const tabla = _ => {
        if (data)
            return (
                data.getLastUsers.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td><a href="#">{item.firstname + '|' + item.id}</a></td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.create_at}</td>
                            <td>{item.country.name}</td>
                        </tr>
                    )
                })
            )
    }

    return (<>

        <div className="card">
            <audio ref={audio}>
                <source src={nuevoUsuario} />
            </audio>
            <button onClick={clickHandler}>play</button>
            <div align="center"><h3><b>Ultimos Usuarios</b></h3></div>
            <div align="center">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Fecha</th>
                            <th>Pais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabla()}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default LastUsers