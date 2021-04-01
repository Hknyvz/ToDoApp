import React, { useEffect, useState } from 'react'
import Container from '../Shared/Container'
import { Button, Modal, List, Input } from 'antd';
import ListItem from './SubComponents/ListItem';
import { PlusOutlined } from '@ant-design/icons';
import ModalArea from './SubComponents/ModalArea';
import shortDate from "../../Helper/shortDate";

const data1 = [
    {
        title: 'Ant Design Title 1',
        id: 1,
        description:"description-1",
        date:"2021-04-01"
    },
    {
        title: 'Ant Design Title 2',
        id: 2
    },
    {
        title: 'Ant Design Title 3',
        id: 3
    },
    {
        title: 'Ant Design Title 4',
        id: 4
    },
];
function TodoList(props) {
    const [size, setSize] = useState({
        size: 'large',
    });
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState(Date)

    useEffect(() => {
        setData(props.data)
    })

    const showModal = (value) => {
        setVisible(true);
        if(value.target.id){
            let d=data1.filter(p=>p.id==value.target.id)[0]
            setTitle(d.title);
            setDate(d.date);
            setDescription(d.description);
        }
        else{
            setTitle("");
            setDate(shortDate(new Date()));
            setDescription("");
        }
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
            //Local storage işlemlerinin yapılacağı yer 
            console.log(title);
            console.log(description);
            console.log(date);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };


    return (
        <>
            <Container>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />} size={size} />
                <List
                    itemLayout="horizontal"
                    dataSource={data1}
                    renderItem={item => (
                        <ListItem 
                        title={item.title} 
                        description={item.description}
                        date={item.date}
                        id={item.id} 
                        onClick={(value) => showModal(value)}

                        />
                    )}
                />
            </Container>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
            <ModalArea
                titleChange={(value)=>setTitle(value)}
                descriptionChange={(value)=>setDescription(value)}
                dateChange={(value)=>setDate(value)}
                title={title}
                description={description}
                date={date}
            />
            </Modal>
        </>
    )
}

export default TodoList

