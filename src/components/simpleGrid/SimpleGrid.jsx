import React, { useEffect, useState } from 'react'


const SimpleGrid = (props) => {

    const PAGE_SIZE = 10

    const [rows, setRows] = useState()
    const [columns, setColumns] = useState()
    const [page, setPage] = useState(1)


    function paginate(array, page_size, page_number) {
        --page_number; // because pages logically start with 1, but technically with 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }

    function getHtmlColumns(arrayColumns) {
        if(!arrayColumns) return

        return arrayColumns.map((item) => {
            return (<th>item</th>)
        })
    }

    function getHtmlRows(arrayRows) {

        if(!arrayRows) return

        const rows = paginate(arrayRows, PAGE_SIZE, page)

        return rows.map((item) => {
            return (
                <tr>
                    <td>
                        item
                    </td>
                </tr>
            )
        })
    }
    useEffect(()=> {
        console.log("las props")
        console.log(props)
    })

    useEffect(() => {
        setRows(props.rows)
        setColumns(props.columns)
        console.log(props.rows)
        console.log(props.columns)
    },[props.columns])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {getHtmlColumns(columns)}
                    </tr>
                </thead>
                <tbody>
                    {getHtmlRows(rows)}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Sum</td>
                        <td>$180</td>
                    </tr>
                </tfoot>
            </table>
        </>
    )

}

export default SimpleGrid
