import React, { useState } from 'react'
import nuevoUsuario from '../../assets/sounds/nuevo_usuario.mp3'
import { useRef } from 'react'
const LastUsers = _ => {

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
        console.log(arr)
        audio.current.play()
        let newArr = [{
            id: 7,
            firstname: Date.now(),
            lastname: 'oof',
            email: "foo@gmail.com",
            phone: '+50582815004'
        }, ...arr]
        newArr.pop()
        console.log(newArr)
        setArr(newArr)
    }

    return (<>

        <div className="card">
            <audio ref={audio}>
                <source src={nuevoUsuario} />
            </audio>
            <button onClick={clickHandler}>play</button>
            <div align="center"><h3>Ultimos Usuarios</h3></div>
            <div align="center">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arr.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><a href="#">{item.firstname + '-' + item.id}</a></td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default LastUsers