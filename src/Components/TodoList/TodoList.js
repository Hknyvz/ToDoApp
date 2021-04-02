import React, { useEffect, useState, useContext } from 'react'
import Container from '../Shared/Container'
import { Button, Modal, List } from 'antd';
import ListItem from './SubComponents/ListItem';
import { PlusOutlined } from '@ant-design/icons';
import ModalArea from './SubComponents/ModalArea';
import shortDate from "../../Helper/shortDate";
import { useTranslation } from "react-i18next";
import { getAllTodos } from "../../SqlMethods/get"
import { addToDo } from '../../SqlMethods/add';
import accountContext from "../Contexts/AccountContext";
import { updateTodoChecked } from "../../SqlMethods/update";
import { Redirect } from 'react-router-dom';
import { updateTodoContent } from "../../SqlMethods/update"

function TodoList() {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [datas, setDatas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState(Date)
    const [modalTitle, setModalTitle] = useState()
    const { t } = useTranslation();
    const { account, setAccount } = useContext(accountContext)
    const [todoId, setTodoId] = useState(0);
    useEffect(() => {
        setDatas(getAllTodos(account.id))
    }, [])
    const showModal = (value) => {
        setVisible(true);
        if (value.target.id) {
            let d = datas.filter(p => p.id == value.target.id)[0]
            setTitle(d.title);
            setDate(d.date);
            setDescription(d.description);
            setModalTitle(t("Todo_Update"));
            setTodoId(d.id);
        }
        else {
            setTitle("");
            setDate(shortDate(new Date()));
            setDescription("");
            setModalTitle(t("Todo_Add"));
        }
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setVisible(false);
        setConfirmLoading(false);


        if (todoId !== 0) {
            const todoData = {
                userId: account.id,
                title: title,
                description: description,
                date: date,
                id: todoId
            }
            updateTodoContent(todoData)
                .then(setDatas(getAllTodos(account.id)))
                .catch((err) => console.log(err));
            setTodoId(0);
        } else {

            const todoData = {
                userId: account.id,
                title: title,
                description: description,
                isDone: false,
                date: date
            }
            addToDo(todoData)
                .then(setDatas(getAllTodos(account.id)))
                .catch((err) => console.log(err));
        }
    };

    const handleCancel = () => {
        setVisible(false);
        setTodoId(0);
    };

    const handleChecked = (event) => {
        const value = {
            id: event.target.id,
            isDone: event.target.checked
        }
        updateTodoChecked(value)
            .then(setDatas(getAllTodos(account.id)))
            .catch((err) => console.log(err));
    }

    return (
        <>
            {account.id === "" && <Redirect to="/signin" />}
            <Container>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />} />
                <List
                    itemLayout="horizontal"
                    dataSource={datas}
                    renderItem={item => (
                        <ListItem
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            id={item.id}
                            onClick={(value) => showModal(value)}
                            isDone={item.isDone}
                            isChecked={(value) => handleChecked(value)}
                        />
                    )}
                />
            </Container>
            <Modal
                title={modalTitle}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText={t("Save")}
                cancelText={t("Cancel")}
            >
                <ModalArea
                    titleChange={(value) => setTitle(value)}
                    descriptionChange={(value) => setDescription(value)}
                    dateChange={(value) => setDate(value)}
                    title={title}
                    description={description}
                    date={date}
                />
            </Modal>
        </>
    )
}

export default TodoList

