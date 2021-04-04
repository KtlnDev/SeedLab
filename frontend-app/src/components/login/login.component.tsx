import React from 'react';
import TextField from '@material-ui/core/TextField';
import './login.style.css'

class LoginComponent extends React.Component{
    render(){
        return(
            <div className="login-wrapper">
                <div className="login-container">
                    <h1>Login</h1>
                    <form className="form">
                        <TextField id="email" label="Email" type="text" variant="outlined" required/>
                        <TextField id="password" label="Password" type="password" variant="outlined" required/>
                        <div className="login">
                            <button className="login-button">Login</button>
                            <a href="/register" className="linkToRegister">Don't have an account yet? Sign up!</a>
                        </div>                 
                    </form>
                </div>
            </div>
        )
    }

}

export default LoginComponent;