import React, { useState } from 'react';
import { axiosInstance } from 'api';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Card } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

export default function Signup() {
    let navigate = useNavigate();
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
                await axiosInstance.post("/accounts/signup/", data);

                notification.open({
                    message : "Signup successfully",
                    description : "Moving to Login page",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });

                navigate("/accounts/login");
            }
            catch(error) {
                if ( error.response ) {

                    notification.open({
                        message : "Signup failed",
                        description : "Check your ID/Password and try again",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />,
                    });

                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
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
        <Card title="Signup" style={{ width: "768px" ,margin: "20px auto" }}>
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
                    hasFeedback{...fieldErrors.username}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                    ]}
                    hasFeedback{...fieldErrors.password}
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

