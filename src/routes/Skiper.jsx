import React, { Fragment } from 'react'

import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'

import Dashboard from "../pages/Dashboard/Dashboard"
import { Router, Link } from "@reach/router";
const Skiper = () => {
	return (
		<Router>
			<Login path="/login" />
			<Dashboard path="/dashboard"/>
		</Router>
	)
}

export default Skiper
