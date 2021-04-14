import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import WelcomePage from './components/welcome/welcome-page'
import LoginPage from './components/login/login-page'
import RegisterPage from './components/register/register-page'
import Dashboard from './components/dashboard/dashboard-page'
import Configuration from './components/configuration/configuration.component'

export default function App(){
  return (
    <Router>
      <div className="App">
      <Switch>
          <Route path="/" exact component={WelcomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/configuration" component={Configuration}/>
        </Switch>
      </div>    
    </Router>
  );
}
