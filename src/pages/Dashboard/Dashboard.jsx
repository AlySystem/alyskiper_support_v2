import React from 'react'
import BarGraph from './BarGraph'
import LineGraph from './LineGraph'
import PieChart from './PieChart'

const Dashboard = (props) => {

    return ( 
        <div className="card-container">
            <BarGraph/>
            <LineGraph/>
            <PieChart/>
        </div>
    )
}

export default Dashboard