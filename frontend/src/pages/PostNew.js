import React, { useState } from 'react';
import { Card, Form, Input, Button } from "antd";


export default function PostNew() {
    const [fieldErrors, setFieldErrors] = useState({});
    const handleFinish = () => {};

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset:8, span: 16 },
    };

    return (
        <Card title="login">
            <Form
                {...layout}
                onFinish={handleFinish}
//                onFinishFailed={onFinishFailed}
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

    )

}