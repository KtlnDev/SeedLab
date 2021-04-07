import React from 'react';
import './navigation.style.css'

class NavigationBar extends React.Component{
    render(){
        return(
            <div className="navigationBar">
                <div className="title">
                    <a className="item" href="/">Project Name</a>
                </div>
                <div className="buttons">
                    <a className="btn" href="/register">Register</a>
                    <a className="btn" href="/login">Login</a>
                </div>
            </div>
        )
    }
}

export default NavigationBar;