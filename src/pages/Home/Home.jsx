import React, { Fragment } from "react"
import MenuMain from '../Menu/Menu'
import Login from '../Login/Login'
import { Layout, Menu, Icon } from 'antd';

import Skiper from "../../routes/Skiper"
const { Header, Content, Footer, Sider } = Layout;

const Home = () => {

	const token = localStorage.getItem('token')
	console.log("El token ", token)
	if (token === '') {
		return (<Login />)
	}

	return (
		<Fragment>
			<Layout style={{ minHeight: '100vh' }}>
				<Header>
					asdfasdf
				</Header>
				<Sider style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
				}}>
					<MenuMain />
				</Sider>
				<Content style={{ 'margin-left': '45px' }}>
					<Fragment>
						<Skiper />
					</Fragment>
				</Content>
				<Footer
					style={{
						overflow: 'auto',
						width: '100vh',
						position: 'fixed',
						bottom: 0,
					}}
				></Footer>
			</Layout>
		</Fragment>
	)
}

export default Home
