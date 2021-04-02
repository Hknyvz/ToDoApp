import './App.css';
import React, { useEffect, useContext } from "react"
import TodoList from './Components/TodoList/TodoList';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import CalendarPage from './Components/Calendar/CleandarPage';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Navbar from './Components/Shared/Navbar';
import * as alasql from 'alasql';
import { AccountProvider } from './Components/Contexts/AccountContext';

function App() {
  useEffect(() => {
    alasql(`
            CREATE LOCALSTORAGE DATABASE IF NOT EXISTS TodoDB;
            ATTACH LOCALSTORAGE DATABASE TodoDB;
            USE TodoDB;            
            `);
    alasql(`
            CREATE TABLE IF NOT EXISTS User (
              id INT AUTOINCREMENT PRIMARY KEY,
              userName VARCHAR(25) NOT NULL,
              email VARCHAR(25) NOT NULL,
              password VARCHAR(25) NOT NULL
            );
          `);
    alasql(`
            CREATE TABLE IF NOT EXISTS ToDo (
              id INT AUTOINCREMENT PRIMARY KEY,
              userId INT REFERENCES User(id),
              title VARCHAR(25) NOT NULL,
              description VARCHAR(200) NOT NULL,
              isDone BOOLEAN NOT NULL,
              date VARCHAR(10) NOT NULL
            );
          `);

  }, [])

  return (
    <>
      <AccountProvider>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact>
              <TodoList/>
            </Route>
            <Route path="/signin" exact>
              <SignIn/>
            </Route>
            <Route path="/signup" exact>
              <SignUp/>
            </Route>
            <Route path="/calendar" exact>
              <CalendarPage/>
            </Route>
          </Switch>
        </Router>
      </AccountProvider>
    </>
  );
}

export default App;

