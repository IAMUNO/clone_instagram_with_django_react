import React, { useEffect }from 'react';
import LogoImage from "assets/logo.png";
import { Input, Menu, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { axiosInstance, useAxios } from 'api';
import { useAppContext, deleteToken } from "store";
import { useNavigate } from "react-router-dom";
import "./AppLayout.scss"


function AppLayout({ children, sidebar }) {
    const navigate = useNavigate();
    const { dispatch } = useAppContext();
    const { store: { jwtToken } } = useAppContext();

    const handleLogout = ()  => {
        dispatch(deleteToken(jwtToken));
        navigate('/accounts/logout');

        notification.open({
            message : "Logout successfully",
            description : "See you again",
            icon: <SmileOutlined style={{ color: "#722ed1" }} />,
        });

    };

    return (
    <div className="app">

        <div className="header">
            <h1 className="page-title">
                <img src={LogoImage} style={{ width: "150px" }} alt="logo" />
            </h1>

            <div className="search"><Input.Search /></div>

            <div className="topnav">
                <Menu mode="horizontal">
                    <Menu.Item onClick={handleLogout}>Log Out</Menu.Item>
                </Menu>
            </div>
        </div>

        <div className="contents">
            {children}
        </div>
        <div className="sidebar">
            {sidebar}
        </div>
        <div className="footer">
            &copy; 2022. Yunho Yoo.
        </div>
    </div>

    )

}


export default AppLayout;