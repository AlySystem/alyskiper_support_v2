import React, { useState } from 'react'
import BarGraph from './BarGraph'
import LineGraph from './LineGraph'
import PieChart from './PieChart'
import { Modal } from 'antd'
import LastUsers from './LastUsers'
const Dashboard = (props) => {
    const [modalState, setModalState] = useState(false)
    const [panes, setPanes] = useState([])
    
    const showModal = () => {
        this.setState({
            visible: true,
        })
    }

    const handleOk = e => {
        console.log(e)
        this.setState({
            visible: false
        })
    }

    const handleCancel = e => {
        console.log(e)
        this.setState({
            visible: false
        })
    }
    const add = () => {
        const activeKey = `newTab${this.newTabIndex++}`
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
        setPanes(activeKey)
    }
    const remove = targetKey => {
        let { activeKey } = this.state
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1
            }
        })
        const panes = panes.filter(pane => pane.key !== targetKey)
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key
            } else {
                activeKey = panes[0].key
            }
        }
        setPanes(activeKey)
    }
    console.log("entro al dashboard")
    return (
        <div>
            {console.log("asdfasdfasd")}
            <div>
                <Modal
                    title="Basic Modal"
                    visible={modalState}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >

                </Modal>
            </div >
            <div className="card-container">
                <LastUsers/>
            </div>
        </div>
    )
}

export default Dashboard