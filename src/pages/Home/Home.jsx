import React, { Fragment } from 'react'
import MenuMain from '../Menu/Menu'
import Login from '../Login/Login'

import Skiper from '../../routes/Skiper'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Router } from '@reach/router'
import Dashboard from '../Dashboard/Dashboard'
import logo1 from '../../assets/img/AlySystem.png'
import logo from '../../assets/img/A.png'



const { Header, Content, Footer, Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
		<div>
        {
        this.state.collapsed === true ? (
            <img src={logo} 
            alt='logo' width='60' height='50' style={{marginRight:'10px'}}/>
            ) : (
			<img src={logo1} 
			width='180'
            alt='logo'
            />
        	)
    	}                                
        </div>
          <MenuMain/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className='back' style={{ padding: 24, background: '#fff', minHeight: 360 }}>
			<Router>
      {/* <Login path='/login' /> */}
      			<Dashboard path='/dashboard' />
    		</Router>
			</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Alyskiper Soporte</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default Home
