import React from 'react'
import Home from '../pages/Home/Home'
import ComercioContainer from '../pages/Comercios/ComerciosContainer'
import { Router } from '@reach/router'
const Skiper = () => {
    return (
        <Router>
            {/* <Login path='/login' /> */}
            <Home path='/home' />
            <ComercioContainer path='/comercios'/>
            {/* <Dashboard path='/dashboard' /> */}
        </Router>
    )
}

export default Skiper
