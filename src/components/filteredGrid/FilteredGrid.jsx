import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef
} from "react";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
/**
 * Para utilizarlo fuera se debe hacer lo siguiente
 * 
 * import{ useRef } from 'react'
 * 
 * const grid = useRef()
 * 
 * columns = [{
                title: 'Propietario',
                dataIndex: 'propietario',
                key: '1',
                ...(grid.current.getColumnSearch('propietario'))
            }]
 * 
 */

const FilteredGrid = forwardRef((props, ref) => {
  const [rows, setRows] = useState(props.rows);
  const [columns, setColumns] = useState(props.columns);
  const [searchInput, setSearchInfo] = useState();
  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumns] = useState();

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
        <div style={{ padding: 8, display: "grid" }}>
          <Input
            ref={node => {
              setSearchInfo(node);
            }}
            placeholder={`Buscar ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 165, padding: 4, marginBottom: 8, gridRowStart: 1, gridRowEnd: 2, gridColumnStart: 1, gridColumnEnd: 3 }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 80, height: 40, padding: 8, gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 1, gridColumnEnd: 2 }}
          >
            Search
        </Button>
          <Button
            type="primary"
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 80, height: 40, padding: 8, gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 2, gridColumnEnd: 3 }}
          >
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
        if (searchInput) setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        )
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumns(dataIndex);
    /*this.setState({ 
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
          });*/
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
    //this.setState({ searchText: '' });
  };

  useImperativeHandle(ref, () => ({
    getColumnSearch(dataIndex) {
      return getColumnSearchProps(dataIndex);
    }
  }));

  useEffect(() => {
    setRows(props.rows);
    console.log('rows enviados: ', props.rows)
  }, [props.rows])

  useEffect(() => {
    setColumns(props.columns)
    console.log('columns enviadas: ', props.columns)
  }, [props.columns])

  return (
    <Table
      style={{ fontFamily: "Lato, sans-serif" }}
      size="small"
      columns={columns}
      dataSource={rows}
      rowClassName={props.rowClassName}
      rowKey={record => record.id}
      //   scroll={{ x: 1155 }}
      responsive
    />
  );
});

export default FilteredGrid;
