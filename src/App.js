import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { SignUp } from "./Components/SignUp/SignUp";
import { Home } from "./Components/Home/Home";
import { LogIn } from "./Components/LogIn/LogIn";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <Route path='/login' component={LogIn}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
