import React from 'react';
import './welcome.style.css'
import NavigationBar from '../navigation-bar/navigation.component'

class WelcomeComponent extends React.Component{
    render(){
        return(
                <div className="welcome-page">
                    <NavigationBar/>
                    <h1 className="h1">Let's improve your garden</h1>
                    <span>Description</span>
                </div>
        )
    }
}

export default WelcomeComponent;