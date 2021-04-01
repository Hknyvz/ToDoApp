import { DatePicker, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect } from 'react'
import 'moment/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';
import splitDate from "../../../Helper/splitDate"
import shortDate from '../../../Helper/shortDate';
function ModalArea(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [momentDate, setMomentDate] = useState()
    useEffect(() => {
        setDate(props.date);
        setDescription(props.description);
        setTitle(props.title);
    })
    useEffect(() => {
       setMomentDate(splitDate(date));
    },[date])

    const handleDate=(value)=>{
        value!==null?
        setMomentDate(splitDate(shortDate(value._d))):
        setMomentDate(splitDate(shortDate(new Date())));
    }

    return (
        <>
            <div>Title</div>
            <Input onChange={(value) => props.titleChange(value.target.value)} value={title} />
            <div>Description</div>
            <TextArea onChange={(value) => props.descriptionChange(value.target.value)} value={description} />
            <div>Date</div>
            <DatePicker onChange={(value)=>handleDate(value)} locale={locale}  value={momentDate}/>
        </>
    )
}

export default ModalArea
