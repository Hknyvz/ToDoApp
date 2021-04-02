import { Calendar, Badge } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import 'antd/dist/antd.css';
import 'moment/locale/tr';
import localetr from 'antd/es/date-picker/locale/tr_TR';
import 'moment/locale/uk';
import localeen from 'antd/es/date-picker/locale/en_US';
import { getAllTodos2 } from "../../SqlMethods/get"
import accountContext from "../Contexts/AccountContext"
import shortDate from "../../Helper/shortDate"
import { useTranslation } from "react-i18next";
import "./calendar.css"

function CalendarPage() {
  const { account, setAccount } = useContext(accountContext);
  const [todos, setTodos] = useState([]);
  const [calendarLocale, setCalendarLocale] = useState();
  const { i18n } = useTranslation();

  useEffect(() => {
    switch (i18n.language) {
      case "tr":
        setCalendarLocale(localetr);
        break;
      case "en":
        setCalendarLocale(localeen);
        break;
    }
  }, [i18n])

  useEffect(() => {
    getAllTodos2(account.id)
      .then((data) => {
        let mapData = [...data].map(p => {
          return {
            id: p.id,
            date: p.date,
            title: p.title,
          }
        });
        setTodos(mapData);
      });
  }, [account])



  function getListData(value) {
    let date = shortDate(value._d);
    let listData = [];
    listData = todos.filter(p => p.date == date);
    return listData;
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events listRowContainer">
        {listData.map(item => (
          <li className="listRow" key={item.title}>
            <Badge status="success" text={item.title} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    console.log(value);
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  return (
    <>
      <Calendar
        locale={calendarLocale}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}

      />,
    </>
  )
}
export default CalendarPage;