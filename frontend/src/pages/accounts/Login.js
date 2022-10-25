import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Axios from "axios";
import useLocalStorage from "utils/useLocalStorage";

export default function Login() {
    let navigate = useNavigate();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({});

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset:8, span: 16 },
    };

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };

            try {
                const response = await Axios.post("http://127.0.0.1:8000/accounts/token/", data);

                const { data: { access: accessToken } } = response;

                console.log("accessToken: ", accessToken );

                setJwtToken(accessToken);

                notification.open({
                    message : "Login successfully",
                    description : "Moving to PostList page",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });

//                navigate("/accounts/login"); TODO: 이동주소
            }
            catch(error) {
                if ( error.response ) {

                    notification.open({
                        message : "Login failed",
                        description : "Check your ID/Password and try again",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />,
                    });

                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors] ) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" "),
                                };
                                return acc;
                            }, {}
                        )
                    );
                }
            }
        }
        fn();
    };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <Card title="login">
            <Form
                {...layout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 5, message: "Please input more than 5 letters!" },
                    ]}
                    hasFeedback
                    {...fieldErrors.username}


                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                    ]}
                    hasFeedback
                    {...fieldErrors.password}

                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
}
