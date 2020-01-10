import React from 'react'
import io from 'socket.io-client'

const drive = {
    userId: 999,
    name: "albert wesker fist connect",
    lat: 123,
    lng: 456,
    categoryId: 1
}

const adminSocket = io.connect('http://localhost:3000', {
    query: { drive: JSON.stringify(drive) }
})

adminSocket.on('msgToClient', data => {console.log("msgToClient"); console.log(data)});
adminSocket.on('silverTravels', data => { console.log("silver envio"); console.log(data) })
adminSocket.on('global', data => { console.log("silver envio");  console.log(data)})

const WebSocket = _ => {
    const messageHandler = _ => {
        console.log("enviado")

        adminSocket.emit('msgToServer', { wdf: "Esta vivo, viiivoooOoo!!!!!!!!!!" })
    }

    const listHandler = _ => {
        console.log("enviado")
        let info = { categoryId: 10 }
        adminSocket.emit('getUsers', info)
    }

    const setLocationHandler = _ => {
        console.log("enviado")

        adminSocket.emit('setLocation', JSON.stringify({
            name: "Albert Wesker",
            lat: Math.random(),
            lng: Math.random()
        }))
    }

    return (<>
        {/* <button onClick={messageHandler}>Send msg</button> */}
        <button onClick={listHandler}>List Users</button>
        <button onClick={setLocationHandler}>SetLocation</button>
    </>)
}

export default WebSocket