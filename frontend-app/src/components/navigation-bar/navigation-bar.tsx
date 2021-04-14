import React from 'react';
import './navigation.scss'

function NavigationBar(props){
    return(
        <div className="navigationBar">
           <div className="left-navbar">
                <label>SeedLab</label>
                <a href='/dashboard'>DASHBOARD</a>|
                <a href='/configuration'>CONFIGURATION</a>
            </div>
            <div className="right-navbar">
                <label>{props.lastName}</label>
                <label>{props.firstName}</label>
            </div>
        </div>
    )
}

export default NavigationBar;