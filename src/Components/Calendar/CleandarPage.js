import { Calendar, Badge } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import 'antd/dist/antd.css';
import 'moment/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';
import { getAllTodos2 } from "../../SqlMethods/get"
import accountContext from "../Contexts/AccountContext"
import shortDate from "../../Helper/shortDate"

function CalendarPage() {
  const { account, setAccount } = useContext(accountContext)
  const [todos, setTodos] = useState([])
  useEffect(() => {
    getAllTodos2(account.id)
    .then((data)=>{
      let mapData=[...data].map(p=>{
        return{
          id:p.id,
          date:p.date,
          title:p.title,
        }
      });
      setTodos(mapData);
    });
  }, [account])
  
  

  function getListData(value) {
    let date=shortDate(value._d);
    let listData = [];
    listData=todos.filter(p=>p.date==date);
    return listData;
  }

  function dateCellRender(value) {
  const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li style={{listStyle:"none"}} key={item.title}>
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
        locale={locale}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}

      />,
    </>
  )
}
export default CalendarPage;