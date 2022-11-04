import React from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Card } from "antd";
import { axiosInstance } from 'api';


export default function Logout() {
    const navigate = useNavigate();
    const { Link } = Anchor;

    return (
        <Card title="logout successfully" style={{ width: "768px", margin: "20px auto" }}>
            <Anchor>
                <Link
                    href="/accounts/login"
                    title="Back to Login Page"
                />
            </Anchor>
        </Card>
    );
}