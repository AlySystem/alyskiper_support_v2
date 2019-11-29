import React from 'react'
import { Menu, Icon } from 'antd';
import { Link } from "@reach/router"
const { SubMenu } = Menu;

const MenuMain = () => {
    return (
        <Menu theme="dark" mode="inline">
            <Menu.Item
                key="sub1"
            >
                <span>
                    <Icon type="home" />
                    <span><Link to="/dashboard">Dashboard</Link></span>
                </span>
            </Menu.Item>
            <SubMenu key="sub2"
                title={
                    <span>
                        <Icon type="unordered-list" />
                        <span>Comercios</span>
                    </span>
                }>
                <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">Ver Comercios</span>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3"
                title={
                    <span>
                        <Icon type="unordered-list" />
                        <span>Reportes</span>
                    </span>
                }>
                <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">Reporte 1</span>
                </Menu.Item>

            </SubMenu>
        </Menu >
    )
}

export default MenuMain