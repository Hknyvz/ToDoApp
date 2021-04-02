import { Col, Divider, Menu, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { GlobalOutlined } from '@ant-design/icons';
import React, { useContext, useState, useEffect } from "react"
import SubMenu from 'antd/lib/menu/SubMenu';
import "./shared.css";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import accountContext from "../Contexts/AccountContext";
import getCookie from "../../Helper/getCookie";

function Navbar() {
    const { account, setAccount } = useContext(accountContext)
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    useEffect(() => {
        const accuountData = {
            id: getCookie("id"),
            userName: getCookie("userName"),
            email: getCookie("email")
        }
        setAccount(accuountData);
    }, [])
    const signOut = () => {
        setAccount({ id: "", userName: "", email: "" });
        document.cookie = `id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

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
                        {account.id === "" && <Menu.Item key="signin"><Link to="/signin">{t("Sign_In")}</Link></Menu.Item>}
                        {account.id === "" && <Menu.Item key="signup"><Link to="/signup">{t("Sign_Up")}</Link></Menu.Item>}
                        {account.id !== "" && <Menu.Item key="signout" onClick={() => signOut()}>{t("Sign_Out")}</Menu.Item>}
                    </Menu.ItemGroup>
                </SubMenu>

            </Menu>
        </Row>
    );
}

export default Navbar;