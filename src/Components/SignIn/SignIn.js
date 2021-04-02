import React, { useState, useEffect, useContext } from 'react'
import Container from '../Shared/Container'
import { Form, Input, Button, Checkbox } from 'antd';
import { useTranslation } from "react-i18next";
import { getAllUsers } from "../../SqlMethods/getAll"
import accountContext from "../Contexts/AccountContext";
import {Link, Redirect} from "react-router-dom";
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
function SignIn() {
    const [users, setUsers] = useState([]);
    const { account, setAccount } = useContext(accountContext);
    const { t } = useTranslation();

    useEffect(() => {
        setUsers(getAllUsers());
    }, [])
    const onFinish = (values) => {
        let user = users.filter(p => p.email == values.email);
        console.log(user);

        if (user[0].id) {
            setAccount({id:user[0].id,userName:user[0].userName,email:user[0].email});
            if (values.isRemember) {
                document.cookie = `id=${user[0].id}`;
                document.cookie = `email=${user[0].email}`;
                document.cookie = `userName=${user[0].userName}`;
            }
            
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log(account);
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
                        label={t("Email")}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: t("Email_Validation_Text"),
                            },
                        ]}
                    >
                        <Input />
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

                    <Form.Item {...tailLayout} name="isRemember" valuePropName="checked">
                        <Checkbox>{t("Remember_Me")}</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        
                            <Button type="primary" htmlType="submit">{t("Sign_In")}</Button>
                            <Button type="link"><Link to="/signup">{t("Sign_Up")}</Link></Button>
                            {account.id!==""&&<Redirect to="/"/>}
                    </Form.Item>
                </Form>
            </Container>
        </>
    )
}

export default SignIn
