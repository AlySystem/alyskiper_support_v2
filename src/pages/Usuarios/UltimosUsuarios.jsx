import React,{useEffect} from 'react'
import { useQuery } from 'react-apollo'
import { OBTENER_ULTIMOS_USUARIOS_CREADOS } from '../../Queries'
import FilteredGrid from '../../components/filteredGrid/FilteredGrid'
import { useState } from 'react'

const UltimosUsuarios = _ => {

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "0",
        },
        {
            title: "Nombre",
            dataIndex: "name",
            key: "1",
        }, {
            title: "Telefono",
            dataIndex: "phone",
            key: "2",
        }, {
            title: "Email",
            dataIndex: "email",
            key: "3",
        }, {
            title: "Pais/Ciudad",
            dataIndex: "place",
            key: "4",
        }, {
            title: "Fecha",
            dataIndex: "date",
            key: "5",
        }
    ]

    const NUM_USERS = 30;

    const [rows, setRows] = useState([])

    const { data: connectedData } = useQuery(OBTENER_ULTIMOS_USUARIOS_CREADOS, {
        variables: { limit: NUM_USERS },
        pollInterval: 3000,
        onCompleted: data => {
            //console.log(data);
            setRows(buildRows(data.getLastSkiperUsers))
        },
        onError: err => { console.log(err) }
    })

    useEffect(()=>{
        if(connectedData){
            console.log("Actualiza Estado")
            setRows(buildRows(connectedData.getLastSkiperUsers))
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
                name: item.firstname + ' ' + item.lastname,
                phone: item.phone,
                email: item.email,
                place: item.country.name + (item.city ? ( '/' + item.city.name ) : '') , 
                date: formatDate(new Date(item.create_at))
            })
        }

        return rows
    }

     return (<>
        <FilteredGrid
            columns={columns}
            rows={rows}
        />
    </>)
}

export default UltimosUsuarios