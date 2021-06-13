import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import NavigationBar from '../navigation-bar/navigation-bar';
import Dashboard from '../dashboard/dashboard-page';
import Configuration from '../configuration/configuration-page';
import './main.scss'

const MainPage = (props) =>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  async function verifyIsAAuthenticated(){
    const res = await axios.get("http://localhost:5000/user/loggedIn")
    setIsAuthenticated(res.data.isAuthenticated);
    setUsername(res.data.username);
  }

  useEffect(()=>{
      verifyIsAAuthenticated();
  }, []);

  return(
      <Router> 
        {isAuthenticated === true &&
        <div className="main-page">
          <NavigationBar username={username}/>
          <Switch>
            <Route exact path="/main-page">
              <Dashboard />
            </Route>
            <Route path="/main-page/configuration">
              <Configuration/>
            </Route>
          </Switch>
        </div>}
        {isAuthenticated === false &&
        <h1>Nu aveți acces la această pagină deoarece nu sunteți logat!</h1>
        }
      </Router> 
      
  );
}

export default MainPage;