import './App.css';
import React from "react"
import TodoList from './Components/TodoList/TodoList';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import CalendarPage from './Components/Calendar/CleandarPage';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';

function App() {
  return (
    <>
      
      <Router>
        <Switch>
          <Route path="/" exact>
            <TodoList></TodoList>
          </Route>
          <Route path="/signin" exact>
            <SignIn></SignIn>
          </Route>
          <Route path="/signup" exact>
            <SignUp></SignUp>
          </Route>
          <Route path="/calendar" exact>
            <CalendarPage></CalendarPage>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

