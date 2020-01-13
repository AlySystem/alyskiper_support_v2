import React,{useEffect} from 'react'
import { useQuery } from 'react-apollo'
import { OBTENER_TRAVELS_INFO } from '../../Queries'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import { useState } from 'react'



const UsuariosConectados = _ => {

    const columns = [
        {
            title: "ID Viaje",
            dataIndex: "id",
            key: "0",
        },
        {
            title: "Chofer",
            dataIndex: "chofer",
            key: "1",
        }, {
            title: "Cliente",
            dataIndex: "cliente",
            key: "2",
        }, {
            title: "Estado",
            dataIndex: "estado",
            key: "3",
        }, {
            title: "Fecha",
            dataIndex: "fecha",
            key: "4",
        }
    ]

    const [rows, setRows] = useState([])

    const { data: connectedData } = useQuery(OBTENER_TRAVELS_INFO, {
        pollInterval: 3000,
        onCompleted: data => {
            //console.log(data);
            setRows(buildRows(data.getAllTravels))
        },
        onError: err => { console.log(err) }
    })

    useEffect(()=>{
        if(connectedData){
            console.log("Actualiza Estado")
            setRows(buildRows(connectedData.getAllTravels))
        }
    },[connectedData])

    function formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear() + "  " + strTime;
      }

    const buildRows = (data) => {
        let rows = []

        for (let item of data) {
            rows.push({
                id: item.id,
                choferUserId: item.skiperagent.user.id,
                chofer: item.skiperagent.user.firstname + ' ' + item.skiperagent.user.lastname,
                clienteUserId: item.users.id,
                cliente: item.users.firstname + ' ' + item.users.lastname,
                idEstado: item.skiperTravelsTracing[0].travelstatus.id,
                estado: item.skiperTravelsTracing[0].travelstatus.name,
                fecha: formatDate(new Date(item.skiperTravelsTracing[0].datetracing))
            })
        }

        return rows
    }

    const getRowClass = (record) => {
        const arrVerde = [1, 2, 3, 4, 5, 6, 7, 8]
        if (arrVerde.includes(record.idEstado)) {
            return "rowGreen"
        } else {
            return "rowRed"
        }
    }

    return (<>
        <FilteredGrid
            columns={columns}
            rows={rows}
            rowClassName={record => getRowClass(record)}
        />
    </>)
}

export default UsuariosConectados