import { List } from 'antd';
import { useTranslation } from "react-i18next";
import React from 'react';
import {dateTr} from "../../../Helper/date";
function ListItem(props) {
    
    const { t, i18n } = useTranslation();

    return (
        <>
            <List.Item
                actions={[
                <a id={props.id}  onClick={(e) => props.onClick(e)}>{t("Edit")}</a>, 
                <input 
                    id={props.id} 
                    onChange={(value) => props.isChecked(value)}                         
                    checked={props.isDone} 
                    type="checkbox" 
                    key="ok"/>]}
            >
                <List.Item.Meta
                    title={props.title}
                    description={props.description}
                />
                {i18n.language==="tr"?dateTr(props.date):props.date}
            </List.Item>
        </>
    )
}

export default ListItem
