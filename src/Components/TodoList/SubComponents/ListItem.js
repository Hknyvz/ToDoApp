import { List } from 'antd';
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react'
import {updateTodoChecked} from "../../../SqlMethods/update"

function ListItem(props) {
    
    const { t } = useTranslation();

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
                {props.date}
            </List.Item>
        </>
    )
}

export default ListItem
