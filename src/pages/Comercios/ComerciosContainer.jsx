import React, { useEffect,useState } from 'react'
import { COMERCIOS_QUERY } from '../../Queries/index'
import { Table, Input, Button, Icon } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import Highlighter from 'react-highlight-words'
import { Link } from "@reach/router"

const ComerciosContainer = () => {
    const [rows, setRows] = useState([])
    const { loading: loadingCommerce, data: dataCommerce, error: errorCommerce } = useQuery(COMERCIOS_QUERY, {
        variables: { id_user: 1 }
    })
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select())
            }
        },
        render: text => (
            (this.state.searchedColumn === dataIndex)
                ? <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
                : text
        )
    })
    const columns = [{
        title: 'Propietario',
        dataIndex: 'propietario',
        key: '1',
        ...getColumnSearchProps('propietario')
    }, {
        title: 'RUC',
        dataIndex: 'ruc',
        key: '2',
        ...getColumnSearchProps('ruc')
    },
    {
        title: 'Comercio',
        dataIndex: 'comercio',
        key: '3',
        width: 130,
        ...getColumnSearchProps('comercio')
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: '4',
        width: 130,
        ...getColumnSearchProps('estado')
    },
    {
        title: 'Cateogia',
        dataIndex: 'categoria',
        key: '5',
        width: 150,
        ...getColumnSearchProps('categoria')
    },
    {
        title: 'Pais',
        dataIndex: 'pais',
        key: '6',
        width: 150,
        ...getColumnSearchProps('pais')
    },
    {
        title: 'Ciudad',
        dataIndex: 'ciudad',
        key: '7',
        ...getColumnSearchProps('ciudad')
    },
    {
        title: 'Editar',
        dataIndex: 'editar',
        key: '8',
        fixed: 'right',
    },
    {
        title: 'Agregar',
        dataIndex: 'agregar',
        key: '9',
        fixed: 'right'
    }]

    useEffect(() => {
        if (dataCommerce) {
            const finalRows = []
            dataCommerce.getCommerceBySponsorId.map(item => {
                return finalRows.push({
                    key: item.id.toString(),
                    propietario: item.manager,
                    ruc: item.identification_ruc,
                    comercio: item.namecommerce,
                    estado: item.skiperAgent.state ? 'Activo' : 'Desactivado',
                    categoria: item.catCommerce.name,
                    pais: item.country.name,
                    ciudad: item.city.name,
                    color: '#ddd',
                    editar:
                        <Link to={`./editar/${item.id}`}
                            className="btn btn-info btn-block" >
                            Editar
                        </Link>,
                    agregar:
                        <Link to={`/producto/nuevo/${parseInt(item.id)}`}
                            className="btn btn-warning btn-block" >
                            Agregar
                        </Link>
                })
            })
            setRows(finalRows)
        }
    },[dataCommerce])

    return (
        <Table style={{ fontFamily: 'Lato, sans-serif' }}
            size='small'
            columns={columns}
            dataSource={rows}
            rowClassName={(record) => record.color.replace('#', ' ')}
            rowKey={record => record.id}
            scroll={{ x: 1155 }}
            responsive
        />
    )
}

export default ComerciosContainer
