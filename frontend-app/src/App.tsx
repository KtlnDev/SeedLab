import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import WelcomePage from './components/welcome/welcome-page';
import LoginPage from './components/login/login-page';
import RegisterPage from './components/register/register-page';
import MainPage from './components/main/main';
import './App.css';

axios.defaults.withCredentials = true;

export default function App(){
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={WelcomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/main-page" component={MainPage}/>
        </Switch>
      </div>
    </Router>
  );
}
