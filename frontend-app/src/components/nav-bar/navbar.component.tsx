import React from 'react';
import './navbar.style.css'

class Navigation extends React.Component{
    render(){
        return(
            <div className="nav-bar">
                <div className="title">
                    <a className="item" href="/">Project Name</a>
                </div>
                <div className="action-bar">
                    <a className="btn" href="/register">Register</a>
                    <a className="btn" href="/login">Login</a>
                </div>
            </div>
        )
    }
}

export default Navigation;