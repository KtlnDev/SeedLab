import React from 'react';
import axios from 'axios';
import LogoutIcon from '../../images/logout.png';
import './navigation.scss'

const NavigationBar = (props) =>{

    async function logoutHandler(){
        try{
            await axios.get("http://localhost:5000/user//logout");
            window.location.href='/login';
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <div className="navigationBar">
           <span className="title">SeedLab</span>
           <div className="links">
                <a href='/main-page'>DASHBOARD</a>|
                <a href='/main-page/configuration'>NOTIȚE</a>
           </div>
           <span className="username">{props.username}</span>
           <button className="logout"><img src={LogoutIcon} alt="Not found" onClick={logoutHandler}/></button>
        </div>
    )
}

export default NavigationBar;