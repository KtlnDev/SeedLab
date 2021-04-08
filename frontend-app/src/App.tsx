import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import WelcomeComponent from './components/welcome/welcome.component'
import LoginComponent from './components/login/login.component'
import RegisterComponent from './components/register/register.component'

export default function App(){
  return (
    <Router>
      <div className="App">
      <Switch>
          <Route path="/" exact component={WelcomeComponent}/>
          <Route path="/login" component={LoginComponent}/>
          <Route path="/register" component={RegisterComponent}/>
        </Switch>
      </div>    
    </Router>
  );
}
