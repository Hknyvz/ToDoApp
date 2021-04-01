import { Col, Divider, Menu, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { GlobalOutlined } from '@ant-design/icons';
import React, { useState } from "react"
import SubMenu from 'antd/lib/menu/SubMenu';
import "./shared.css";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";


function Navbar() {

    const [current, setCurrent] = useState()
    const [state, setState] = useState({
        current: 'mail',
    })
    const handleClick = e => {
        setState({ current: e.key });
    };

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
        return (
            <Row justify="space-around" className="navbar">
                <div className="appName"><Link to="/">TODO APP</Link></div>
                <Menu className="navMenu" mode="horizontal">
                    <SubMenu key="language" icon={<GlobalOutlined />} title={t("Language")}>
                        <Menu.Item key="tr" onClick={() => changeLanguage("tr")}>TR</Menu.Item>
                        <Menu.Item key="en" onClick={() => changeLanguage("en")}>EN</Menu.Item>
                    </SubMenu>

                    <SubMenu key="SubMenu" icon={<MenuOutlined />} title={t("Menu")}>
                        <Menu.ItemGroup >
                            <Menu.Item key="todo"><Link to="/">{t("To_Do")}</Link></Menu.Item>
                            <Menu.Item key="calendar"><Link to="/calendar">{t("Calendar")}</Link></Menu.Item>
                        </Menu.ItemGroup>
                        <Divider className="diveder"></Divider>
                        <Menu.ItemGroup >
                            <Menu.Item key="signin"><Link to="/signin">{t("Sign_In")}</Link></Menu.Item>
                            <Menu.Item key="signup"><Link to="/signup">{t("Sign_Up")}</Link></Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>

                </Menu>
            </Row>
        );
}

export default Navbar;