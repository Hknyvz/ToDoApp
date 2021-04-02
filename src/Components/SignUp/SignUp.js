import React, { useState, useEffect } from 'react'
import Container from '../Shared/Container'
import { Form, Input, Button } from 'antd';
import { useTranslation } from "react-i18next";
import * as alasql from 'alasql';
import { getAllUsers } from "../../SqlMethods/getAll"
import { addUser } from "../../SqlMethods/add"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
function SignUp() {
    const [users, setUsers] = useState([]);
    const { t } = useTranslation();
    
    useEffect(() => {
        setUsers(getAllUsers());
    }, [])

    const onFinish = (values) => {
        let user = users.filter(p => p.email == values.email);
        console.log(values);
        if (user.length === 0) {
            addUser(values)
            setUsers(getAllUsers());
        }
        else{
            alert(t("Register_Validation_Text"));
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Container>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label={t("User_Name")}
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: t("Username_Validation_Text"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: t("Email_Validation_Text"),
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        label={t("Password")}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t("Password_Validation_Text"),
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            {t("Sign_Up")}
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        </>
    )
}

export default SignUp
