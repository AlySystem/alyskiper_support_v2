import React, { Fragment, useState } from 'react'
import MenuMain from '../Menu/Menu'
import Login from '../Login/Login'
import { Layout, Breadcrumb } from 'antd';
import { Router } from '@reach/router'
import Dashboard from '../Dashboard/Dashboard'
import logo1 from '../../assets/img/AlySystem.png'
import logo from '../../assets/img/A.png'
import { navigate } from '@reach/router'
import MainComercios from '../Comercios/MainComercios'
import Ejecutivo from '../Ejecutivos/Ej'
import NuevoEjecutivo from "../Ejecutivos/NuevoEjecutivo"
import FormularioChoferes from '../Choferes/FormularioChoferes'
import MainChoferes from '../Choferes/MainChoferes'
const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    if (!localStorage.getItem('token')) {
        navigate('/login')
        return (<Login />)
    }

    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div>
                    {
                        collapsed === true ? (
                            <img src={logo}
                                alt='logo' width='60' height='50' style={{ marginRight: '10px' }} />
                        ) : (
                                <img src={logo1}
                                    width='180'
                                    alt='logo'
                                />
                            )
                    }
                </div>
                <MenuMain />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='back' style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Fragment>
                            <Router>
                                <Dashboard path="/dashboard" />
                                <MainComercios path="/comercios" />
                                <Ejecutivo path="/ejecutivos" />
                                <NuevoEjecutivo path="/ejecutivos/nuevo" />
                                <FormularioChoferes path="/choferes/nuevo" />
                                <MainChoferes path="/choferes"/>
                            </Router>
                        </Fragment>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Alyskiper Soporte</Footer>
            </Layout>
        </Layout>
    )
}

export default Home
