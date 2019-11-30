import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "@reach/router";
import { FaSignInAlt } from 'react-icons/fa'
const { SubMenu } = Menu;

const MenuMain = () => {
  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="sub0"
          //   title={
          //     <span>
          //       <Icon type='Home' />
          //       <span>
          //         <Link to='/dashboard'>Dashboard</Link>
          //       </span>
          //     </span>
          //   }
        >
          <Icon type="home" theme="filled" twoToneColor='#020202' />
          <span>
            <Link to='/dashboard'>
              <span style={{ color: 'white' }}>Dashboard </span> 
            </Link>
          </span>
        </Menu.Item>
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='appstore' theme='filled' />
              <span>Comercios</span>
            </span>
          }
        >
          <Menu.Item key='3'>Admin Comercio</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          title={
            <span>
              <Icon type='pie-chart' theme='filled' />
              <span>Ejecutivo</span>
            </span>
          }
        >
          <Menu.Item key='4'>Admin Ejecutivo</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          title={
            <span>
              <Icon type="car" theme="filled" />
              <span>Drive</span>
            </span>
          }
        >
          <Menu.Item key='5'>Admin Drive</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub4'
          title={
            <span>
              <Icon type="file-text" theme="filled" />
              <span>Reportes</span>
            </span>
          }
        >
          <Menu.Item key='5'>Generar reportes</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          title={
            <span className='conant'>
              <FaSignInAlt color='blue' size='1.3rem' className='ico'/>  
              <span>Cerar seccion</span>
            </span>
          }
        >
          <Menu.Item key='5'>Cerar seccion</Menu.Item>
        </SubMenu>
      </Menu>
      {/* <Menu theme='dark'> */}
      {/* <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="home" />
              <span>
                <Link to="/dashboard">Dashboard</Link>
              </span>
            </span>
          }
        ></SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="unordered-list" />
              <span>Comercios</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">Ver Comercios</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="unordered-list" />
              <span>Reportes</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">Reporte 1</span>
          </Menu.Item>
        </SubMenu>
      </Menu> */}
    </>
  );
};

export default MenuMain;
