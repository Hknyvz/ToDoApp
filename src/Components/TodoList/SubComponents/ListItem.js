import { List } from 'antd';
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react'

function ListItem(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const { t } = useTranslation();

    

    const handleChecked = (event) => {
        console.log(event.target.id);
        console.log(event.target.checked);
    }
    return (
        <>
            <List.Item
                actions={[<a id={props.id}  onClick={(e) => props.onClick(e)}>{t("Edit")}</a>, <input id={props.id} onChange={(event) => handleChecked(event)} type="checkbox" key="ok"></input>]}
                extra={props.date}
            >
                <List.Item.Meta

                    title={props.title}
                    description={props.description}

                />

            </List.Item>
        </>
    )
}

export default ListItem
