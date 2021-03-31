import { DatePicker, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React,{useState,useEffect} from 'react'

function ModalArea(props) {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        setDate(props.date);
        setDescription(props.description);
        setTitle(props.title);
    }, [])

    return (
        <>
            <div>Title</div>
            <Input onChange={(value)=>props.titleChange(value.target.value)} value={title}/>
            <div>Description</div>
            <TextArea onChange={(value)=>props.descriptionChange(value.target.value)} value={description}/>
            <div>Date</div>
            <DatePicker onChange={(value)=>props.dateCahnge(value.target.value)} value={date}/>
        </>
    )
}

export default ModalArea
