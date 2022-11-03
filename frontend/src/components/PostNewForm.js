import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, Modal, notification } from "antd";
import { FrownOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64FromFile } from "utils/base64";
import {  useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";
import Axios from "axios";



export default function PostNewForm() {
    const navigate = useNavigate();
    const { store: { jwtToken } } = useAppContext();
    const [fieldErrors, setFieldErrors] = useState({});
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    });

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handlePreviewPhoto = async file => {
        if ( !file.url && !file.preview ) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }
        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview
        });
    };

    const handleFinish = async fieldValues => {
        const { caption, location, photo: { fileList } } = fieldValues;

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("location", location);

        fileList.forEach(file => {
            formData.append("photo", file.originFileObj);
        });

        const headers = { Authorization: `Bearer ${jwtToken}` };
        try {
            const response = await Axios.post("http://127.0.0.1:8000/api/posts/", formData, { headers });
            console.log("success response : ", response);
            navigate('/');


        }
        catch(error) {
            if ( error.response ) {
                const {  status, data: fieldsErrorMessages } = error.response;
                if ( typeof fieldsErrorMessages === "string" ) {
                    notification.open({
                        message : "Server Error",
                        description : `${status} error occurred. You have to check your server.`,
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />,
                    });
                }
                else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset:8, span: 16 },
    };

    return (
        <Form
            {...layout}
            onFinish={handleFinish}
            autoComplete={"false"}
        >
            <Form.Item
                label="Caption"
                name="caption"
                rules={[
                    { required: true, message: 'Please input your Caption!' },
                ]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                rules={[
                    { required: true, message: 'Please input your Location!' },
                ]}
                hasFeedback
                {...fieldErrors.location}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Photo"
                name="photo"
                rules={[
                    { required: true, message: "You have to provide a photo" },
                ]}
                hasFeedback
                {...fieldErrors.photo}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => { return false; }}
                    onChange={handleUploadChange}
                    onPreview={handlePreviewPhoto}
                >
                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">Upload</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Modal
                open={previewPhoto.visible}
                footer={null}
                onCancel={() => setPreviewPhoto({ visible: false })}
            >
                <img
                    src={previewPhoto.base64}
                    style={{ width: "100%"}}
                    alt="Preview"
                />
            </Modal>
            <hr />

        </Form>
    )

}