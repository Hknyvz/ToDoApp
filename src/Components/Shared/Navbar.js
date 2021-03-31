import { Col, Divider, Menu, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import React, { useState } from "react"
import SubMenu from 'antd/lib/menu/SubMenu';
import "./shared.css";
import { Link } from "react-router-dom"


function Navbar() {

    const [current, setCurrent] = useState()
    const [state, setState] = useState({
        current: 'mail',
    })
    const handleClick = e => {
        setState({ current: e.key });
    };

    return (
        <Row justify="space-around" className="navbar">
            <div className="appName"><Link to="/">TODO APP</Link></div>
            <Menu className="navMenu" mode="horizontal">
                    
                    <SubMenu key="SubMenu" icon={<MenuOutlined />} title="Menu">
                        <Menu.ItemGroup >
                            <Menu.Item key="todo"><Link to="/">Todo List</Link></Menu.Item>
                            <Menu.Item key="calendar"><Link to="/calendar">Calendar</Link></Menu.Item>
                        </Menu.ItemGroup>
                        <Divider className="diveder"></Divider>
                        <Menu.ItemGroup >
                            <Menu.Item key="signin"><Link to="/signin">Sign In</Link></Menu.Item>
                            <Menu.Item key="signup"><Link to="/signup">Sign Up</Link></Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
            </Menu>
        </Row>
    );
}

export default Navbar;